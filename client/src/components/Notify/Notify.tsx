interface NotifyProps {
  errorMessage: string | null;
}

const Notify = ({ errorMessage }: NotifyProps) => {
  if (!errorMessage) {
    return null;
  }
  return <div style={{ color: 'red' }}>{errorMessage}</div>;
};

export default Notify;
