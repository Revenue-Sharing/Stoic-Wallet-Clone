/* global BigInt */
import React, { useContext } from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Paper from "@material-ui/core/Paper";
import SendIcon from "@material-ui/icons/Send";
import Typography from "@material-ui/core/Typography";
import SnackbarButton from "./SnackbarButton";
import Pagination from "@material-ui/lab/Pagination";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import { compressAddress, clipboardCopy } from "../utils.js";
import { TokenContext } from "../contexts/TokenContext";

const perPage = 20;

export default function NFTList(props) {
  const { videoTokensForCreator } = useContext(TokenContext);
  const [page, setPage] = React.useState(1);
  const [anchorEl, setAnchorEl] = React.useState({});

  const handleClick = (id, target) => {
    setAnchorEl({ id: id, target: target });
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const styles = {
    empty: {
      maxWidth: 400,
      margin: "0 auto",
    },
    table: {
      minWidth: 650,
    },
  };

  const sendNft = (nft) => {
    setTokenNFT(nft);
    setOpenNFTForm(true);
  };
  const closeNFTForm = () => {
    setOpenNFTForm(false);
    setTokenNFT("");
  };

  const error = (e) => {
    props.loader(false);
    props.error(e);
  };

  return (
    <>
      {videoTokensForCreator.length === 0 ? (
        <div style={styles.empty}>
          <Typography
            paragraph
            style={{ paddingTop: 20, fontWeight: "bold" }}
            align="center"
          >
            You have no NFT's right now
          </Typography>
        </div>
      ) : (
        <>
          {videoTokensForCreator.length > perPage ? (
            <Pagination
              style={{
                float: "right",
                marginTop: "10px",
                marginBottom: "20px",
              }}
              size="small"
              count={Math.ceil(videoTokensForCreator.length / perPage)}
              page={page}
              onChange={(e, v) => setPage(v)}
            />
          ) : (
            ""
          )}

          <TableContainer component={Paper}>
            <Table style={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell width="70" style={{ fontWeight: "bold" }}>
                    #
                  </TableCell>
                  <TableCell width="150" style={{ fontWeight: "bold" }}>
                    Canister Id
                  </TableCell>
                  <TableCell width="70" style={{ fontWeight: "bold" }}>
                    Creator
                  </TableCell>
                  <TableCell width="120" style={{ fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell width="100" style={{ fontWeight: "bold" }}>
                    Description
                  </TableCell>
                  <TableCell width="70" style={{ fontWeight: "bold" }}>
                    Owned Amount
                  </TableCell>
                  <TableCell width="150" style={{ fontWeight: "bold" }}>
                    Canister ID
                  </TableCell>
                  <TableCell width="70" style={{ fontWeight: "bold" }}>
                    Supply
                  </TableCell>
                  {/* <TableCell width="220" style={{fontWeight:'bold'}}>Collection/Canister</TableCell> */}
                  {/* <TableCell style={{fontWeight:'bold'}}>Metadata</TableCell> */}
                  {/* <TableCell width="200" style={{fontWeight:'bold'}}>Marketplace</TableCell> */}
                  <TableCell
                    width="150"
                    align="right"
                    style={{ fontWeight: "bold" }}
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {videoTokensForCreator
                  .filter(
                    (nft, i) => i >= (page - 1) * perPage && i < page * perPage
                  )
                  .map((nft, i) => {
                    console.log(nft);
                    return (
                      <TableRow key={nft.canisterId}>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {i}
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {compressAddress(nft.canisterId)}
                          <SnackbarButton
                            message="NFT ID Copied"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            onClick={() => clipboardCopy(nft.canisterId)}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="copy"
                            >
                              <FileCopyIcon style={{ fontSize: 18 }} />
                            </IconButton>
                          </SnackbarButton>
                        </TableCell>
                        <TableCell style={{ fontWeight: "bold" }}>
                          {nft.creator.toString()}
                        </TableCell>
                        <TableCell>{nft.name}</TableCell>
                        <TableCell>{nft.description}</TableCell>
                        <TableCell>{Number(nft.ownedAmount)}</TableCell>
                        <TableCell>
                          {compressAddress(nft.storageCanisterId)}
                          <SnackbarButton
                            message="NFT ID Copied"
                            anchorOrigin={{
                              vertical: "bottom",
                              horizontal: "left",
                            }}
                            onClick={() => clipboardCopy(nft.storageCanisterId)}
                          >
                            <IconButton
                              size="small"
                              edge="end"
                              aria-label="copy"
                            >
                              <FileCopyIcon style={{ fontSize: 18 }} />
                            </IconButton>
                          </SnackbarButton>
                        </TableCell>
                        <TableCell>{Number(nft.supply)}</TableCell>
                        <TableCell align="right">
                          <>
                            <IconButton
                              id={"more-" + nft.canisterId}
                              size="small"
                              onClick={(event) =>
                                handleClick(nft.canisterId, event.currentTarget)
                              }
                              edge="end"
                            >
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              anchorEl={
                                anchorEl !== null &&
                                anchorEl.id === nft.canisterId
                                  ? anchorEl.target
                                  : null
                              }
                              keepMounted
                              open={
                                anchorEl !== null &&
                                anchorEl.id === nft.canisterId
                              }
                              onClose={handleClose}
                            >
                              <MenuItem
                                onClick={() => {
                                  handleClose();
                                  sendNft(nft);
                                }}
                              >
                                <ListItemIcon>
                                  <SendIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="inherit">
                                  Transfer
                                </Typography>
                              </MenuItem>
                            </Menu>
                          </>
                        </TableCell>
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {/* <SendNFTForm alert={props.alert} open={openNFTForm} close={closeNFTForm} loader={props.loader} error={error} nft={tokenNFT} /> */}
    </>
  );
}
