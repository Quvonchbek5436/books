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
import {axiosSignUp, urlForMethod} from "../config";
import md5 from "md5";

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Mualliflik huquqi © '}
            <Link color="inherit" href="#">
                Jovliyev Quvonchbek
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const theme = createTheme();

const SignUp = ({}) => {

    const navigate = useNavigate()
    const [error, setError] = useState(false)

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let body = JSON.stringify({
            name: data.get('name'),
            email: data.get('email'),
            key: data.get('key'),
            secret: data.get('secret')
        })
        try {
            const res = await axiosSignUp.post('signup', body, {
                // headers: {
                // "Access-Control-Allow-Origin": "*"
                //         Key: data.get('key'),
                //         Sign: md5('POST' + urlForMethod + "signup" + `{"name": ${data.get('name')},"email": ${data.get('email')}, "key": ${data.get('key')}, "secret": ${data.get('secret')} }` +data.get('secret')),
                //     }
            })
            console.log(res)

            navigate("/login")
        } catch (e) {
            console.log(e);
            setError(true);
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
                        backgroundImage: 'url(https://source.unsplash.com/random?signup)',
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
                            Ro'yxatdan o'tish
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}} style={{width: "90%"}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="name"
                                label="Ism"
                                name="name"
                                autoComplete="name"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="email"
                                label="Email"
                                type="email"
                                id="email"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="key"
                                label="Kalit"
                                type="text"
                                id="key"
                                autoComplete="current-password"
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="secret"
                                label="Sir"
                                type="text"
                                id="secret"
                                autoComplete="current-password"
                            />

                            {error && <Typography component="p" variant="p"
                                                  style={{textAlign: 'center', marginTop: "12px", color: "#dc3545"}}>
                                Taqdim etilgan hisob ma’lumotlari bilan tizimga kirib bo‘lmadi.
                            </Typography>}

                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Ro'yxatdan o'tish
                            </Button>
                            <Grid container
                                  style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                                <Grid item>
                                    <Link href="#" variant="body2">
                                        Kalit so'zini unitdingizmi?
                                    </Link>
                                </Grid>
                                <Grid item>
                                    <Link to="" variant="body2" onClick={() => navigate('/login')}>
                                        Hisobingiz bormi? Kirish
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

export default memo(SignUp)