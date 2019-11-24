import React from 'react'
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import createMuiTheme from '@material-ui/core';
import { Editors } from 'react-data-grid-addons';
import MyDataGrid from '../components/CustomDataGrid';
import Cookies from 'universal-cookie';
import Select from '@material-ui/core/Select';
import { setMarketLayout, getCategory } from '../api/stores';
import MenuItem from '@material-ui/core/MenuItem';
const cookies = new Cookies();

const randomMC = require('random-material-color');
const { DropDownEditor } = Editors;
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
        autoincrementID: 0,
        curFloor: 1,
        maxFloor: cookies.get("editingMarketMaxFloor"),
        floorSelect: [],

        selectedArea: { left: 0, top: 0, right: 0, bottom: 0 }
    });

    const handleChange = name => event => {
        setState({
            ...values,
            [name]: event.target.value,
        });
    };

    React.useEffect(() => {
        const loadItem = async () => {
            const ret = await getCategory(cookies.get("editingMarketID"));
            console.log({ _ret: ret });
            ret.map((value) => {
                values.items.push({
                    name: value.name,
                    color: randomMC.getColor(),
                    id: value.name,
                    value: value.name,
                    uid: value.idcategory,
                    [value.name]: value.idcategory,
                    floor: value.number
                });

            });
            setState({ ...values, items: values.items });
        }
        for (let i = 0; i < 5; i++) {
            let rowData = [];
            for (let j = 0; j < 5; j++) {
                rowData[j] = '';
            }
            values.rows[i] = rowData;
        }
        for (let i = 1; i <= values.maxFloor; i++) {
            values.floorSelect.push(i);
        }
        values.columns.forEach(element => {
            element.editor = <DropDownEditor options={values.items} />;
        });
        loadItem();
        console.log("useEffect");
    }, []);

    const ItemBtnComponent = (props) => {

        const mouseClick = () => {
            if (props.text === values.selectedItem) {
                values.selectedItem = '';

            }
            else {
                values.selectedItem = props.text;
            }
            setState({ ...values, selectedItem: values.selectedItem });

        }
        return (
            <Button
                variant="contained"
                color="primary"
                onClick={mouseClick}
                style={{
                    background: props.color
                }}
            >
                {props.text}
            </Button>

        );

    };
    const savePlan = async () => {
        console.log("savePlan");
        let userId = cookies.get('userId');
        try {

            await setMarketLayout(values.rows, userId, values.rows.length, values.rows[0].length);

        }
        catch (err) {
            console.log(err);
        }

    };
    return (
        <>
            <h1>매장 레이아웃 설정({values.selectedItem})</h1>
            <Grid container >
                <Select
                    labelId="floorSelect"
                    id="floorSelect"
                    value={values.curFloor}
                    onChange={event => setState({ ...values, curFloor: event.target.value })}
                >

                    {
                        values.floorSelect.map((element) => <MenuItem key={element.toString()} value={element.toString()}>{element}</MenuItem>)
                    }
                </Select>
                <Grid item >
                    <Button
                        type="button"
                        variant="contained"
                        color="primary"
                        onClick={savePlan}>
                        저장
                    </Button>

                </Grid>
                <Grid item
                    xs={12}>
                    {values.items.map(value => {
                        if (value.floor === Number(values.curFloor)) {
                            return (
                                <ItemBtnComponent
                                    text={value.name}
                                    key={value.name}
                                    color={value.color}
                                    uid={value.uid} />

                            )
                        }
                    })}
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
                                    for (let j = top; j <= bottom; j++) {
                                        for (let i = left; i <= right; i++) {
                                            values.rows[j][i] = values.selectedItem;
                                        }
                                    }
                                    let newColumn = values.columns.slice();
                                    setState({ ...values, columns: newColumn });
                                    setState({ ...values, rows: values.rows });

                                }
                            }}
                        />
                    </div>
                </Grid>
            </Grid>


        </>
    );
}
