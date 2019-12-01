// 메인에서 수정 버튼 눌렀을 때 사용하는 페이지
import React from 'react'
import "react-table-drag-select/style.css";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Box from '@material-ui/core/Box';
import GoogleMap from '../components/GoogleMap';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Geocode from "react-geocode";
import { addMarketInfo } from '../api/stores';
import { useSnackbar } from 'notistack';
import { navigate } from 'gatsby';
import { getStores, appendStore, modifyMalls, deleteMalls, testItemList } from '../api/stores';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

const apiConfig = require('../config');

Geocode.setApiKey(apiConfig['key']['googleMap']);
Geocode.setLanguage("ko");
Geocode.setRegion("ko");
Geocode.enableDebug();

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

const successSnackbarOption = {
    variant: 'success',
};
const errorSnackbarOption = {
    variant: 'error',
};
export default function SetLayout() {
    const { enqueueSnackbar } = useSnackbar();
    const classes = useStyles();
    const [values, setValues] = React.useState({
        name: "",
        address: "",
        lat: 37.504073,
        lng: 126.956887,
        addressFromLatLng: "",
        maxFloor: 0,
        userId: cookies.get('userId'),
        isSending: false

    });
    values.userId = cookies.get('userId');
    const apiIsLoaded = (map, maps) => {
        console.log("apiIsLoaded");
        // Get bounds by our places
        //const bounds = new maps.LatLngBounds();
        // Fit map to bounds
        //map.fitBounds(bounds);
        // Bind the resize listener
        //bindResizeListener(map, maps, bounds);
    };

    const Marker = props => {
        return <div>
            <img
                src="http://icons.iconarchive.com/icons/paomedia/small-n-flat/256/map-marker-icon.png"
                style={{ height: "50px", width: "50px" }}
            />
        </div>
    }
    const sendMarketInfo = async () => {
        try {
            setValues({ isSending: true });
            let result = await addMarketInfo(values);
            console.log(result);
            cookies.set("editingMarketID", result.mallId);
            cookies.set("editingMarketMaxFloor", values.maxFloor);
            enqueueSnackbar('매장 등록 성공!', successSnackbarOption);
            navigate('/floorinfo');
        }
        catch (err) {
            setValues({ isSending: false });
            enqueueSnackbar("매장 등록 실패", errorSnackbarOption);
            console.log(err);
        }
    }
    const handleChange = name => event => {
        setValues({
            ...values,
            [name]: event.target.value,
        });
    };
    return (
        <>
            <Typography component="h1" variant="h5">
                매장정보 수정
            </Typography>
            <form className={classes.form} onSubmit={e => e.preventDefault()}>

                <Typography component="h2" variant="h5">
                    주소:{values.addressFromLatLng}
                </Typography>
                <Grid item>
                    <div style={{ height: '100vh', width: '100vh' }}>
                        <GoogleMap
                            defaultZoom={10}
                            defaultCenter={[37.504073, 126.956887]}
                            onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                            onClick={(e) => {
                                Geocode.fromLatLng(e.lat, e.lng).then(response => {
                                    setValues({
                                        addressFromLatLng: response.results[0].formatted_address,
                                        lat: e.lat,
                                        lng: e.lng
                                    });

                                }, error => {
                                    setValues({
                                        addressFromLatLng: "",
                                        lat: e.lat,
                                        lng: e.lng
                                    });
                                });
                            }}
                        >
                            <Marker lat={values.lat} lng={values.lng} />
                        </GoogleMap>
                    </div>
                </Grid>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="mallName"
                    label="매장명"
                    value={values.name}
                    onChange={handleChange('name')}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="address"
                    label="상세주소"
                    value={values.address}
                    onChange={handleChange('address')}
                />
                <TextField
                    id="maxFloor"
                    label="층수"
                    type="number"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    margin="normal"
                    onChange={handleChange('maxFloor')}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={sendMarketInfo}
                    disabled={values.isSending}
                >
                    등록
                </Button>
            </form>



        </>
    );
}
