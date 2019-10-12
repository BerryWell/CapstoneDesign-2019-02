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
    const handleChange = cells => setState({ cells });
    const addItem = event => {
        if (values.items.includes(values.itemName) !== true) {
            values.items.push(values.itemName);
            setState({ ...values, 'items': values.items });
        }
    };
    const removeItem = event => {

    };
    const handleItemInput = name => event => {
        setState({ ...values, [name]: event.target.value });
        console.log(values.itemName);
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
                        <Button
                            variant="contained"
                            color="primary"
                            id={value}
                            onClick={removeItem}>
                            {value}
                        </Button>
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
