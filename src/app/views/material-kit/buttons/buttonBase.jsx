import { Box, Button, Fab, Icon, IconButton, styled } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';

const AppButtonRoot = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' },
  },
  '& .button': { margin: theme.spacing(1) },
  '& .input': { display: 'none' },
}));

export const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

