import { CircularProgress, Container, FormControl, Grid, Input, InputLabel, Typography } from "@material-ui/core";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsersBegin, getAllUsersFailure, getAllUsersSuccess } from "../redux/actions/usersActions";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  image: {
    width: "100%",
    height: "auto",
    borderRadius: "50%",
  },
  name: {
    textTransform: "capitalize",
    textAlign: "center",
  },
  item: {
    padding: 20,
    "&:hover": {
      background: "#efefef",
    },
  },
  link: {
    color: "#333",
  },
  input: {
    marginBottom: 10,
  },
  loading: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const UsersList = () => {
  const [inputValue, setInputValue] = useState("");
  const [usersToDisplay, setUsersToDisplay] = useState([]);

  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const classes = useStyles();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        dispatch(getAllUsersBegin());
        const res = await fetch("https://api.github.com/users");
        const data = await res.json();
        setUsersToDisplay(data);
        dispatch(getAllUsersSuccess(data));
      } catch (err) {
        dispatch(getAllUsersFailure(err));
      }
    };
    fetchUsers();
  }, [dispatch]);

  const handleOnChange = (e) => {
    const keyword = e.target.value;

    const res = state.users.users.filter((u) => u.login.includes(keyword));

    setUsersToDisplay(res);
    setInputValue(keyword);
  };

  if (state.users.isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <Container>
      <FormControl className={classes.input}>
        <InputLabel htmlFor="search">Search:</InputLabel>
        <Input id="search" value={inputValue} onChange={handleOnChange} />
      </FormControl>

      <Grid container className={classes.root}>
        {usersToDisplay.map((user) => {
          const { id, login, avatar_url } = user;
          return (
            <Grid item key={id} xs={12} sm={6} md={3} lg={2} className={classes.item}>
              <img src={avatar_url} alt={login} className={classes.image} />
              <Typography variant="h6" className={classes.name}>
                {login}
              </Typography>
              <Link to={`users/${user.login}`} className={classes.link}>
                <Typography variant="body1">More info</Typography>
              </Link>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};

export default UsersList;
