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
export default function SetLayout() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        storeInfo: [],
        markerSet: false,
        lat: 37.504073,
        lng: 126.956887,
    });

    const bindResizeListener = (map, maps, bounds) => {
        maps.event.addDomListenerOnce(map, 'idle', () => {
            maps.event.addDomListener(window, 'resize', () => {
                map.fitBounds(bounds);
            });
        });
    };

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
    return (
        <>
            <h1>매장 레이아웃 설정({values.selectedItem})</h1>
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
                        <Grid item>
                            <div style={{ height: '100vh', width: '100vh' }}>
                                <GoogleMap
                                    defaultZoom={10}
                                    defaultCenter={[37.504073, 126.956887]}
                                    onGoogleApiLoaded={({ map, maps }) => apiIsLoaded(map, maps)}
                                    onClick={(e) => {
                                        setValues({ markerSet: true, lat: e.lat, lng: e.lng });
                                    }}
                                >
                                    <Marker lat={values.lat} lng={values.lng} />
                                </GoogleMap>
                            </div>
                        </Grid>
                    </form>
                </div>
                <Box mt={8}>
                </Box>
            </Container>


        </>
    );
}
