import {useState} from 'react'
import { Grid,Paper, Avatar, TextField, Button, Typography, Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as yup from 'yup';
import { useFormik } from 'formik';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import userService from '../services/userService';

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .min(8, 'Password should be of minimum 8 characters length')
      .required('Password is required'),
    passwordConfirmation: yup.string().when("password", {
        is: val => (val && val.length > 0 ? true : false),
        then: yup.string().oneOf(
          [yup.ref("password")],
          "Passwords must match"
        )
      })
  });

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const paperStyle={padding :20,height:'70vh',width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const gridStyle={backgroundColor:'transparent'}

    const formik = useFormik({
        initialValues: {
          email: 'foobar@example.com',
          password: 'foobar',
          passwordConfirmation: "foobar"
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          validationSchema.isValid()
          try {
            await userService.register(values.email ,values.password);
            alert(JSON.stringify(values, null, 2));
          } catch (e) {
            alert(e)
          }
        },
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit()
    }

    return (
        <div>
            <Grid style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <Grid align='center' sx={{ flexGrow: 1 }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Register</h2>
                </Grid>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        required
                        id="email"
                        name="email"
                        label={'ex. ' + formik.initialValues.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        fullWidth
                        required
                        id="password"
                        name="password"
                        label="Type your Password"
                        type= {showPassword ? "test" : "password"}
                        onChange={formik.handleChange}
                        error={formik.touched.password && Boolean(formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    >
                    </TextField>
                    <TextField
                        fullWidth
                        required
                        id="passwordConfirmation"
                        name="passwordConfirmation"
                        label="Re-type your password"
                        type= {showPassword ? "test" : "password"}
                        onChange={formik.handleChange}
                        error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
                        helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
                        InputProps={{ // <-- This is where the toggle button is added.
                            endAdornment: (
                              <InputAdornment position="end">
                                <IconButton
                                  aria-label="toggle password visibility"
                                  onClick={handleClickShowPassword}
                                  onMouseDown={handleMouseDownPassword}
                                >
                                  {showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                              </InputAdornment>
                            )
                          }}
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Register</Button>
                    <Typography > Already have an account ? 
                     <Link href="/login" >
                        Log in
                    </Link>
                    </Typography>
                </form>
            </Paper>
        </Grid>
        </div>
    )
}

export default Register;
