import React, { memo, useEffect } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import SettingsIcon from '@mui/icons-material/Settings';
import Box from '@mui/material/Box';
import useConfigPage from '../../store/configPage';
import { MagicExit, MagicMotion } from "react-magic-motion";

const CustomAccordionDetails = memo(({ content }) => (
  <AccordionDetails sx={{ backgroundColor: '#111827' }}>
    <Typography className="text-sm text-gray-400" sx={{ whiteSpace: 'pre-wrap' }}>
      {content}
    </Typography>
  </AccordionDetails>
));

CustomAccordionDetails.displayName = 'CustomAccordionDetails';

const CustomAccordionSummary = memo(({ title }) => (
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
      {title}
    </Typography>
  </AccordionSummary>
));

CustomAccordionSummary.displayName = 'CustomAccordionSummary';

const FAQItem = memo(({ item }) => (
  <Accordion
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
    <CustomAccordionSummary title={item.title} />
    <CustomAccordionDetails content={item.description} />
  </Accordion>
));

FAQItem.displayName = 'FAQItem';

const FAQ = () => {
  const { faq, getFaq } = useConfigPage();

  useEffect(() => {
    getFaq('Intelekt');
  }, [getFaq]);

  return (
    <Box sx={{ 
      width: '100%',
      backgroundColor: '#111827',
      borderRadius: '16px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      padding: '24px'
    }}>
      <div className="space-y-4">
        {faq.filter(item => item.displayFaq).map((item) => (
          <FAQItem 
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </Box>
  );
};

export default FAQ;