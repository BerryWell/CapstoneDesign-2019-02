import React, { useState, useEffect, useRef } from 'react';
// import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { getStores, appendStore, modifyMalls, deleteMalls, testItemList } from '../api/stores';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'gatsby';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const IndexPage = () => {
  const [stores, setStores] = useState({
    showModal: false,
    storeInfo: [],
    markerSet: false,
    lat: 37.504073,
    lng: 126.956887,
  });
  const setCard = (data) => {
    setStores({ ...stores, storeInfo: data.result });
  }
  useEffect(() => {
    getStores(cookies.get('userId')).then(setCard);
  }, []);
  const navigateAddMarket = () => {
    navigate('/addMarket');
  };
  const testBtn = async () => {
    let result = testItemList();
    console.log(result);
  }
  return (
    <>
      <Button variant="contained" color="primary" onClick={testBtn}>
        상점테스트버튼
      </Button>
      <h1>매장 리스트</h1>
      <Button variant="contained" color="primary" onClick={navigateAddMarket}>
        가게 추가하기
      </Button>
      {stores.storeInfo ?
        stores.storeInfo.map((store, index) => <StoreCard {...store} key={index} afterDeleteMall={() => { getStores(cookies.get('userId')).then(setCard); }} />) :
        <>가게 목록을 불러오는 중입니다...</>}
    </>
  )
}

export default IndexPage;

const StoreCard = ({
  name,
  address,
  max_floor,
  idmall,
  afterDeleteMall
}) => {
  const settingMenuAnchorRef = useRef(null);
  const [settingMenuOpen, setSettingMenuOpen] = useState(false);
  const openSettingMenu = () => setSettingMenuOpen(true);
  const closeSettingMenu = () => setSettingMenuOpen(false);

  const modifyMall = async (idmall) => {

    await deleteMalls(idmall);
    navigate('/addMarket');
    setSettingMenuOpen(false);
  }
  const deleteMall = async (idmall) => {
    console.log('deleteMall clicked!');
    //console.log(typeof afterDeleteMall);

    let ret = await deleteMalls(idmall);
    if (ret) {
      afterDeleteMall();

    }
    setSettingMenuOpen(false);

  }
  return <Card>
    <CardHeader
      action={
        <IconButton
          aria-label="settings"
          onClick={openSettingMenu}
          ref={settingMenuAnchorRef}>
          <MoreVertIcon />
        </IconButton>
      }
      title={name}
      subheader={address}
    />
    <StoreCardSettingMenu
      open={settingMenuOpen}
      anchorEl={settingMenuAnchorRef.current}
      onClose={closeSettingMenu}
      onModifyMall={modifyMall}
      onDeleteMall={deleteMall}
      idmall={idmall}
    />
    <CardMedia
      image="/static/images/cards/paella.jpg"
      title="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {max_floor}층
      </Typography>
    </CardContent>
  </Card>;
}

const StoreCardSettingMenu = ({
  open,
  anchorEl,
  onClose,
  onModifyMall,
  onDeleteMall,
  idmall
}) => {
  return <Menu
    anchorEl={anchorEl}
    keepMounted
    open={open}
    onClose={onClose}
  //idmall={idmall}
  //onModifyMall = { onModifyMall }
  //onDeleteMall = { onDeleteMall }
  >
    <MenuItem onClick={() => { cookies.set('dashboardMallId', idmall); navigate('/dashboard/') }}>통계현황</MenuItem>
    <MenuItem onClick={onDeleteMall.bind(this, { idmall })}>삭제</MenuItem>
  </Menu>;
};
