import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TvIcon from '@mui/icons-material/Tv';
import Accordion from '@mui/material/Accordion';
import Button from '@mui/material/Button';
import BrowserUpdatedIcon from '@mui/icons-material/BrowserUpdated';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import SettingsIcon from '@mui/icons-material/Settings';
import Tooltip from '@mui/material/Tooltip';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import useStore from '../../store/store';
import ContactInfoButton from '../сontactInfoButton/ContactInfoButton';
import TariffDialog from '../dialog/TariffDialog';
import useConfigPage from '../../store/configPage';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography component="div">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function MenuTV() {
  const [value, setValue] = React.useState(0);
  const tariff=useStore(state=>state.user.tariff)
  const [expandedPanel, setExpandedPanel] = React.useState(false);
  const [openDialogTariff,setOpenDialogTariff]=  React.useState(false)
  const configCabinet = useConfigPage(state => state.configCabinet);
  function handleDisplayTariff(){
    setOpenDialogTariff(true)
  }
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDownload = () => {
    const downloadLink = document.createElement('a');
    downloadLink.href = 'https://tv.intelekt.net/files/intelekt.apk';
    downloadLink.download = 'intelekt.apk';
    downloadLink.click();
  };

  const InfoBanner = () => (
    <div className="mb-6">
      
       {!tariff.includes("TV")?
        <> <Alert 
        severity="info" 
        icon={<InfoIcon sx={{ color: '#DC2626' }} />}
        sx={{
          backgroundColor: '#1F2937',
          color: 'white',
          border: '1px solid #374151',
          '& .MuiAlert-icon': {
            color: '#DC2626',
          },
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      ><AlertTitle sx={{ 
          color: '#DC2626', 
          fontWeight: 'bold',
          fontSize: '1.1rem',
          mb: 2 
        }}>
          Важлива інформація про доступ
        </AlertTitle>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
            <Typography className="text-gray-300">
              INTELEKT TV доступне тільки для абонентів з активним тарифним планом, що включає телебачення
            </Typography>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 rounded-full bg-red-600 mt-2"></div>
            <Typography className="text-gray-300">
              Для активації сервісу зверніться до служби підтримки або оберіть відповідний тарифний план у особистому кабінеті
            </Typography>
          </div>
        </div> <div className="mt-4 flex gap-4">
          <Button 
            variant="contained"
            sx={{
              backgroundColor: '#DC2626',
              '&:hover': {
                backgroundColor: '#B91C1C',
              },
            }}
            onClick={handleDisplayTariff}
          >
            Обрати тариф
          </Button>
          
            <ContactInfoButton />
        
        </div>
      </Alert>
       </>
        :""}
      
       
    </div>
  );

  return (
    <Box sx={{ 
      width: '100%',
      backgroundColor: '#111827',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
    }}>
      <Box sx={{ 
        borderBottom: '1px solid #374151',
        backgroundColor: '#1F2937'
      }}>
        <Tabs 
          value={value} 
          onChange={handleChange}
          variant="fullWidth"
          sx={{
            '& .MuiTabs-indicator': {
              backgroundColor: '#DC2626',
            },
          }}
        >
          <Tab
            icon={<TvIcon />}
            label="INTELEKT TV"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#DC2626',
              },
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            {...a11yProps(0)}
          />
{     configCabinet.additional.megogo?     <Tab
            icon={<TvIcon />}
            label="MEGOGO"
            sx={{
              color: 'rgba(255, 255, 255, 0.7)',
              '&.Mui-selected': {
                color: '#DC2626',
              },
              textTransform: 'uppercase',
              fontWeight: 'bold',
            }}
            {...a11yProps(1)}
          />:<></>}
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <div className="space-y-4">
          <InfoBanner />
          
          <div className="flex items-center gap-4 flex-wrap p-4 bg-gray-900 rounded-lg">
            <Tooltip title="Для пристроїв Android/Android TV" placement="bottom">
              <Typography className="text-gray-300 font-medium">
                Завантажити APK файл
              </Typography>
            </Tooltip>
            <Button
              onClick={handleDownload}
              startIcon={<BrowserUpdatedIcon />}
              sx={{
                color: 'white',
                borderColor: '#DC2626',
                '&:hover': {
                  borderColor: '#EF4444',
                  backgroundColor: 'rgba(220, 38, 38, 0.1)',
                },
              }}
              variant="outlined"
            >
              Завантажити
            </Button>
          </div>

          {[
            {
              title: '1. ЦИФРОВА ЯКІСТЬ СУПУТНИКА',
              content: 'ПОНАД 200 КАНАЛІВ ЦИФРОВОЇ ЯКОСТІ: КІНО, СПОРТ, НАУКА, МУЛЬТФІЛЬМИ, HD ТА БАГАТО ІНШОГО!',
            },
            {
              title: '2. ПЕРСОНАЛЬНИЙ ТЕЛЕ-ЕФІР',
              content: 'ПЕРЕГЛЯДАЙТЕ ТЕЛЕПЕРЕДАЧІ, ЩО ПРОПУСТИЛИ ЗА ТИЖДЕНЬ У БУДЬ-ЯКИЙ ЧАС!',
            },
            {
              title: '3. БАТЬКІВСЬКИЙ КОНТРОЛЬ',
              content: 'БЛОКУЙТЕ ДІТЯМ ДОСТУП ДО ПЕРЕГЛЯДУ НЕБАЖАНОГО КОНТЕНТУ',
            },
            {
              title: '4. ПАУЗА ПРЯМОГО ЕФІРУ',
              content: 'ПРИЗУПИНЯЙТЕ ПРЯМИЙ ЕФІР ТА ПРОДОВЖУЙТЕ ПЕРЕГЛЯД КОЛИ ЗАБАЖАЄТЕ',
            },
            {
              title: '5. НАЙКРАЩИЙ КОНТЕНТ',
              content: 'СТВОРЮЙТЕ ВЛАСНИЙ СПИСОК УЛЮБЛЕНИХ КАНАЛІВ',
            },
            {
              title: '6. ДОДАТОК ДО ПРИСТРОЇВ',
              content: 'ЗАВАНТАЖУЙ МОБІЛЬНИЙ ДОДАТОК НА СВІЙ ТЕЛЕФОН АБО ВАШ ТЕЛЕВІЗОР В 2 КЛІКИ',
            },
          ].map((item, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: '#1F2937',
                color: 'white',
                borderRadius: '8px !important',
                marginBottom: '8px',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '8px 0',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<SettingsIcon sx={{ color: '#DC2626' }} />}
                sx={{
                  '&.Mui-expanded': {
                    backgroundColor: '#374151',
                    borderRadius: '8px 8px 0 0',
                  },
                }}
              >
                <Typography className="font-bold text-gray-200">
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#111827' }}>
                <Typography className="text-sm text-gray-400">
                  {item.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </CustomTabPanel>

     {configCabinet.additional.megogo? <CustomTabPanel value={value} index={1}>
        <div className="space-y-4">
          {[
            {
              title: 'Питання 1',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            },
            {
              title: 'Питання 2',
              content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex, sit amet blandit leo lobortis eget.',
            },
          ].map((item, index) => (
            <Accordion
              key={index}
              sx={{
                backgroundColor: '#1F2937',
                color: 'white',
                borderRadius: '8px !important',
                marginBottom: '8px',
                '&:before': {
                  display: 'none',
                },
                '&.Mui-expanded': {
                  margin: '8px 0',
                },
              }}
            >
              <AccordionSummary
                expandIcon={<SettingsIcon sx={{ color: '#DC2626' }} />}
                sx={{
                  '&.Mui-expanded': {
                    backgroundColor: '#374151',
                    borderRadius: '8px 8px 0 0',
                  },
                }}
              >
                <Typography className="font-bold text-gray-200">
                  {item.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={{ backgroundColor: '#111827' }}>
                <Typography className="text-sm text-gray-400">
                  {item.content}
                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </CustomTabPanel>:<></>}

      <TariffDialog open={openDialogTariff}  handleClose={()=>{setOpenDialogTariff(false)}} />

    </Box>
  );
}