import React, { useState, useEffect, useRef } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
export default function SetLayout() {
    const [values, setState] = React.useState({
        cells: [
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false],
            [false, false, false, false, false, false]
        ],
        items: [],
        itemName: '',
    });
    const handleChange = cells => setState({ ...values, 'cells': cells });
    const addItem = () => {
        if (values.items.includes(values.itemName) !== true) {
            values.items.push(values.itemName);

            setState({ ...values, 'items': values.items });
            console.log(values.items);
        }
    };

    const removeItem = (name) => {
        console.log(name);
        const index = values.items.indexOf(name);
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
            removeItem(props.text);
        }
        return (
            <Button
                variant="contained"
                color="primary"
                onDoubleClick={doubleClick}
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
                    xs='12'>
                    {values.items.map(value => (
                        <ItemBtnComponent text={value} key={value} />
                    ))}
                </Grid>
                <Grid item >
                    <div>
                        <TableDragSelect value={values.cells} onChange={handleChange}>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                                <td />
                            </tr>
                        </TableDragSelect>
                    </div>
                </Grid>
            </Grid>


        </>
    );
}
