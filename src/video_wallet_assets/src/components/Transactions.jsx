import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from '@material-ui/lab/Pagination';
import Typography from '@material-ui/core/Typography';
import Timestamp from 'react-timestamp';
const formatNumber = n => {
  return n.toFixed(8).replace(/0{1,6}$/, '');
};
var intervalId = 0;
const perPage = 10;
export default function Transactions(props) {
  const [transactions, setTransactions] = React.useState(props.data);
  const [page, setPage] = React.useState(1);
  const styles = {
    empty: {
      maxWidth: 400,
      margin: "0 auto",
    },
    table: {
      minWidth: 650,
    },
  };

  return (
    <>
      { (transactions.length === 0 ?
        <div style={styles.empty}>
          <Typography paragraph style={{ paddingTop: 20, fontWeight: "bold" }} align="center">
            No transactions available
          </Typography>
        </div> :
        <>
          {transactions.length > perPage ?
            <Pagination style={{ float: "right", marginTop: "10px", marginBottom: "20px" }} size="small" count={Math.ceil(transactions.length / perPage)} page={page} onChange={(e, v) => setPage(v)} />
            : ""}
          <TableContainer component={Paper}>
            <Table style={styles.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {transactions.filter((tx, i) => (i >= ((page - 1) * perPage) && i < ((page) * perPage))).map((tx, i) => (
                  <TableRow key={i}>
                    <TableCell component="th" scope="row">
                      <Timestamp relative autoUpdate date={tx.timestamp} />
                    </TableCell>
                    <TableCell>
                      {tx.out ?
                        <>Sent <strong>{tx.amount}</strong> to {tx.to} with a <strong>{tx.fee} </strong> Fee<br /></> :
                        <>Received <strong>{tx.amount}</strong> from {tx.from}<br /></>}
                    </TableCell>
                    <TableCell align="right">
                      {tx.out ?
                        <span style={{ color: 'red', fontWeight: 'bold' }}>-{formatNumber(tx.amount + tx.fee)}</span> :
                        <span style={{ color: '#00b894', fontWeight: 'bold' }}>+{formatNumber(tx.amount)}</span>
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>)}
    </>
  );
}
