import React, { useState, useEffect, useContext } from "react";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import {
  Avatar,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemSecondaryAction,
  ListItemText,
  IconButton,
  Tooltip,
  Fab,
} from "@material-ui/core";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import RefreshIcon from "@material-ui/icons/Refresh";
import TokenCard from "../components/TokenCard";
import NFTCard from "../components/NFTCard";
import NFTList from "../components/NFTList";
import Transactions from "../components/Transactions";
import SnackbarButton from "../components/SnackbarButton";
import {
  getBalanceForIdentity,
  getNFTs,
  getTokenTransactions,
} from "../services/token_services";
import { TokenContext } from "../contexts/TokenContext";
import { getAuthenticatedIdentity } from "../services/auth_services";
import { getTokensForCreator } from "../services/token_services";
import Blockie from "../components/Blockie";

const useStyles = makeStyles((theme) => ({
  accountAvatar: {
    width: 110,
    height: 110,
    [theme.breakpoints.down("sm")]: {
      width: 80,
      height: 80,
    },
  },
}));

export default function WalletDetail(props) {
  const classes = useStyles();
  const theme = useTheme();

  const styles = {
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    grid: {
      flexGrow: 1,
      padding: theme.spacing(2),
    },
  };

  let account = {
    address: "",
    name: "Main",
    tokens: [1],
  };

  // Handle changing tokens
  const [currentToken, setCurrentToken] = useState("kryptonic");

  const { setBalanceTrigger, setTokenTrigger } = useContext(TokenContext);

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


  const [balance, setBalance] = useState(0);
  const [NFTs, setNFTs] = useState([]);
  const [tokens, setTokens] = useState([]);
  useEffect(async () => {
    if (identity) {
      setBalance(await getBalanceForIdentity(identity));
      let nfts = await getTokensForCreator(identity);
      console.log(nfts);
      setNFTs(nfts);
      setTokens(getTokenTransactions());
    }
  }, [identity]);

  // Utility functions
  const changeToken = (token) => {
    setCurrentToken(token);
  };

  const refreshTokens = () => {
    setBalanceTrigger(true);
    setTokenTrigger(true);
  };

  return (
    <div style={styles.root}>
      <List>
        <ListItem>
          <ListItemAvatar>
            <Avatar style={{height: 110, width: 110}}>
              {principal && (
                <Blockie address={principal?.toString()} />
              )}
            </Avatar>
          </ListItemAvatar>
          <ListItemText
            style={{ paddingLeft: 20 }}
            primaryTypographyProps={{ noWrap: true, variant: "h4" }}
            secondaryTypographyProps={{ noWrap: true, variant: "subtitle1" }}
            primary={<>{account.name}</>}
            secondary={
              <>
                <div style={{ fontSize: "0.9em" }}>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "inline-block",
                      maxWidth: "85%",
                    }}
                  >
                    <Chip
                      color={"primary"}
                      style={{ fontSize: "0.9em" }}
                      size="small"
                      label="Principal ID"
                    />{" "}
                    {principal
                      ? principal.toString().substr(0, 32) + "..."
                      : "..."}
                  </span>
                  <SnackbarButton
                    message="Principal ID Copied"
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "left",
                    }}
                    onClick={() => clipboardCopy(principal)}
                  >
                    <IconButton
                      style={{ top: "-10px" }}
                      size="small"
                      edge="end"
                      aria-label="copy"
                    >
                      <FileCopyIcon style={{ fontSize: 18 }} />
                    </IconButton>
                  </SnackbarButton>
                </div>
              </>
            }
          />
          <ListItemSecondaryAction></ListItemSecondaryAction>
        </ListItem>
      </List>
      <div style={styles.grid}>
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <TokenCard
            balance={balance}
            data={tokens}
            onClick={() => changeToken("kryptonic")}
            selected={currentToken === "kryptonic"}
          />
          <NFTCard
            count={NFTs.length}
            onClick={() => changeToken("nft")}
            selected={currentToken === "nft"}
          />
          <Grid style={styles.root} item xl={2} lg={3} md={4}>
            <Tooltip title="Reload">
              <Fab
                onClick={refreshTokens}
                style={{ marginLeft: 10 }}
                color="primary"
                aria-label="add"
              >
                <RefreshIcon />
              </Fab>
            </Tooltip>
          </Grid>
        </Grid>
      </div>
      {currentToken === "nft" ? <NFTList data={NFTs} /> : ""}
      {currentToken !== "nft" ? <Transactions data={tokens} /> : ""}
      {/* {currentToken !== 'nft' ?
        <SendForm alert={alert} loader={{}} error={{}} address={account.address} data={account.tokens[currentToken]}>
          <MainFab color="primary" aria-label="send"><SendIcon /></MainFab>
        </SendForm> : ""} */}
    </div>
  );
}
