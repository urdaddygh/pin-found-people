import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import s from "./Auth.module.scss";
// import Input from "../../components/input/Input";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postAuth } from "../../redux/slices/authSlice";
// import Button from "../../components/button/Button";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
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

const Auth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authErr = useSelector((state) => state.auth.error);

  const formik = useFormik({
    initialValues: {
      pin: "",
      password: "",
    },

    onSubmit: (values) => {
      let data = { values, navigate };
      dispatch(postAuth(data));
    },
  });


  
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          noValidate
          onSubmit={formik.handleSubmit}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Login"
            name="pin"
            value={formik.values.pin}
            // autoComplete="email"
            onChange={formik.handleChange}
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            value={formik.values.password}
            onChange={formik.handleChange}
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {authErr && <p className={s.wrongPass}>Wrong password or pin</p>}
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign In
          </Button>


          {/* <Grid container>
            <Grid item xs>
            <Link href="#" variant="body2">
              Forgot password?
            </Link>
          </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid> */}
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>

    // <div className={s.auth_cont}>
    //   <form onSubmit={formik.handleSubmit}>
    //     <Input
    //       name="name"
    //       value={formik.values.name}
    //       type="text"
    //       onChange={formik.handleChange}
    //       placeholder="Введите логин"
    //     />
    //     <Input
    //       name="password"
    //       value={formik.values.password}
    //       type="password"
    //       onChange={formik.handleChange}
    //       background={authErr && "red"}
    //       placeholder="Введите пароль"
    //     />
    //     {authErr && <p className={s.wrongPass}>Такого аккаунта нет.</p>}
    //     <Button
    //       text="ВОЙТИ"
    //       type="submit"
    //       disabled={
    //         !(
    //           formik.values.password &&
    //           formik.values.name
    //         )
    //       }
    //     />
    //   </form>
    // </div>
  );
};

export default Auth;
