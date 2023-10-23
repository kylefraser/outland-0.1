import { Icon } from '../';
import { ColourModeContext } from '../ThemeProvider';
import { faSunBright, faMoon } from '@fortawesome/pro-regular-svg-icons';

export function ThemeToggle() {
  return (
    <ColourModeContext.Consumer>
      {(context: any) => (
        <Icon
          size={2}
          color={'hiContrast'}
          icon={context.colorMode == 'dark' ? faSunBright : faMoon}
          style={{ fontSize: '1.5rem', cursor: 'pointer', marginRight: '2rem' }}
          onClick={context.cycleToggleMode}
        />
      )}
    </ColourModeContext.Consumer>
  );
}
