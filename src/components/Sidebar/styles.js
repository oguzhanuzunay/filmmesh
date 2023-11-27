import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
    textDecoration: 'none',
    color: 'inherit',
  },
  image: {
    width: '70%',
  },
  link: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreImages: {
    filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'invert(0)',
  },
}));
