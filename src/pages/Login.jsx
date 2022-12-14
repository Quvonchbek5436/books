import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {useNavigate} from 'react-router-dom';
import {memo, useState} from 'react';
import { axiosLogin, urlForMethod} from "../config";
import md5 from "md5";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Jovliyev Quvonchbek
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const Login = ({}) => {

    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        try {
            const res = await axiosLogin.get('myself', {
                headers: {
                    Key: data.get('key'),
                    Sign: md5('GET' + urlForMethod + "myself" + data.get('secret')),
                }
            })
            localStorage.setItem('key', res.data.data.key)
            localStorage.setItem('secret', res.data.data.secret)
            navigate('/Books')
        } catch (e) {
            console.log(e);
            setError(true)
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: 'url(https://source.unsplash.com/random?login)',
                        backgroundRepeat: 'no-repeat',
                        backgroundColor: (t) =>
                            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Login
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}} style={{width: "90%"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Key"
                                name="key"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="username"
                                label="Secret"
                                name="secret"
                                autoFocus
                            />


                            {error && <Typography component="p" variant="p"
                                                  style={{textAlign: 'center', marginTop: "12px", color: "#dc3545"}}>
                                Could not sign in with the provided credentials.
                            </Typography>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Login
                            </Button>
                            <Grid container
                                  style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Forgot your password?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link href="#" variant="body2" onClick={() => navigate('/sign_up')}>
                                        Don't have an account? Sign up
                                    </Link>
                                </Grid>
                            </Grid>
                            <Copyright sx={{mt: 5}}/>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}

export default memo(Login)