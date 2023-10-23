import { faXmarkCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { styled } from '../../../stitches.config';
import { Flex, Text } from '..';

const Toast = ({ children, ...props }: any) => {
  const [visible, setVisible] = useState(true);

  function hideToast() {
    setVisible(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 6000);
    return () => clearTimeout(timer);
  }, []);

  return visible ? (
    <ToastWrapper id="toast" align={'center'} {...props}>
      <Text>
        {children}
        <FontAwesomeIcon
          style={{ cursor: 'pointer', marginLeft: '1rem' }}
          onClick={() => hideToast()}
          icon={faXmarkCircle}
        />
      </Text>
    </ToastWrapper>
  ) : null;
};

const ToastWrapper = styled(Flex, {
  variants: {
    type: {
      alert: {
        backgroundColor: '$red',
        '> *': {
          color: '$white',
        },
      },
      success: {
        backgroundColor: '$olive3',
        '> *': {
          color: '$white',
        },
      },
    },
  },
  defaultVariants: {
    type: 'success',
  },
  borderRadius: 6,
  boxShadow: '0 2px 20px rgba(0,0,0,0.15), 0 0 2px rgba(0,0,0,0.05)',
  border: '1px solid rgba(0,0,0,0.1)',
  padding: '1rem 2rem',
  width: 'fit-content',
  fontFamily: "'Outfit', sans-serif",
  fontWeight: 500,
  position: 'fixed',
  top: '4rem',
  left: '50%',
  transform: 'translateX(-50%)',
  zIndex: 100,
});

export default Toast;
