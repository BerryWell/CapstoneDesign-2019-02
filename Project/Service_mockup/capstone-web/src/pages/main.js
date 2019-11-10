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
import { getStores, appendStore } from '../api/stores';
import { makeStyles } from '@material-ui/core/styles';
import { navigate } from 'gatsby';

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
  useEffect(() => {
    getStores().then(setStores);
  }, []);
  const navigateAddMarket = () => {
    navigate('/addMarket');

  };
  return (
    <>
      <h1>매장 리스트</h1>
      <Button variant="contained" color="primary" onClick={navigateAddMarket}>
        가게 추가하기
      </Button>
      {stores.storeInfo ?
        stores.storeInfo.map((store, index) => <StoreCard {...store} key={index} />) :
        <>가게 목록을 불러오는 중입니다...</>}
    </>
  )
}

export default IndexPage;

const StoreCard = ({
  name,
  address,
  description
}) => {
  const settingMenuAnchorRef = useRef(null);
  const [settingMenuOpen, setSettingMenuOpen] = useState(false);
  const openSettingMenu = () => setSettingMenuOpen(true);
  const closeSettingMenu = () => setSettingMenuOpen(false);
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
    />
    <CardMedia
      image="/static/images/cards/paella.jpg"
      title="Paella dish"
    />
    <CardContent>
      <Typography variant="body2" color="textSecondary" component="p">
        {description}
      </Typography>
    </CardContent>
  </Card>;
}

const StoreCardSettingMenu = ({
  open,
  anchorEl,
  onClose,
}) => {
  return <Menu
    anchorEl={anchorEl}
    keepMounted
    open={open}
    onClose={onClose}
  >
    <MenuItem onClick={onClose}>수정</MenuItem>
    <MenuItem onClick={onClose}>삭제</MenuItem>
  </Menu>;
};
