import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function SearchResults() {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const { searchResult } = useSelector(
    (state) => state.mainReducer
  );
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography
          color="textSecondary"
          gutterBottom
          variant="h5" component="h2"
        >
                  Output
        </Typography>
              
 

        <div className="flex">
          <Typography variant="body2" component="p">
            Position:
          </Typography>
          <p className="ml-sm search-text">
            {searchResult.loading ? "Loading..." : searchResult.value}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
