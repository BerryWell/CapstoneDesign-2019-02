import React from 'react'
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

import  createMuiTheme from '@material-ui/core';
import {Editors} from 'react-data-grid-addons';
import MyDataGrid from '../components/CustomDataGrid';
import Cookies from 'universal-cookie';

import { setMarketLayout } from '../api/stores';

const cookies = new Cookies();

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
        autoincrementID:0,
        selectedArea: { left: 0, top: 0, right: 0, bottom: 0 }
    });
    const handleChange = name => event => {
        setState({
          ...values,
          [name]: event.target.value,
        });
      };
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
   
    const removeItem = (uid) => {
        console.log(uid);
        const index = values.items.findIndex(element => element.uid === uid);
        if (index > -1) {
            values.items.splice(index, 1);
            setState({ ...values, 'items': values.items });
        }
    };
    const ItemBtnComponent = (props) => {
        const doubleClick = () => {
            removeItem(props.uid);
        }
        const mouseClick = () => {
            if (props.text === values.selectedItem) {
                values.selectedItem = '';

            }
            else {
                values.selectedItem = props.text;                
            }
            setState({ ...values, 'selectedItem': values.selectedItem });
  
        }
        return (
            <Button
                variant="contained"
                color="primary"
                onDoubleClick={doubleClick}//doublecick, onclick 이벤트 중복 불가능, 체크박스로 모드를 분리해야함
                onClick ={mouseClick}
                style={{
                    background: props.color
                }}
            >
                {props.text}
            </Button>

        );
    
    };
   
    const addItem = () => {
        if (values.items.some(element => element.name === values.itemName) === false) {

            let randomColor = randomMC.getColor();
            values.items.push({
                name: values.itemName,
                color: randomColor,
                id: values.itemName,
                value: values.itemName,
                uid: values.autoincrementID
            });
            values.autoincrementID++;
            setState({ ...values, 'items': values.items });
            console.log(values.autoincrementID);
        }
    };
    const savePlan = async () =>{
        let userId = cookies.get('userId');
        try{
            await setMarketLayout(values.rows, userId);
            console.log("success");
        }
        catch(err){
            console.log(err);
        }
        
    };
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
                    <Button
                        type="send"
                        variant="contained"
                        color="primary"
                        onClick={savePlan}>
                        저장
                    </Button>
                    
                </Grid>
                <Grid item
                    xs={12}>
                    {values.items.map(value => (
                        <ItemBtnComponent 
                        text={value.name} 
                        key={value.name} 
                        color={value.color} 
                        uid={value.uid} />

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
