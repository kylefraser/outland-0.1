import { TextareaHTMLAttributes } from 'react';
import { styled } from '../../../stitches.config';
import { Text } from '../Text';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLDivElement> {
  hint?: string;
  textAreaProps?: any;
  textAreaStyles?: any;
  label?: string;
  register?: any;
  name?: any;
  required?: any;
  onChange?: any;
}

const TextArea = ({
  label,
  name,
  value,
  placeholder,
  hint,
  onChange,
  textAreaProps,
  textAreaStyles,
  register,
  required,
  ...props
}: TextAreaProps) => {
  let registered = register && { ...register(name, { required }) };
  return (
    <div {...props}>
      {label && (
        <Label as={'h5'} size={'5'}>
          {label}
        </Label>
      )}
      <InputContainer
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        style={{ ...textAreaStyles }}
        name={name}
        {...registered}
        {...textAreaProps}
      ></InputContainer>
      {hint && <Hint>{hint}</Hint>}
    </div>
  );
};

const Label = styled(Text, {
  fontWeight: 500,
  marginBottom: '0.25rem',
});

const InputContainer = styled('textarea', {
  border: '1px solid #C5CBBA',
  borderRadius: 4,
  boxSizing: 'border-box',
  color: '#596248',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.25rem',
  fontWeight: 500,
  height: '18.75rem',
  padding: '0.5rem',
  width: '100%',
  boxShadow: '0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)',
  '&::placeholder': {
    color: '#eaeaea',
  },
  '&:focus': {
    outlineColor: '#A6CF70',
  },
});

const Hint = styled('h6', {
  color: '#959A8A',
  fontFamily: "'Outfit', sans-serif",
  fontSize: '1.05rem',
  fontWeight: 500,
  marginTop: '0.25rem',
});

export default TextArea;
