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
import ReactModal from 'react-modal';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import GoogleMap from '../components/GoogleMap';

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
  const classes = useStyles();
  const [stores, setStores] = useState({
    showModal: false,
    storeInfo: [],
  });
  useEffect(() => {
    getStores().then(setStores);
  }, []);
  const appendNewStore = async () => {
    setStores({ showModal: true });

  };
  const handleCloseModal = () => {
    setStores({ showModal: false });
  };

  // Re-center map when resizing the window
  const bindResizeListener = (map, maps, bounds) => {
    maps.event.addDomListenerOnce(map, 'idle', () => {
      maps.event.addDomListener(window, 'resize', () => {
        map.fitBounds(bounds);
      });
    });
  };

  // Fit map to its bounds after the api is loaded
  const apiIsLoaded = (map, maps) => {
    // Get bounds by our places
    const bounds = new maps.LatLngBounds();
    // Fit map to bounds
    map.fitBounds(bounds);
    // Bind the resize listener
    bindResizeListener(map, maps, bounds);
  };
  return (
    <>
      <h1>매장 리스트</h1>
      <Button variant="contained" color="primary" onClick={appendNewStore}>
        가게 추가하기
      </Button>
      <ReactModal isOpen={stores.showModal} onRequestClose={handleCloseModal} shouldCloseOnOverlayClick={false}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              매장정보 입력
        </Typography>
            <form className={classes.form} onSubmit={e => e.preventDefault()}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="mallName"
                label="매장명"
              />
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="address"
                label="주소"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              //onClick={}
              >
                등록
          </Button>
              <Grid container>
                <Grid item>

                  <GoogleMap
                    defaultZoom={10}
                    defaultCenter={[37.504073, 126.956887]}
                    yesIWantToUseGoogleMapApiInternals
                    onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                  >
                  </GoogleMap>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
          </Box>
        </Container>
      </ReactModal>
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
