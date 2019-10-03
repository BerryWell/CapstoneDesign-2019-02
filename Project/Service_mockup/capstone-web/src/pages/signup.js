import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import MaskedInput from 'react-text-mask'
import PropTypes from 'prop-types';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
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
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function TextMaskCustom(props) {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={ref => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
}

TextMaskCustom.propTypes = {
  inputRef: PropTypes.func.isRequired,
};
export default function SignUp() {
  const classes = useStyles();
  const [values, setValues] = React.useState({
    phoneNumber: '(1  )    -    ',
    id:'',
    password:'',
    name:'',
    address:'',
  });
  const submitRef = React.createRef();
  const handleChange = name => event => {

    setValues({
      ...values,
      [name]: event.target.value,
    });
  };
  const isDisabled = () => {
    return values.id === '' || 
    values.password === '' || 
    values.name === '' || 
    values.address === '' || 
    values.phoneNumber === '(1  )    -    ';
  };
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="id"
                label="ID"
                name="id"
                autoComplete="id"
                onChange={handleChange('id')}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                onChange={handleChange('password')}
                autoComplete="current-password"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="name"
                label="Name"
                id="name"
                onChange={handleChange('name')}
                autoComplete="name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="address"
                label="Address"
                id="address"
                onChange={handleChange('address')}
                autoComplete="address"
              />
            </Grid>
            <Grid item xs={12}>
              <InputLabel htmlFor="formatted-text-mask-input">Phone Number</InputLabel>
              <Input
                value={values.phoneNumber}
                onChange={handleChange('phoneNumber')}
                id="formatted-text-mask-input"
                inputComponent={TextMaskCustom}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            ref={submitRef}
            disabled={isDisabled()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      </Box>
    </Container>
  );
}


