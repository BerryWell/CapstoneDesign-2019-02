import React from 'react'
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import  createMuiTheme from '@material-ui/core';
import {Editors} from 'react-data-grid-addons';
import MyDataGrid from '../components/CustomDataGrid';

const randomMC = require('random-material-color');
const {DropDownEditor} = Editors;
export default function SetLayout() {
    
    const [values, setState] = React.useState({
        items: [],
        columns: [
            { key: 0, name: 0 }, 
            { key: 1, name: 1 }, 
            { key: 2, name: 2 }, 
            { key: 3, name: 3 }, 
            { key: 4, name: 4 }],
        rows: [],
        itemName: '',
        refresh: false,
        selectedItem: '',
        selectedArea: { left: 0, top: 0, right: 0, bottom: 0 }
    });
    React.useEffect(()=>{
        console.log("mounted");
        for (let i = 0; i < 5; i++) {
            let rowData = [];
            for (let j = 0; j < 5; j++) {
                rowData[j] = '';
            }
            values.rows[i] = rowData;
        }
        values.columns.forEach(element => {
            element.editor = <DropDownEditor options={values.items}/>; 
        });
        setState({ ...values, rows: values.rows });
    }, []);
   
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
                return;
                const left = values.selectedArea.left;
                const top = values.selectedArea.top; 
                const right = values.selectedArea.right; 
                const bottom = values.selectedArea.bottom; 
                console.log(left, right, top, bottom);
                for (let i = left; i <= right; i++) {
                    for (let j = top; j <= bottom; j++) {
                        values.rows[i][j] = values.selectedItem;
                    }
                }
                setState({ ...values, rows: values.rows });
                                   
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
   
    const addItem = () => {
        if (values.items.some(element => element.name === values.itemName) === false) {
            console.log("77");
            let randomColor = randomMC.getColor();
            values.items.push({
                name: values.itemName,
                color: randomColor,
                id: values.itemName,
                value: values.itemName,
            });
            setState({ ...values, 'items': values.items });
        }
    };
    const handleChange = name => event => {
        setState({
          ...values,
          [name]: event.target.value,
        });
      };
    function GetSize() {
        let count = values.rows.length; // change this line to your app logic

        if (values.refresh) {
            count++; // hack for update data-grid
            //setState({ ...values, refresh: false });
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
                        onChange={handleChange('itemName')}
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
                    <div key={Math.random()}>
                        <MyDataGrid
                            width={20}
                            columns={values.columns}
                            rowGetter={i => values.rows[i]}
                            rowsCount={values.rows.length}
                            minHeight={1080}
                            enableCellSelect={true}
                            cellRangeSelection={{
                                onComplete: args => {
                                    let left = args.topLeft.idx;
                                    let right = args.bottomRight.idx;
                                    let top = args.topLeft.rowIdx;
                                    let bottom = args.bottomRight.rowIdx;
                                    console.log(left, top, right, bottom);
                                    for ( let j = top; j <= bottom; j++) {
                                        for (let i = left; i <= right; i++) {
                                            values.rows[j][i] = values.selectedItem;
                                        }
                                    }
                                    let newColumn = values.columns.slice();
                                    setState({ ...values, refresh: true, rows: values.rows, columns:newColumn  });
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
