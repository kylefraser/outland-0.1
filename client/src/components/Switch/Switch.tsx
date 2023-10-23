import { styled } from '../../../stitches.config';

interface SwitchProps {
  id: string;
  checked: boolean;
  onChange: Function;
  name?: string;
  optionLabels?: any;
  small?: boolean;
  disabled?: boolean;
  style?: React.CSSProperties;
}

const Switch = ({
  id,
  name,
  checked,
  onChange,
  optionLabels = ['Yes', 'No'],
  small,
  disabled,
  ...props
}: SwitchProps) => {
  return (
    <div {...props}>
      <input
        type="checkbox"
        name={name}
        id={id}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        style={{ display: 'none' }}
      />
      <Label htmlFor={id} small={small}>
        <Toggler small={small} checked={checked} />
      </Label>
    </div>
  );
};

export default Switch;

const Label = styled('label', {
  variants: {
    small: {
      true: {
        padding: '.925rem 1.625rem',
      },
    },
  },
  border: '1px solid $gray5',
  display: 'inline-block',
  borderRadius: 9999,
  padding: '1.25rem 2.5rem',
  position: 'relative',
});

const Toggler = styled('span', {
  variants: {
    small: {
      true: {
        width: '1.375rem',
        height: '1.375rem',
        top: '.25rem',
        right: 'calc(100% - 1.75rem)',
      },
    },
    checked: {
      true: {
        right: '0.375rem !important',
        backgroundColor: '$olive4',
      },
    },
  },
  borderRadius: 9999,
  width: '2rem',
  height: '2rem',
  backgroundColor: '$gray4',
  position: 'absolute',
  right: 'calc(100% - 2.5rem)',
  top: '0.25rem',
  transition: 'right 150ms ease-in-out',
  cursor: 'pointer',
});

// const Switch = () => {
//   return (
//     <div
//       style={{
//         padding: '1rem 0',
//         width: '100%',
//       }}
//     >
//       <div
// style={{
//   border: '1px solid #c5cbba',
//   display: 'inline-block',
//   borderRadius: '50px',
//   padding: '1.5rem 3rem',
//   backgroundColor: '#fafafa',
//   position: 'relative',
// }}
//       >
// <div
// style={{
//   borderRadius: '50%',
//   width: '2.5rem',
//   height: '2.5rem',
//   backgroundColor: '#9bb579',
//   position: 'absolute',
//   right: '0.25rem',
//   top: '0.25rem',
// }}
// ></div>
//       </div>
//     </div>
//   );
// };

// export default Switch;
