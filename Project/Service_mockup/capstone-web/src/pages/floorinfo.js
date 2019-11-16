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
const cookies = new Cookies();

const successSnackbarOption = {
    variant: 'success',
};
const errorSnackbarOption = {
    variant: 'error',
};
function MinusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
        </SvgIcon>
    );
}

function PlusSquare(props) {
    return (
        <SvgIcon fontSize="inherit" {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
        </SvgIcon>
    );
}

function CloseSquare(props) {
    return (
        <SvgIcon className="close" fontSize="inherit" {...props}>
            {/* tslint:disable-next-line: max-line-length */}
            <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
        </SvgIcon>
    );
}

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

const StyledTreeItem = withStyles(theme => ({
    iconContainer: {
        '& .close': {
            opacity: 0.3,
        },
    },
    group: {
        marginLeft: 12,
        paddingLeft: 12,
        borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
    },
}))(props => <TreeItem {...props} TransitionComponent={TransitionComponent} />);

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
        floorItem: [],
        shelves: [],
        shelveName: "",
        curFloor: 0,
        curShelf: "",
        itemName: "",
        floorStructure: [],
    });
    const ref = useRef(false);
    if (!ref.current) {
        let maxFloor = cookies.get("editingMarketMaxFloor");
        for (let i = 1; i <= maxFloor; i++) {
            values.floorItem.push({ key: i.toString() });
            values.floorStructure.push({ id: i.toString(), name: i.toString() });
        }
        ref.current = true;

    }
    const handleChange = name => event => {
        setState({
            ...values,
            [name]: event.target.value,
        });
    };

    const saveShelve = () => {
        if (values.shelveName !== '') {
            values.shelves.push({ "key": values.shelveName });
            let newFloorStructure = values.floorStructure;
            console.log(newFloorStructure[values.curFloor].children);
            if (!newFloorStructure[values.curFloor].children) {
                newFloorStructure[values.curFloor].children = [];
            }
            newFloorStructure[values.curFloor].children.push({ id: values.shelveName, name: values.shelveName });
            setState({ ...values, shelveName: "", shelves: values.shelves, floorStructure: newFloorStructure });
        }
    }
    const saveItem = () => {
        if (values.itemName !== '') {
            let newFloorStructure = values.floorStructure;
            console.log({ shelveName: values.shelveName, curShelf: newFloorStructure[values.curFloor] });
            let shelf = newFloorStructure[values.curFloor].children.find(x => x.id === values.curShelf);
            console.log(shelf);
            if (shelf) {
                if (!shelf.children) {
                    shelf.children = []
                }
                shelf.children.push({ id: values.itemName, name: values.itemName });

                setState({ ...values, itemName: "", floorStructure: newFloorStructure, selectedShelf: "" })
            }
        }
    }



    const getTreeItemsFromData = treeItems => {
        return treeItems.map(treeItemData => {
            let children = undefined;
            console.log(treeItemData.children);
            if (treeItemData.children && treeItemData.children.length > 0) {
                children = getTreeItemsFromData(treeItemData.children);
            }
            return (
                <TreeItem
                    key={treeItemData.id}
                    nodeId={treeItemData.id}
                    label={treeItemData.name}
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

            let result = await addMarketItemInfo(values.floorStructure, cookies.get('editingMarketID'), cookies.get('userId'));

        }
        catch (err) {
            enqueueSnackbar("아이템 등록 실패", errorSnackbarOption);
            console.log(err);
        }

    }
    return (
        <>
            <h1>층별 품목 설정</h1>
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

                            {values.floorItem.map((element, key) => <MenuItem key={key.toString()} value={key.toString()}>{element.key}</MenuItem>)}
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
                                    <></>}
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
                >
                    품목 저장
                            </Button>
            </form>




        </>
    );
}
/**
 *
            <TreeView
                className={classes.root}
                defaultExpanded={['1']}
                defaultCollapseIcon={<MinusSquare />}
                defaultExpandIcon={<PlusSquare />}
                defaultEndIcon={<CloseSquare />}
            >
                {values.floorItem.map((element, key) =>
                    <StyledTreeItem key={key} nodeId={key.toString()} label={element.key}>
                    </StyledTreeItem>
                )}

            </TreeView>
 *
 * <StyledTreeItem nodeId="1" label="1층">
                    <StyledTreeItem nodeId="2" label="육류" />
                    <StyledTreeItem nodeId="3" label="어류" />
                    <StyledTreeItem nodeId="4" label="통조림" />
                    <StyledTreeItem nodeId="5" label="옷" />
                </StyledTreeItem>

                <StyledTreeItem nodeId="6" label="2층">
                    <StyledTreeItem nodeId="7" label="장난감" />
                    <StyledTreeItem nodeId="8" label="식기" />
                    <StyledTreeItem nodeId="9" label="가구" />
                    <StyledTreeItem nodeId="10" label="가전제품" />
                    <StyledTreeItem nodeId="11" label="애완동물" />
                </StyledTreeItem>
 *
 */