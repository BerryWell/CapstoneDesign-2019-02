import React, { useRef } from 'react'
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

import { useSnackbar } from 'notistack';

import { navigate } from 'gatsby';
const cookies = new Cookies();

const randomMC = require('random-material-color');
const { DropDownEditor } = Editors;

const successSnackbarOption = {
    variant: 'success',
};
const errorSnackbarOption = {
    variant: 'error',
};
export default function SetLayout() {

    const { enqueueSnackbar } = useSnackbar();
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
        categoryNameIDMap: {},

        selectedArea: { left: 0, top: 0, right: 0, bottom: 0 },
        isSending:false
    });

    const handleChange = name => event => {
        setState({
            ...values,
            [name]: event.target.value,
        });
    };
    const ref = useRef(false);
    if (!ref.current) {
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
                values.categoryNameIDMap[value.name] = value.idcategory;
            });
            setState({ ...values, items: values.items });
        }

        for (let floorCnt = 1; floorCnt <= values.maxFloor; floorCnt++) {
            values.floorSelect.push(floorCnt);
            values.rows[floorCnt] = [];

            for (let i = 0; i < 5; i++) {
                let rowData = [];
                for (let j = 0; j < 5; j++) {
                    rowData[j] = '';
                }
                values.rows[floorCnt][i] = rowData;
            }
        }

        values.columns.forEach(element => {
            element.editor = <DropDownEditor options={values.items} />;
        });
        loadItem();
        ref.current = true;
    }
    React.useEffect(() => {

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
        try {
            setState({...values, isSending:true});
            let inputRows = [...values.rows];
            for (let floorIndex = 0; floorIndex < inputRows.length; floorIndex++) {
                let floor = inputRows[floorIndex];
                if (!floor)
                    continue;
                for (let i = 0; i < floor.length; i++) {
                    let row = floor[i];
                    for (let element = 0; element < row.length; element++) {

                        let id = values.categoryNameIDMap[row[element]];
                        if (id) {
                            row[element] = id;
                        }
                    }
                }
            }
            let ret = await setMarketLayout(inputRows, cookies.get("editingMarketID"));
            if (ret) {
                enqueueSnackbar('매장 등록 성공!', successSnackbarOption);
                navigate('/main');
            }
        }
        catch (err) {
            setState({...values, isSending:false});
            enqueueSnackbar('매장 등록 실패', successSnackbarOption);
            console.log(err);
        }

    };
    const setExit = () => {
        setState({ ...values, selectedItem: -1 });
    }
    return (
        <>
            <h1>매장 레이아웃 설정({values.selectedItem})</h1>
            <Grid container >
                <Select
                    labelId="floorSelect"
                    id="floorSelect"
                    value={values.curFloor}
                    onChange={event => setState({ ...values, curFloor: event.target.value, selectedItem: "" })}
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
                        onClick={savePlan}
                        disabled={values.isSending}>
                        저장
                    </Button>

                </Grid>
                <Grid item
                    xs={12}>
                    {
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={setExit}>
                            입구
                    </Button>
                    }
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
                        return (<></>);
                    })}
                </Grid>
                <Grid item
                    xs={12}>
                    <div key={Math.random()}>
                        <MyDataGrid
                            width={20}
                            columns={values.columns}
                            rowGetter={i => values.rows[values.curFloor][i]}
                            rowsCount={values.rows[1].length}
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
                                            values.rows[values.curFloor][j][i] = values.selectedItem;
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
