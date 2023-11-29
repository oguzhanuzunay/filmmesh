import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  image: {
    maxWidth: '90%',
    borderRadius: '20px',
    boxShadow: '0.5em 0.5em 1em rgba(64,64,70)',
    width: '80%',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
}));
