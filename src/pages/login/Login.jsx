import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
const loginImage = new URL('../../assets/login.webp', import.meta.url).href;

import VpnKeyIcon from '@mui/icons-material/VpnKey';
import IoSwitch from '../../components/switches/IoSwitch.jsx';
import { useSpring, animated, config } from '@react-spring/web'
import { MuiTelInput } from 'mui-tel-input';
import CustomAlert from '../../components/alert/CustomAlert';
import useStore from '../../store/store';
import DropDownCard from '../../components/dropCard/DropDownCard';
import { FormControl, InputAdornment, OutlinedInput, Slide } from '@mui/material';
import { ContactPhone, Visibility, VisibilityOff, ArrowBack } from '@mui/icons-material';
import IconButton from '@mui/material/IconButton';
import Timer from '../../components/timer/Timer';
import { redirect, useNavigate } from 'react-router-dom';
import CustomAlertOld from '../../components/alert/CustomAlertOld.jsx';
import useConfigPage from '../../store/configPage.js';

const defaultTheme = createTheme();

export default function Login() {
  const navigate = useNavigate();
  const {
    checkBillingApi,
    checkUser,
    logIn,
    logInPhone,
    handleVeriffyCode: handleVeriffyCodes
  } = useStore();
  const isAuth=useStore(state=>state.isAuth)
  const [loginText, setLoginText] = React.useState("");
  const [loginIp, setLoginIp] = React.useState("");
  const [passwordIP, setPasswordIP] = React.useState("");
  const [passwordText, setPasswordText] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [checkedPhone, setCheckedPhone] = React.useState(false);
  const [code, setCode] = React.useState("");
  const [phone, setPhoneNumber] = React.useState("");
  const [previousPhone, setPreviousPhone] = React.useState("");
  const [phoneFromSMS, setPhoneFromSMS] = React.useState(false);
  const getImageUrl = useConfigPage.getState().getImageUrl;
  const imageUrl = useConfigPage(state => state.imageUrl);

  const [showAllert, setShowAllert] = React.useState({
    open: false,
    type: 0,
    message: ""
  });
  const [openLogIp, setOpenLogIp] = React.useState(false);

  const springs = useSpring({
    from: { x: -1000 },
    to: { x: 0 },
    config: { ...config.slow },
  });

  const springsText = useSpring({
    from: { x: -1000 },
    to: { x: 0 },
    config: { ...config.gentle },
  });

  const handleLogInWithPassword = async () => {
    try {
      const auth = await logIn(loginText, passwordText);
      
      if (!auth.flag) {
        setShowAllert({
          open: true,
          type: 0,
          message: auth.errText || 'Помилка при вході'
        });
        setPasswordText('');
      } else {
        navigate("/home");
      }
    } catch (error) {
      setShowAllert({
        open: true,
        type: 0,
        message: error?.message || 'Несподівана помилка при вході'
      });
      setPasswordText('');
    }
  };

  const handleLoginTextChange = (event) => {
    setLoginText(event.target.value);
  };

  const handlePasswordTextChange = (event) => {
    setPasswordText(event.target.value);
  };

  const handleVeriffyCode = async () => {
    try {
      const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '');
      const response = await handleVeriffyCodes(code, cleanPhone);
      
      if (!response) {
        setShowAllert({
          open: true,
          type: 0,
          message: response.errText || 'Невірний код підтвердження'
        });
        setCode('');
      } else {
        setShowAllert({
          open: true,
          type: 1,
          message: 'Код підтверджено успішно'
        });
        navigate("/home");
      }
    } catch (error) {
      setShowAllert({
        open: true,
        type: 0,
        message: error?.message || 'Помилка при перевірці коду'
      });
      setCode('');
    }
  };

  const handleCodeChange = (event) => {
    const inputValue = event.target.value;
    if (inputValue.length <= 4) {
      setCode(inputValue);
    }
  };

  const handleCloseAllert = () => {
    setShowAllert({ ...showAllert, open: false });
  };

  const handleCloseLoginIp = () => {
    setOpenLogIp(false);
  };

  const handleCheckedPhone = (event) => {
    setPhoneNumber("");
    setPreviousPhone("");
    setCheckedPhone(event.target.checked);
  };

  const handlePhoneChange = (newValue) => {
    setPhoneNumber(newValue);
  };

  const handleSendSms = async (event) => {
    event.preventDefault();
    const cleanPhone = phone.replace(/\s+/g, '').replace(/^\+/, '');
    const cleanPreviousPhone = previousPhone.replace(/\s+/g, '').replace(/^\+/, '');
    
    if (cleanPhone === cleanPreviousPhone) {
      setPhoneFromSMS(true);
      return;
    }

    let logInPhoneF = await logInPhone(cleanPhone);
    if (!logInPhoneF) {
      setShowAllert({ ...showAllert, message: `Користувач з номером ${phone} не знайдений !`, open: true, type: 0 });
      return;
    }

    setPreviousPhone(phone);
    setShowAllert({ ...showAllert, message: `Вам надіслано код підтвердження`, open: true, type: 1 });
    setPhoneFromSMS(true);
  };

  const handleBackToPhone = () => {
    setPhoneFromSMS(false);
    setCode("");
  };

  React.useEffect(() => {
    let isMounted = true;
  
    const fetchData = async () => {
      try {
    //     const flag = await checkUser();
    
        const userByIp = await checkBillingApi();
        if (isMounted && userByIp?.ip !== '') {
          setLoginIp(userByIp.id);
          setPasswordIP(userByIp.password);
          // Встановлюємо таймаут для відкриття, щоб компонент встиг отримати дані
          setTimeout(() => {
            if (isMounted) {
              setOpenLogIp(true);
            }
          }, 100);
        }
       await getImageUrl('Intelekt')
      } catch (error) {
        console.error("Error fetching IP data:", error);
      }
    };
  
    fetchData();
  
    return () => {
      isMounted = false;
    };
  }, []);


  const time = new Date();
  time.setSeconds(time.getSeconds() + 150);

  return (
    <ThemeProvider theme={defaultTheme}>
    <CustomAlertOld open={showAllert.open} type={showAllert.type} handleClose={handleCloseAllert} message={showAllert.message} />
    <Grid container component="main" sx={{ height: '100vh', position: 'relative' }}>
      <DropDownCard 
        open={openLogIp} 
        transition={Slide}
        handleClose={handleCloseLoginIp} 
        user={{ login: loginIp, password: passwordIP }} 
      />
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={4}
        md={7}
        sx={{
          position: 'relative',
          backgroundRepeat: 'no-repeat',
          backgroundColor: '#fefefe',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          bgcolor:"red",
          opacity:0.9,
          zIndex: 1,
          backgroundImage: `url(${imageUrl.logo})`,

          '&::before': {
            backgroundImage: `url(${imageUrl.logo})`,

            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: -1
          }
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
              overflow: 'hidden'
            }}
          >
            <Avatar className='cursor-pointer' sx={{ m: 1, bgcolor: '#c9303f', textShadow: "revert", boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
              {!checkedPhone ? <VpnKeyIcon /> : <ContactPhone />}
            </Avatar>
            <Typography component="h1" variant="h5" className='font-bold text-black'>
              Кабінет користувача
            </Typography>
            {!checkedPhone ? (
              <Box component="div" sx={{ mt: 1, width: '80%' }}>
                <animated.div style={springsText}>
                  <TextField
                    color={loginText.length > 0 ? 'success' : 'info'}
                    sx={{ mb: 2 }}
                    fullWidth
                    id="login"
                    label="Логін"
                    name="login"
                    autoComplete="login"
                    autoFocus
                    value={loginText}
                    onChange={handleLoginTextChange}
                  />
                  <FormControl fullWidth variant="outlined">
                    <OutlinedInput
                      color={passwordText.length >= 6 ? 'success' : 'error'}
                      fullWidth
                      name="password"
                      placeholder='Пароль'
                      id="password"
                      autoComplete="current-password"
                      value={passwordText}
                      onChange={handlePasswordTextChange}
                      type={showPassword ? 'text' : 'password'}
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={() => setShowPassword(!showPassword)}
                            onMouseDown={(e) => e.preventDefault()}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                    />
                  </FormControl>
                </animated.div>
                <animated.div style={springs}>
                  <Button
                    onClick={handleLogInWithPassword}
                    type="button"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    disabled={loginText.trim().length === 0 || passwordText.trim().length === 0}
                  >
                    Ввійти
                  </Button>
                </animated.div>
              </Box>
            ) : !phoneFromSMS ? (
              <Box component="div" sx={{ mt: 1, width: '80%' }}>
                <animated.div style={springsText}>
                  <MuiTelInput
                    inputProps={{
                      maxLength: 16,
                    }}
                    autoFocus
                    fullWidth
                    sx={{ mb: 2 }}
                    defaultCountry='UA'
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                </animated.div>
                <animated.div style={springs}>
                  <Button
                    disabled={phone.replace(/\s+/g, '').replace(/^\+/, '').length < 12}
                    type="submit"
                    fullWidth
                    variant="outlined"
                    sx={{ mt: 3, mb: 2 }}
                    onClick={handleSendSms}
                  >
                    Отримати код
                  </Button>
                </animated.div>
              </Box>
            ) : (
              <Box 
                component="div"
                className='flex flex-col items-center justify-center' 
                sx={{ mt: 1, width: '80%' }}
              >
                <animated.div style={springsText} className="w-full flex flex-col items-center">
                  <Box className="w-full flex items-center justify-center relative mb-4">
                    <IconButton 
                      onClick={handleBackToPhone}
                      sx={{ position: 'absolute', left: 0 }}
                    >
                      <ArrowBack />
                    </IconButton>
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ textAlign: 'center' }}
                    >
                      {phone}
                    </Typography>
                  </Box>
                  <TextField
                    sx={{ mb: 2 }}
                    id="code"
                    label="CODE"
                    type='number'
                    name="code"
                    autoComplete="code"
                    autoFocus
                    value={code}
                    onChange={handleCodeChange}
                    inputProps={{
                      style: { textAlign: 'center' }
                    }}
                  />
                </animated.div>
                <animated.div style={springs} className="flex flex-col items-center w-full">
                  <Timer 
                    showAllert={showAllert} 
                    setShowAllert={setShowAllert} 
                    setPhoneFromSMS={setPhoneFromSMS} 
                    expiryTimestamp={time} 
                  />
                  <Button
                    type="submit"
                    disabled={code === '' || code.length < 4}
                    variant="outlined"
                    sx={{ mt: 3, mb: 2, p: 2 }}
                    onClick={handleVeriffyCode}
                  >
                    Підтвердити код
                  </Button>
                </animated.div>
              </Box>
            )}
            <FormControlLabel
              className='flex flex-col sm:flex-row'
              control={<IoSwitch sx={{ m: 1 }} checked={checkedPhone} onChange={handleCheckedPhone} />}
              label="Вхід за номером телефону"
            />
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}