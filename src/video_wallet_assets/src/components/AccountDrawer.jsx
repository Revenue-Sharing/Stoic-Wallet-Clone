import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { getAuthenticatedIdentity } from "../services/auth_services";

import logo from "../../assets/logo.png";
import Blockie from './Blockie';

const drawerWidth = 300;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    zIndex: 1
  }
}));
    
export default function AccountDrawer(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const container = window !== undefined ? () => window().document.body : undefined;

  // Get authenticated principal
  const [identity, setIdentity] = useState(null);
  useEffect(async () => {
    setIdentity(await getAuthenticatedIdentity());
  }, []);

  const [principal, setPrincipal] = useState(null);
  useEffect(async () => {
    if(identity) {
      setPrincipal(identity.getPrincipal());
    }
  }, [identity]);
  
  const accountsList = (
    <div style={{marginTop:64, marginBottom: 100}}>
      <div style={{width:drawerWidth-1, zIndex: 10, backgroundColor:'white', position:"fixed", top:0, textAlign:"center"}} className={classes.toolbar}>
        {/*<span style={{display:'block', fontSize:'x-large',padding:'15px 0', textAlign:'center',fontWeight:'bold'}}>Stoic Wallet <span style={{fontSize:'small',fontWeight:'normal'}}>By Toniq Labs</span></span>*/}
        <img style={{maxHeight:'50px',marginTop:'5px'}} alt="Stoic Wallet by Toniq Labs" src="logo.png" />
      </div>
      <Divider />
      <List>
      {(principal)? 
      (
        <ListItem button onClick={() => {}}>
          <ListItemAvatar>
            <Avatar>
              <Blockie address={principal?.toString()} />
            </Avatar>
          </ListItemAvatar>
          <ListItemText 
            primaryTypographyProps={{noWrap:true}} 
            secondaryTypographyProps={{noWrap:true}} 
            primary={"Main"}
            secondary={principal.toString()} />
          </ListItem>
      ) : (<></>)
      }  
      </List>
      <Divider />
      <div style={{width: drawerWidth-1, zIndex: 10, backgroundColor:'white', position:"fixed", bottom:0, textAlign:'center'}} className={classes.toolbar}>
        <span style={{position:'absolute', bottom:'10px', left:'0', right:'0'}}>
          {(process.env.REACT_APP_DFININITY_NETWORK === "online")? "Connected to Mainnet - v2.0.0": "Connected to local testnet"}
          </span>
      </div>
    </div>
  );
  
  return (
    <nav className={classes.drawer} aria-label="mailbox folders">
      <Hidden smUp implementation="css">
        <Drawer
          container={container}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={props.open}
          onClose={props.onClose}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
        >
          {accountsList}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {accountsList}
        </Drawer>
      </Hidden>
    </nav>
  );
}