import {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Grid,Paper, Avatar, TextField, Button, Typography,Link } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CancelIcon from '@mui/icons-material/Cancel';
import * as yup from 'yup';
import { useFormik } from 'formik';
import Checkbox from '@material-ui/core/Checkbox';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import librarySdk from '../services/librarySdk'

const validationSchema = yup.object({
    email: yup
      .string('Enter your email')
      .email('Enter a valid email')
      .required('Email is required'),
    password: yup
      .string('Enter your password')
      .required('Password is required'),
  });

const Login = ({handleToggle, setUser})=>{
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    const handleMouseDownPassword = () => setShowPassword(!showPassword);

    const [areCredentialsWrong, setAreCredentialsWrong] = useState(false);

    const paperStyle={padding :20, height:'70vh', width:280, margin:"20px auto"}
    const avatarStyle={backgroundColor:'#1bbd7e'}
    const btnstyle={margin:'8px 0'}
    const gridStyle={backgroundColor:'transparent'}
    const errorMsgStyle={textAlign:'center', color: 'red', fontSize: '1rem', margin:'0.5rem'}

    const formik = useFormik({
        initialValues: {
          email: 'foobar@example.com',
          password: 'foobar',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
          try {
            const res = await librarySdk.login(values.email, values.password);
            
            handleToggle();   
            setUser(res.user);
            setAreCredentialsWrong(false);
            navigate("/")
          } catch (e) {
            setAreCredentialsWrong(true);
          }
        },
      });

    const handleSubmit = (e) => {
        e.preventDefault();
        formik.handleSubmit();
    }
    
    return(
        <Grid style={gridStyle}>
            <Paper elevation={10} style={paperStyle}>
                <CancelIcon onClick={handleToggle}></CancelIcon>
                <Grid align='center' sx={{ flexGrow: 1 }}>
                     <Avatar style={avatarStyle}><LockOutlinedIcon/></Avatar>
                    <h2>Sign In</h2>
                </Grid>
                {areCredentialsWrong && <div style={errorMsgStyle}>Your email or password is incorrect. Please try again</div>}
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
                        label="Password"
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
                    />
                    <FormControlLabel
                        control={
                        <Checkbox
                            name="checkedB"
                            color="primary"
                        />
                        }
                        label="Remember me"
                    />
                    <Button type='submit' color='primary' variant="contained" style={btnstyle} fullWidth>Sign in</Button>
                </form>
                <Typography >
                     <Link href="#" >
                        Forgot password ?
                </Link>
                </Typography>
                <Typography > Do you have an account ?
                     <Link href="/register" >
                        Sign Up 
                </Link>
                </Typography>
            </Paper>
        </Grid>
    )
}

export default Login;
