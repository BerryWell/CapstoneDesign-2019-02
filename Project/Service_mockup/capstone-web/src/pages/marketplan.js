import React, { useState, useEffect, useRef } from 'react'
// import { makeStyles } from '@material-ui/core/styles'
import TableDragSelect from "react-table-drag-select";
import "react-table-drag-select/style.css";


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
        ]
    });
    const handleChange = cells => setState({ cells });

    const handleClick = () => {
        const cells = [
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false],
            [false, false, false, false, false, false, false]
        ];
        setState({ cells });
    };
    return (
        <>
            <h1>캡스톤</h1>
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
                <button onClick={handleClick}>Reset</button>
            </div>;
            </>
    );
}
