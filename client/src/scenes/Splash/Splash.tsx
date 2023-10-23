import { Logo, ThemeToggle } from '../../components';
import Flag from '../../assets/images/us-flag-white.webp';

const Splash = () => {
  return (
    <div
      style={{
        height: '100vh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        background: 'linear-gradient(0, #182008, #596248)',
        color: '#ffffff',
      }}
    >
      <ThemeToggle />
      <Logo dotSize="2rem" fontSize="4rem">
        Outland
      </Logo>
      <h2
        style={{
          fontSize: '1.25rem',
          fontWeight: 700,
          fontFamily: "'Outfit', sans-serif",
        }}
      >
        COMING SOON
      </h2>
      <img
        src={Flag}
        style={{
          width: '3rem',
          mixBlendMode: 'overlay',
          marginTop: '2rem',
        }}
      />
    </div>
  );
};

export default Splash;
