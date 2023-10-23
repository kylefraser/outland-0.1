import { SelectHTMLAttributes } from 'react';
import { styled } from '../../../stitches.config';
import { Text } from '../Text';

interface SelectProps extends SelectHTMLAttributes<HTMLDivElement> {
  hint?: string;
  selectProps?: any;
  label?: string;
  small?: boolean;
}

const Select = ({
  label,
  value,
  children,
  placeholder,
  hint,
  onChange,
  selectProps,
  small = false,
  ...props
}: SelectProps) => {
  return (
    <div {...props}>
      {label && (
        <Label as={'h5'} size={'5'}>
          {label}
        </Label>
      )}
      <SelectContainer
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        small={small}
        // onFocus={(e) => e.target.placeholder == ''}
        // onBlur={(e) => e.target.placeholder == placeholder}
        {...selectProps}
      >
        {children}
      </SelectContainer>
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
};

const Label = styled(Text, {
  fontWeight: 600,
  marginBottom: '0.25rem',
});

const SelectContainer = styled('select', {
  border: '1px solid $gray2',
  borderRadius: 4,
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)',
  boxSizing: 'border-box',
  color: '$olive4',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.25rem',
  fontWeight: 600,
  padding: '0.5rem',
  width: '100%',
  '&::placeholder': {
    color: '$gray4',
  },
  '&:focus': {
    outlineColor: '$olive5',
  },
  variants: {
    small: {
      true: { padding: '0.25rem' },
    },
  },
});

const Hint = styled('h6', {
  color: '$gray1',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.05rem',
  fontWeight: 600,
  marginTop: '0.25rem',
});

export default Select;
