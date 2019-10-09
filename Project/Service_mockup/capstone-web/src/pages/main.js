import React, { useState, useEffect, useRef } from 'react'
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

const IndexPage = () => {
  const [stores, setStores] = useState(null);
  useEffect(() => {
    getStores().then(setStores);
  }, []);
  const appendNewStore = async () => {
    const random = Math.random();
    const stores = await appendStore({
      id: `newstore-${random}`,
      name: `제목없음-${random}`,
      address: '서울시 강남구 논현1동',
      description: '가게입니다.',
    });
    setStores(stores);
  };
  return (
    <>
      <h1>캡스톤</h1>
      <Button variant="contained" color="primary" onClick={appendNewStore}>
        가게 추가하기
      </Button>
      { stores ?
        stores.map((store, index) => <StoreCard {...store} key={index}/>) :
        <>가게 목록을 불러오는 중입니다...</> }
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
