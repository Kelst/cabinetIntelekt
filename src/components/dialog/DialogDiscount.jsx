import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function DialogDiscount({open,handleClose,handleAction,monthlyPayment}) {
    function calc_6(monthlyPayment){
      
        let sum=(monthlyPayment*6)-((monthlyPayment*6)*0.15)
        
        return Math.round(sum)

    }
    function calc_12(monthlyPayment){

        let sum=(monthlyPayment*12)-((monthlyPayment*12)*0.25)
        
        return Math.round(sum)
    }
    function calc_24(){
        let sum=(monthlyPayment*24)-((monthlyPayment*24)*0.35)
        
        return Math.round(sum)

    }
  return (
    <div>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        fullWidth={true}
        maxWidth={'lg'}
      >
        <DialogTitle className=' text-center ' sx={{minWidth:"280px",fontSize:"18px",letterSpacing:1.5}}>Акції оплат 6/12/24 міс.</DialogTitle>
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
        <DialogContent  >
        <div className="flex flex-col">
  <div className="overflow-x-auto sm:-mx-6 lg:-mx-6">
    <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
      <div className="overflow-hidden">
        <table className="min-w-full text-left text-sm font-light">
          <thead className="border-b font-medium dark:border-neutral-500">
            <tr>
              <th scope="col" className="px-6 py-4">К-сть</th>
              <th scope="col" className="px-6 py-4">Сума</th> 
              <th scope="col" className="px-6 py-4">Дія</th> 
              
            </tr>
          </thead>
          <tbody>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4 font-medium">6 міс. -15%</td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className='flex flex-col  justify-center'>
                <span className=' text-gray-500  line-through text-xl'>{monthlyPayment*6} грн.</span>
             <span className='  font-bold text-xl'>{calc_6(monthlyPayment)} грн.</span>    
                </div>
                <span>
                ви заощаджуєте :  {Math.round(monthlyPayment*6 *0.15)} грн.
                </span>
                </td>
              <td className="whitespace-nowrap px-6 py-4"> <Button
        sx={{
          fontSize:'12px'
        }}
  color="primary"
  disabled={false}
  size="small"
  variant="filledTonal"
  onClick={()=>{handleAction(Math.round((monthlyPayment*6)-((monthlyPayment*6)*0.15)))
    handleClose()
  }}
>
вибрати 
  </Button></td>
       
            </tr>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
    <td className="whitespace-nowrap px-6 py-4 font-medium">12 міс. -25%</td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className='flex flex-col  justify-center'>
                <span className=' text-gray-500  line-through text-xl'>{monthlyPayment*12} грн.</span>
             <span className='  font-bold text-xl'>{calc_12(monthlyPayment)} грн.</span>    
                </div>
                <span>
                ви заощаджуєте : {Math.round(monthlyPayment*12 *0.25)} грн.
                </span>
                </td>
              <td className="whitespace-nowrap px-6 py-4"><Button
        sx={{
          fontSize:'12px'
        }}
  color="primary"
  disabled={false}
  size="small"
  variant="filledTonal"
  onClick={()=>{handleAction(Math.round((monthlyPayment*12)-((monthlyPayment*12)*0.25)))
    handleClose()
}}
 
>
вибрати 
  </Button></td>
         
            </tr>
            <tr
              className="border-b transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
              <td className="whitespace-nowrap px-6 py-4 font-medium">24 міс. -35%</td>
              <td className="whitespace-nowrap px-6 py-4">
                <div className='flex flex-col  justify-center'>
                <span className=' text-gray-500  line-through text-xl'>{monthlyPayment*24} грн.</span>
             <span className='  font-bold text-xl'>{calc_24(monthlyPayment)} грн.</span>    
                </div>
                <span>
                ви заощаджуєте : {Math.round(monthlyPayment*24 * 0.35)} грн.
                </span>
                </td>
              <td className="whitespace-nowrap px-6 py-4"><Button
        sx={{
          fontSize:'12px'
        }}
  color="primary"
  disabled={false}
  size="small"
  variant="filledTonal"
  onClick={()=>{handleAction(Math.round((monthlyPayment*24)-((monthlyPayment*24)*0.35)))
    handleClose()
  }}
>
вибрати 
  </Button></td>
      
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>
        </DialogContent>
        <DialogActions>
         
        </DialogActions>
      </Dialog>
    </div>
  )
}
