import React, { useState, useEffect, useRef } from 'react'
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import ReactDataGrid from "react-data-grid";
import { createMuiTheme } from '@material-ui/core';
const randomMC = require('random-material-color');
class MyDataGrid extends ReactDataGrid {
    componentDidMount() {
        this._mounted = true;
        this.dataGridComponent = document.getElementsByClassName('react-grid-Container')[0] //assumes only one react datagrid component exists
        window.addEventListener('resize', this.metricsUpdated);
        if (this.props.cellRangeSelection) {
            this.dataGridComponent.addEventListener('mouseup', this.onWindowMouseUp);
        }
        this.metricsUpdated();
    }

    componentWillUnmount() {
        this._mounted = false;
        window.removeEventListener('resize', this.metricsUpdated);
        this.dataGridComponent.removeEventListener('mouseup', this.onWindowMouseUp);
    }
}
export default function SetLayout() {
    const [values, setState] = React.useState({
        items: [],
        columns: [],
        rows: [],
        itemName: '',
        refresh: false,
        selectedItem: '',
        selectedArea: { left: 0, top: 0, right: 0, bottom: 0 }
    });

    const removeItem = (_name, _color) => {
        const index = values.items.findIndex(element => element.name === _name && element.color === _color);
        if (index > -1) {
            values.items.splice(index, 1);
            setState({ ...values, 'items': values.items });
        }
    };
    const ItemBtnComponent = (props) => {
        const doubleClick = () => {
            removeItem(props.text, props.color);
        }
        const mouseUp = () => {
            if (props.text === values.selectedItem) {
                values.selectedItem = '';

            }
            else {
                values.selectedItem = props.text;
            }
        }
        return (
            <Button
                variant="contained"
                color="primary"
                onDoubleClick={doubleClick}
                onMouseUp={mouseUp}
                style={{
                    background: props.color
                }}
            >
                {props.text}
            </Button>

        );
    }

    const CellFormatter = ({ value }) => {
        return <div>value:{value}</div>;
    };

    //cell fill
    for (let i = 0; i < 5; i++) {
        values.columns.push({ key: i, name: i });
    }
    for (let i = 0; i < 5; i++) {
        let rowData = new Array();
        for (let j = 0; j < 5; j++) {
            rowData[j] = j;
        }
        values.rows[i] = rowData;
    }
    const addItem = () => {
        if (values.items.includes(values.itemName) !== true) {
            let randomColor = randomMC.getColor();
            values.items.push({
                name: values.itemName,
                color: randomColor,
                theme: createMuiTheme({
                    palette: {
                        primary: {
                            main: randomColor
                        }
                    },
                    overrides: {
                        ItemBtnComponent: {
                            raisedPrimary: {
                                color: randomColor
                            }
                        }
                    }
                })
            });

            setState({ ...values, 'items': values.items });
            console.log(values.items);
        }
    };

    const handleItemInput = name => event => {
        setState({ ...values, [name]: event.target.value });
    }
    function GetSize() {
        let count = values.rows.length; // change this line to your app logic

        if (values.refresh) {
            count++; // hack for update data-grid
            setState({ ...values, refresh: false });
        }

        return count;
    };
    function Refresh() {
        setState({ ...values, refresh: true });
    }


    return (
        <>
            <h1>매장 레이아웃 설정({values.selectedItem})</h1>
            <Grid container >
                <Grid item >
                    <TextField
                        variant="outlined"
                        required
                        name="itemName"
                        label="물품 이름"
                        id="itemName"
                        onChange={handleItemInput('itemName')}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={addItem}>
                        물품 추가
                    </Button>

                </Grid>
                <Grid item
                    xs={12}>
                    {values.items.map(value => (
                        <ItemBtnComponent text={value.name} key={value.name} color={value.color} />
                    ))}
                </Grid>
                <Grid item
                    xs={12}>
                    <div>
                        <MyDataGrid
                            width={20}
                            columns={values.columns}
                            rowGetter={i => values.rows[i]}
                            rowsCount={values.rows.length}
                            minHeight={1080}
                            enableCellSelect={true}
                            cellRangeSelection={{
                                onComplete: args => {
                                    let left = args.topLeft.rowIdx;
                                    let right = args.bottomRight.idx;
                                    let top = args.topLeft.idx;
                                    let bottom = args.bottomRight.rowIdx;
                                    values.selectedArea.left = left
                                    values.selectedArea.top = top;
                                    values.selectedArea.right = right;
                                    values.selectedArea.bottom = bottom;
                                    console.log(left, right, top, bottom);
                                    for (let i = left; i <= right; i++) {
                                        for (let j = top; j <= bottom; j++) {
                                            console.log(values.rows[i][j]);
                                            values.rows[i][j] = 999;
                                            console.log(values.rows[i][j]);
                                        }
                                        console.log(values.rows);
                                    }

                                    setState({ ...values, refresh: true, rows: values.rows });
                                    // Refresh();
                                }
                            }}
                        />
                    </div>
                </Grid>
            </Grid>


        </>
    );
}
