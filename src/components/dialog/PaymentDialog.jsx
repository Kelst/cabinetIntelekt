import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import CalculateIcon from '@mui/icons-material/Calculate';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import DialogDiscount from './DialogDiscount';
import useStore from '../../store/store';
import { useEffect } from 'react';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: 'black',
    },
  },
}));

export default function PaymentDialog({open, handleClose, type}) {
  const [login, setLogin] = React.useState('0');
  const [subLogin, setSubLogin] = React.useState([]);
  const [sumText, setSumText] = React.useState("");
  const [openDiscount, setOpenDiscount] = React.useState(false);
  const user = useStore(state => state.userData); 
  const makerLinksToFastPayEasyPay = useStore(state => state.makerLinksToFastPayEasyPay); 
  
  const handleRedirectTo=(type)=>{
     switch (type) {
      case 'liqpay':
        
      break;
      case 'easypay':
        window.location.href ='https://easypay.ua/ua/partners/intelekt-group/intelekt-group?hash='+makerLinksToFastPayEasyPay(sumText,user.login)
      break;
      case 'portmone':
        
      break;
      case 'privat24':
        
      break;
     
      default:
        break;
     }
  }
  useEffect(() => {
    if (user) {
      const result = [
        {
          monthlyPayment: user.monthlyPayment,
          balance: user.balance,
          login: user.login
        }
      ];
      
      // Додаємо всі subLogin, якщо вони існують
      if (user.subLogin && Array.isArray(user.subLogin)) {
        result.push(...user.subLogin);
      }
  
      setSubLogin(result);
      setSumText(user.monthlyPayment || '0');
      setLogin('0');
    }
  }, [user]);

  const handleShowDiscount = () => {
    setOpenDiscount(true);
  };

  const handleChange = (event) => {
    const selectedIndex = event.target.value;
    setLogin(selectedIndex);
    
    // Safely access the selected login's monthly payment
    const selectedLogin = subLogin[selectedIndex];
    if (selectedLogin && selectedLogin.monthlyPayment) {
      setSumText(selectedLogin.monthlyPayment);
    }
  };

  // Get the current selected login's monthly payment safely
  const getCurrentMonthlyPayment = () => {
    const selectedLogin = subLogin[login];
    return selectedLogin ? selectedLogin.monthlyPayment : '0';
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={'lg'}
      >
       <DialogTitle className="text-center text-lg tracking-wider min-w-[280px]">
  Спосіб оплати {type}
</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className='flex justify-center items-center'>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Логін</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              input={<BootstrapInput />}
              value={login}
              label="Логін"
              onChange={handleChange}
            >
              {subLogin.map((item, index) => (
                <MenuItem key={index} value={index}>
                  {item.login} - баланс <span className='text-xl font-bold'> ({item.balance})</span> грн.
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>Виберіть необхідний логін</FormHelperText>
            <div className='flex flex-col gap-1 sm:flex-row'>
              <TextField
                id="outlined-helperText"
                value={sumText}
                onChange={(e) => setSumText(e.target.value)}
                type='number'
                helperText="Рекомендована сума"
                sx={{marginTop:"20px"}}
              />
              <Button
                sx={{fontSize:'12px'}}
                color="primary"
                size="small"
                variant="filledTonal"
                endIcon={<CalculateIcon />}
                onClick={handleShowDiscount}
              >
                розрахувати 6/12/24 міс.
              </Button>
            </div>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>handleRedirectTo(type)} sx={{color:'black'}}>Продовжити</Button>
        </DialogActions>
      </Dialog>
      
      <DialogDiscount 
        open={openDiscount}
        handleAction={(sums) => setSumText(sums)}
        handleClose={() => setOpenDiscount(false)}
        monthlyPayment={getCurrentMonthlyPayment()}
      />
    </React.Fragment>
  );
}