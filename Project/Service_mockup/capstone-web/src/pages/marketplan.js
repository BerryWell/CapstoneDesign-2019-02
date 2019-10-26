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
        defaultColumnProperties: { width: 120 },
    });

    for (let i = 0; i < 100; i++) {
        values.columns.push({ key: i, name: i });
    }
    values.columns.map(c => ({ ...c, ...values.defaultColumnProperties }));
    for (let i = 0; i < 100; i++) {
        let rowData = {};
        for (let j = 0; j < 100; j++) {
            rowData[j] = '';
        }
        values.rows.push(rowData);
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

    const removeItem = (_name, _color) => {
        console.log(_name, _color);
        const index = values.items.findIndex(element => element.name === _name && element.color === _color);
        if (index > -1) {
            values.items.splice(index, 1);
            setState({ ...values, 'items': values.items });
        }
    };
    const handleItemInput = name => event => {
        setState({ ...values, [name]: event.target.value });
    }

    const ItemBtnComponent = (props) => {
        const doubleClick = () => {
            removeItem(props.text, props.color);
        }
        return (
            <Button
                variant="contained"
                color="primary"
                onDoubleClick={doubleClick}
                style={{
                    background: props.color
                }}
            >
                {props.text}
            </Button>

        );
    }

    return (
        <>
            <h1>매장 레이아웃 설정</h1>
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
                            columns={values.columns}
                            rowGetter={i => values.rows[i]}
                            rowsCount={100}
                            minHeight={1080}
                            cellRangeSelection={{
                                onStart: args => { },
                                onUpdate: args => { },
                                onComplete: args => { }
                            }}
                        />
                    </div>
                </Grid>
            </Grid>


        </>
    );
}
