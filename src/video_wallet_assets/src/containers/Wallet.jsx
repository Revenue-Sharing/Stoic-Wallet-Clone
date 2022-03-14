import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import AccountDrawer from '../components/AccountDrawer';

import WalletDetail from '../views/WalletDetail';

import { makeStyles } from '@material-ui/core/styles';

const drawerWidth = 300;
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: theme.mixins.toolbar,
  toolbarButtons: {
    marginLeft: 'auto',
  },
  content: {
    flexGrow: 1,
  },

}));

function Wallet(props) {
  const classes = useStyles();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  
  const lockWallet = () => {
    props.logout();
  };
  const clearWallet = () => {
    props.remove();
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={() => {}}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          
          <Typography variant="h6" noWrap>
            WalletDetail
          </Typography>
          <div className={classes.toolbarButtons}>
            <IconButton
              color="inherit"
              aria-label="settings"   
              edge="end"
              onClick={() => {}}
            >
              <AccountCircleIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <AccountDrawer lockWallet={() => {}} changeRoute={() => {}} onClose={() => {}} open={mobileOpen} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
          <WalletDetail />
      </main>
    </div>
  );
}

export default Wallet;
