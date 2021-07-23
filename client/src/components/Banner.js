import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  root: {
    width: "100%",
    color: "darkgreen",
    paddingTop: "40px",
  },
});

export default function Banner() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Typography variant='h2'>CENNIK HURT</Typography>
    </div>
  );
}
