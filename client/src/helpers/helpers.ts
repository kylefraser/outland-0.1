import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(initialIsVisible: any) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);

  const ref = useRef<any>(null);

  const handleClickOutside = (event: Event): void => {
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  });

  return { ref, isComponentVisible, setIsComponentVisible };
}

export function useOutsideClicker(
  ref: any,
  buttonRef: { current: { contains: (arg0: any) => any } },
  onOutsideClick: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      /* clicked on the element itself */
      if (ref.current && ref.current.contains(event.target)) {
        return;
      }

      /* clicked on the toggle button */
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }

      /* If it's something else, trigger onClose */
      onOutsideClick();
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref]);
}
