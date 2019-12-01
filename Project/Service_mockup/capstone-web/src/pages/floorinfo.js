import React, { useEffect, useRef } from 'react'
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import SvgIcon from '@material-ui/core/SvgIcon';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem, { TreeItemProps } from '@material-ui/lab/TreeItem';
import Collapse from '@material-ui/core/Collapse';
import { useSpring, animated } from 'react-spring/web.cjs'; // web.cjs is required for IE 11 support
import PropTypes from 'prop-types';
import Cookies from 'universal-cookie';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import { FormControl } from '@material-ui/core';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import { addMarketItemInfo } from '../api/stores';
import { useSnackbar } from 'notistack';
import { navigate } from 'gatsby';
const cookies = new Cookies();

const successSnackbarOption = {
    variant: 'success',
};
const errorSnackbarOption = {
    variant: 'error',
};

function TransitionComponent(props) {
    const style = useSpring({
        from: { opacity: 0, transform: 'translate3d(20px,0,0)' },
        to: { opacity: props.in ? 1 : 0, transform: `translate3d(${props.in ? 0 : 20}px,0,0)` },
    });

    return (
        <animated.div style={style}>
            <Collapse {...props} />
        </animated.div>
    );
}

TransitionComponent.propTypes = {
    /**
     * Show the component; triggers the enter or exit states
     */
    in: PropTypes.bool,
};

const useStyles = makeStyles(theme => ({
    root: {
        margin: theme.spacing(1),
        height: 1000,
        flexGrow: 1,
        maxWidth: 400,
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 400,
    },
}));

export default function SetLayout() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    const [values, setState] = React.useState({
        floorItem: [...Array(cookies.get("editingMarketMaxFloor")).keys()].map(element => { return { key: (element + 1).toString() } }),
        shelves: [],
        shelveName: "",
        curFloor: 0,
        curShelf: "",
        itemName: "",
        quantity: 0,
        floorStructure: [...Array(cookies.get("editingMarketMaxFloor")).keys()].map(element => { return { id: (element + 1).toString(), name: (element + 1).toString() } }),
        isSending: false
    });
    const handleChange = name => event => {
        if (name === 'quantity' && event.target.value <= 0) {
            enqueueSnackbar("수량은 0보다 작을 수 없습니다", errorSnackbarOption);
            return;
        }
        setState({
            ...values,
            [name]: event.target.value,
        });
    };

    const saveShelve = () => {
        if (values.shelveName !== '') {
            values.shelves.push({ "key": values.shelveName });
            let newFloorStructure = values.floorStructure;
            if (!newFloorStructure[values.curFloor].children) {
                newFloorStructure[values.curFloor].children = [];
            }
            newFloorStructure[values.curFloor].children.push({ id: values.shelveName, name: values.shelveName });
            setState({ ...values, shelveName: "", shelves: values.shelves, floorStructure: newFloorStructure });
        }
    }
    const saveItem = () => {
        if (values.quantity <= 0) {
            enqueueSnackbar("수량은 0보다 작을 수 없습니다", errorSnackbarOption);
            return;
        }
        if (values.itemName === '') {
            enqueueSnackbar("상품 이름을 입력해주세요", errorSnackbarOption);
            return;
        }

        let newFloorStructure = values.floorStructure;
        if (!newFloorStructure[values.curFloor].children) {
            enqueueSnackbar("가판대를 선택해주세요", errorSnackbarOption);
            return;
        }
        let shelf = newFloorStructure[values.curFloor].children.find(x => x.id === values.curShelf);
        if (shelf) {
            if (!shelf.children) {
                shelf.children = []
            }
            shelf.children.push({ id: values.itemName, name: values.itemName, quantity: values.quantity });

            setState({ ...values, itemName: "", floorStructure: newFloorStructure, selectedShelf: "", quantity: 0 })
        }

    }



    const getTreeItemsFromData = treeItems => {
        if (!treeItems) {
            return undefined;
        }
        return treeItems.map(treeItemData => {
            let children = undefined;
            if (treeItemData.children && treeItemData.children.length > 0) {
                children = getTreeItemsFromData(treeItemData.children);
            }
            return (
                <TreeItem
                    key={treeItemData.id}
                    nodeId={treeItemData.id}
                    label={treeItemData.name + (treeItemData.quantity ? '(' + treeItemData.quantity + ')' : '')}
                    children={children}
                />
            );
        });


    };
    const DataTreeView = ({ treeItems }) => {
        return (
            <TreeView
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
            >
                {getTreeItemsFromData(treeItems)}
            </TreeView>
        );
    };
    const changeFloor = name => event => {
        setState({
            ...values,
            curFloor: event.target.value,
            curShelf: ""
        });
    }
    const sendData = async () => {
        try {
            setState({ ...values, isSending: true });
            let result = await addMarketItemInfo(values.floorStructure, cookies.get('editingMarketID'), cookies.get('userId'));
            if (result) {
                enqueueSnackbar("아이템 등록 성공", successSnackbarOption);
                navigate('/marketplan');
            }
        }
        catch (err) {
            setState({ ...values, isSending: false });
            enqueueSnackbar("아이템 등록 실패", errorSnackbarOption);
            console.log(err);
        }

    }
    return (
        <>
            <h1>층별 품목 설정</h1>
            <h2>※가판대 이름은 중복이 허용되지 않습니다</h2>
            <form className={classes.formControl} onSubmit={e => e.preventDefault()}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <InputLabel id="FloorSelectLabel">층</InputLabel>
                        <Select
                            labelId="floorSelect"
                            id="floorSelect"
                            value={values.curFloor}
                            onChange={changeFloor('curFloor')}
                        >
                            {
                                values.floorItem.map((element, key) => <MenuItem key={key.toString()} value={key.toString()}>{element.key}</MenuItem>)
                            }
                        </Select>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            variant="outlined"
                            required
                            name="shelveName"
                            label="가판대 이름"
                            id="shelveName"
                            value={values.shelveName}
                            onChange={handleChange('shelveName')}
                        />
                        <Button
                            type="button"
                            variant="contained"
                            color="primary"
                            onClick={saveShelve}
                        >
                            가판대 저장
                    </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <InputLabel id="FloorSelectLabel">가판대</InputLabel>
                        <FormControl className={classes.formControl}>
                            <Select
                                labelId="shelveSelect"
                                id="shelveSelect"
                                value={values.curShelf}
                                onChange={handleChange('curShelf')}
                            >
                                {values.floorStructure[values.curFloor].children ?
                                    values.floorStructure[values.curFloor].children.map((element) =>
                                        <MenuItem key={element.id.toString()} value={element.id.toString()}>{element.name}</MenuItem>) :
                                    []}
                            </Select>
                        </FormControl>

                    </Grid>
                    <Grid item xs={12}>

                        <TextField
                            variant="outlined"
                            required
                            name="itemName"
                            label="상품이름"
                            id="itemName"
                            value={values.itemName}
                            onChange={handleChange('itemName')}
                        />
                        <TextField
                            id="quantity"
                            label="수량"
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            value={values.quantity}
                            onChange={handleChange('quantity')}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            onClick={saveItem}
                        >
                            물품 추가
                    </Button>

                    </Grid>
                    <DataTreeView treeItems={values.floorStructure} />
                </Grid>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={sendData}
                    disabled={values.isSending}
                >
                    품목 저장
                            </Button>
                <Button
                    type="button"
                    variant="contained"
                    color="primary"
                    onClick={() => { navigate('/uploaditems') }}
                >
                    CSV에서 읽어들이기
                            </Button>
            </form>




        </>
    );
}