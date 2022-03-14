import React, { useContext } from "react";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { TokenContext } from "../contexts/TokenContext";

const styles = {
  root: {
    height: "100%",
  },
  selectedCard: {
    height: "100%",
    backgroundColor: "#003240",
    color: "white",
  },
  card: {
    height: "100%",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
};
var intervalId = 0;
export default function TokenCard(props) {
  const handleClick = () => {
    props.onClick();
  };

  const { nativeTokenBalance } = useContext(TokenContext);

  return (
    <Grid style={styles.root} item xl={2} lg={3} md={4}>
      <Card
        onClick={handleClick}
        style={props.selected ? styles.selectedCard : styles.card}
      >
        <CardActionArea>
          <CardContent>
            <Typography
              style={styles.title}
              color={props.selected ? "inherit" : "textSecondary"}
              gutterBottom
            >
              ICP
            </Typography>
            <Typography variant="h6">{nativeTokenBalance}</Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
