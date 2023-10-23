import { InputHTMLAttributes } from 'react';
import { styled } from '../../../stitches.config';
import { Text } from '../Text';

interface InputProps extends InputHTMLAttributes<HTMLDivElement> {
  hint?: string;
  inputProps?: any;
  inputStyle?: any;
  placeholder?: string;
  label?: string;
  name?: string;
  register?: any;
  required?: any;
}

const Input = ({
  label,
  value,
  placeholder,
  hint,
  onChange,
  type,
  name,
  inputProps,
  inputStyle,
  register,
  required,
  ...props
}: InputProps) => {
  let registered = register && { ...register(name, { required }) };
  return (
    <div {...props}>
      {label && (
        <Label as="h5" size={'5'}>
          {label}
        </Label>
      )}
      <InputContainer
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        onFocus={(e) => e.target.placeholder == ''}
        onBlur={(e) => e.target.placeholder == placeholder}
        type={type}
        style={inputStyle}
        {...registered}
        {...inputProps}
      ></InputContainer>
      {hint && <Hint as="h6">{hint}</Hint>}
    </div>
  );
};

const Label = styled(Text, {
  color: '$olive7',
  fontWeight: 500,
  marginBottom: '0.25rem',
});

const InputContainer = styled('input', {
  border: '1px solid $gray7',
  borderRadius: 4,
  boxSizing: 'border-box',
  color: '$olive4',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.25rem',
  fontWeight: 500,
  padding: '0.5rem',
  width: '100%',
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)',
  '&::placeholder': {
    color: '$gray4',
  },
  '&:focus': {
    outlineColor: '$olive4',
  },
});

const Hint = styled(Text, {
  color: '$gray8',
  fontWeight: 400,
  marginTop: '0.25rem',
});

export default Input;
