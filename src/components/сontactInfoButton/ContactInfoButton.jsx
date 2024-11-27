import React, { useState, useEffect } from 'react';
import { IconButton, Popover, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { Phone, ContentCopy } from '@mui/icons-material';
import { useSpring, animated } from 'react-spring';

const ContactInfoButton = ({ iconColor }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [copiedNumber, setCopiedNumber] = useState('');
  const [copiedItemIndex, setCopiedItemIndex] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyNumber = (number, index) => {
    navigator.clipboard.writeText(number).then(() => {
      setCopiedNumber(number);
      setCopiedItemIndex(index);
    });
  };

  useEffect(() => {
    if (copiedNumber) {
      const timer = setTimeout(() => {
        setCopiedNumber('');
        setCopiedItemIndex(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [copiedNumber]);

  const open = Boolean(anchorEl);

  const animationProps = useSpring({
    opacity: open ? 1 : 0,
    transform: open ? 'scale(1)' : 'scale(0.8)',
  });

  const callCenterNumbers = [
    { number: '0997043200', label: 'Технічна підтримка' },
    { number: '0987043200', label: '' },
    { number: '0977043200', label: '' },
    { number: '0967043200', label: '' },
    { number: '0957043200', label: '' },
    { number: '0777043200', label: '' },
    { number: '0737043200', label: '' },
    { number: '0687043200', label: '' }
  ];

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
          <List>
            {callCenterNumbers.map((item, index) => (
              <ListItem
                key={index}
                secondaryAction={
                  <div style={{ position: 'relative' }}>
                    <IconButton
                      edge="end"
                      aria-label="copy"
                      onClick={() => handleCopyNumber(item.number, index)}
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
                        Скопійовано: {copiedNumber}
                      </div>
                    )}
                  </div>
                }
              >
                <ListItemIcon>
                  <Phone />
                </ListItemIcon>
                <ListItemText primary={item.label} secondary={item.number} />
              </ListItem>
            ))}
          </List>
        </animated.div>
      </Popover>
    </>
  );
};

export default ContactInfoButton;