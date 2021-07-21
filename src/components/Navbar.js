import { AppBar, makeStyles, Toolbar, Typography } from "@material-ui/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    margin: 0,
  },
  link: {
    textDecoration: "none",
  },
});

const Navbar = () => {
  const classes = useStyles();
  return (
    <AppBar className={classes.root} position="sticky">
      <Toolbar>
        <Link to="/" className={classes.link}>
          <Typography color="textPrimary" variant="h4">
            Test For Akima
          </Typography>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
