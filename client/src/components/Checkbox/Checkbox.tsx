import { useState } from 'react';
import { styled } from '../../../stitches.config';

interface CheckboxProps {
  children?: any;
  label?: string;
  name?: string;
  style?: object;
  large?: boolean;
}

const Checkbox = ({
  children,
  label,
  name,
  large,
  style,
  ...props
}: CheckboxProps) => {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <div style={{ ...style }} {...props}>
      {label && <Label>{label}</Label>}
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <input
          name={name}
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          style={{
            width: !large ? '1.25rem' : '2.5rem',
            height: !large ? '1.25rem' : '2.5rem',
            marginRight: !large ? '0.5rem' : '1rem',
            flexShrink: 0,
          }}
        />
        {children}
      </label>
    </div>
  );
};

const Label = styled('h5', {
  color: '#2B331B',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.5rem',
  fontWeight: 600,
  marginBottom: '0.75rem',
});

export default Checkbox;
