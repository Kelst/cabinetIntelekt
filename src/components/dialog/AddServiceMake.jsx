import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import Bay from '../../assets/bay.png'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MuiTelInput } from 'mui-tel-input';
import TextField from '@mui/material/TextField';
import useInfoStore from '../../store/infoStore';
import useStore from '../../store/store';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const user={
  name:"Безкоровайний Владислав Андрійович",
  uid:"140278",
  status:"active",
  telegramId:"",
  phone:'380951470082',
  login:'vlad_b_1',
  adress:"Чернівці, Проспект Незалежності 116б кв 60",
  statusInternet:true,
  balance:"-5450",
  deposit:"0",
  monthlyPayment:"274",
  dateOfEndCredits:"2023-12-15",
  tariff:"ЧЕРНІВЦІ-КОМФОРТ-1000(309)_Internet+TV",
  lastPay:"2023-01-15  225 грн",
  ip:"192.5.4.7",
  duration:"+4 01:11:03",
  sendData:"767.85 GB",
  getData:"43.34 GB",
  subLogin:[
    {
      monthlyPayment:"230",
      balance:"-230",
      login:"vlad_b_1",
    },
    {
      monthlyPayment:"270",
      balance:"-270",
      login:"dorosh_ukr50",
    }
  ]
,
tariffAvaibles:[
    {month_fee:180,name:"ЧЕРНІВЦІ-КОМФОРТ-300(180)_Internet"},
    {month_fee:207,name:"ЧЕРНІВЦІ-КОМФОРТ-300(207)_Internet+TV"},
    {month_fee:190,name:"ЧЕРНІВЦІ-КОМФОРТ-500(190)_Internet"},
    {month_fee:213,name:"ЧЕРНІВЦІ-КОМФОРТ-500(213)_Internet+TV"},
    {month_fee:350,name:"ЧЕРНІВЦІ-КОМФОРТ-1000(350)_Internet"},
    {month_fee:309,name:"ЧЕРНІВЦІ-КОМФОРТ-1000(309)_Internet+TV"},
    ]

 }

 function normalizePhoneNumber(phoneNumber) {
  let cleanedNumber = phoneNumber.replace(/\D/g, '');
  if (cleanedNumber.startsWith('380')) {
      cleanedNumber = cleanedNumber.slice(3);
  } else if (cleanedNumber.startsWith('80')) {
      cleanedNumber = cleanedNumber.slice(2);
  }

  cleanedNumber = cleanedNumber.replace(/^0+/, '');

  return cleanedNumber;
}
export default function AddServiceMake({open,handleClose,handleCloseService}) {
  const [phone,setPhone]=React.useState(`+380${normalizePhoneNumber(user.phone)}`)
  const [text,setText]=React.useState('')
  
  const addAdditionalService=useStore(state=>state.addAdditionalService)
  const login=useStore(state=>state.user.login)
  const uid=useStore(state=>state.user.uid)
  const setLoader = useInfoStore(store => store.setLoader);

  const maxLength = 200; // Максимальна кількість символів
  const handleChange = (e) => {
    const newText = e.target.value;
    if (newText.length <= maxLength) {
      setText(newText);
    }
  };
  const handlePhoneChange = (newValue) => {
    setPhone(newValue)
  }
  const showAllert=useInfoStore(state=>state.showAllert)  
 
const sendRequest= async()=>{
let result 
  try {
    setLoader(true);
     result = await addAdditionalService(uid,login,phone,text);
    if (result.success) {
      console.log("Session reloaded successfully");
      showAllert(2,"Дякуємо за вашу заявку, майстер зв'яжеться з вами для уточнення деталей.")
    } else {
      showAllert(0,result.message)

    }
  } catch (error) {
    showAllert(0,"Виникла помилка при створенні за`явки")
  } finally {
    setLoader(false)
    setText("")
    setPhone("")
    handleCloseService()
    handleClose()
   
  }
  
}


  return (
    <React.Fragment>
     
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className=' text-center ' sx={{minWidth:"280px",fontSize:"32px"}}>{"Додаткові послуги"}</DialogTitle>
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
        <DialogContent>
        <MuiTelInput
            inputProps={{
              maxLength: 16,
            }}
            autoFocus
            fullWidth
            margin='normal'
            defaultCountry='UA'
            value={phone}
            onChange={handlePhoneChange}
            />
         <TextField
         sx={{mt:1}}
      fullWidth
      label={`Опишіть ваше завдання (${maxLength - text.length} символів залишилося)`}
      multiline
      maxRows={4}
      variant="standard"
      value={text}
      onChange={handleChange}
        />
        </DialogContent>
        <DialogActions>
          <Button onClick={sendRequest} sx={{color:'black'}} disabled={phone.length==12?true:false}>Залишити заявку</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}