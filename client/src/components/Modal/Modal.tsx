import { useState, useRef, useEffect } from 'react';
import { Portal } from '../Portal';
import { styled } from '../../../stitches.config';
import { Flex } from '../Flex';

const Modal = (props: {
  children?: any;
  open?: any;
  onClose?: any;
  locked?: any;
  style?: any;
  noBackdrop?: any;
}) => {
  // set up active state
  const [active, setActive] = useState(false);
  // get spread props out variables
  const { open, onClose, locked, noBackdrop } = props;
  // Make a reference to the backdrop
  const backdrop = useRef<any>(null);

  // on mount
  useEffect(() => {
    // get dom element from backdrop
    const { current } = backdrop;
    // when transition ends set active state to match open prop
    const transitionEnd = () => setActive(open);
    // when esc key press close modal unless locked
    const keyHandler = (e: { which: number }) =>
      !locked && [27].indexOf(e.which) >= 0 && onClose();
    // when clicking the backdrop close modal unless locked
    const clickHandler = (e: { target: null }) =>
      !locked && e.target === current && onClose();

    // if the backdrop exists set up listeners
    if (current) {
      current?.addEventListener('transitionend', transitionEnd);
      current?.addEventListener('click', clickHandler);
      window.addEventListener('keyup', keyHandler);
    }

    // if open props is true add inert to #root
    // and set active state to true
    if (open) {
      window.setTimeout(() => {
        if (document.activeElement instanceof HTMLElement) {
          document?.activeElement?.blur();
        }
        setActive(open);
        document?.querySelector('#root')?.setAttribute('inert', 'true');
      }, 10);
    }

    // on unmount remove listeners
    return () => {
      if (current) {
        current?.removeEventListener('transitionend', transitionEnd);
        current?.removeEventListener('click', clickHandler);
      }

      document?.querySelector('#root')?.removeAttribute('inert');
      window.removeEventListener('keyup', keyHandler);
    };
  }, [open, locked, onClose]);

  return (
    <>
      {(open || active) && (
        <Portal className="modal-portal">
          <Backdrop
            ref={backdrop}
            className={active && open && 'active'}
            onClick={() => setActive(!open)}
            style={{ backgroundColor: noBackdrop && 'transparent' }}
          />
          <Content
            direction={'column'}
            className="modal-content"
            style={props.style}
          >
            {props.children}
          </Content>
        </Portal>
      )}
    </>
  );
};

export default Modal;

const Backdrop = styled('div', {
  position: 'fixed',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundColor: 'rgba(51, 51, 51, 0.3)',
  backdropFilter: 'blur(1px)',
  opacity: 0,
  transition: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
  transitionDelay: '200ms',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 10,
  '& + .modal-content': {
    transform: 'translateY(calc(-50% + 100px)) translateX(-50%)',
    transition: 'all 200ms cubic-bezier(0.4, 0, 0.2, 1)',
    opacity: 0,
  },
  '&.active': {
    transitionDuration: '250ms',
    transitionDelay: '0ms',
    opacity: 1,
    '& + .modal-content': {
      transform: 'translateY(-50%) translateX(-50%)',
      opacity: 1,
      transitionDelay: '150ms',
      transitionDuration: '350ms',
    },
  },
});

const Content = styled(Flex, {
  position: 'fixed',
  padding: '3rem',
  boxSizing: 'border-box',
  minHeight: '50%',
  minWidth: '50%',
  maxHeight: '85%',
  maxWidth: '60%',
  width: '100%',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)',
  backgroundColor: '$white',
  borderRadius: 16,
  zIndex: 22,
  top: '50%',
  left: '50%',
  overflowY: 'scroll',
  overflowX: 'hidden',
});
