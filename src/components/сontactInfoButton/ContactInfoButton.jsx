import React, { useState, useEffect } from 'react';
import { IconButton, Popover, List, ListItem, ListItemText, ListItemIcon, Typography } from '@mui/material';
import { Phone, ContentCopy } from '@mui/icons-material';
import { useSpring, animated } from 'react-spring';
import useConfigPage from '../../store/configPage';

const ContactInfoButton = ({ iconColor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copiedphone, setCopiedphone] = useState('');
  const [copiedItemIndex, setCopiedItemIndex] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyphone = (phone, index) => {
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedphone(phone);
      setCopiedItemIndex(index);
    });
  };

  useEffect(() => {
    if (copiedphone) {
      const timer = setTimeout(() => {
        setCopiedphone('');
        setCopiedItemIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copiedphone]);

  const open = Boolean(anchorEl);

  const animationProps = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? 'scale(1)' : 'scale(0.8)',
  });
  const configCabinet = useConfigPage(state => state.configCabinet);

  // const callCenterphones = [
  //   { phone: '0997043200', label: 'Технічна підтримка' },
  //   { phone: '0987043200', label: '' },
  //   { phone: '0977043200', label: '' },
  //   { phone: '0967043200', label: '' },
  //   { phone: '0957043200', label: '' },
  //   { phone: '0777043200', label: '' },
  //   { phone: '0737043200', label: '' },
  //   { phone: '0687043200', label: '' }
  // ];

  return (
    <>
      <IconButton onClick={handleClick}>
        <Phone sx={{ color: iconColor }} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <animated.div style={animationProps}>
          <div className=' flex items-center justify-center font-bold mt-1'>Технічна підтримка</div>
          <List>
            
            {configCabinet.phoneNumbers.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <div style={{ position: 'relative' }}>
                    <IconButton
                      edge="end"
                      aria-label="copy"
                      onClick={() => handleCopyphone(item.phone, index)}
                    >
                      <ContentCopy />
                    </IconButton>
                    {copiedItemIndex === index && (
                      <div
                        style={{
                          position: 'absolute',
                          top: '100%',
                          right: 0,
                          backgroundColor: 'rgba(0, 0, 0, 1)',
                          color: 'white',
                          padding: '5px 10px',
                          borderRadius: '4px',
                          zIndex: 99999,
                          whiteSpace: 'nowrap',
                        }}
                      >
                        Скопійовано: {copiedphone}
                      </div>
                    )}
                  </div>
                }
              >
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={item.label} secondary={item.phone} />
              </ListItem>
            ))}
          </List>
        </animated.div>
      </Popover>
    </>
  );
};

export default ContactInfoButton;