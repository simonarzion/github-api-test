import React, { useEffect } from "react";
import { CircularProgress, Container, Divider, Grid, makeStyles, Typography } from "@material-ui/core";
import { useState } from "react";
import { useParams } from "react-router-dom";

const useStyles = makeStyles({
  image: {
    width: "100%",
    height: "auto",
  },
  gridItem: {
    padding: 10,
  },
  repoImage: {
    width: 44,
    height: 44,
  },
  follows: {
    padding: "10px 0",
  },
  orgs: {
    display: "flex",
    flexWrap: "wrap",
    gap: 5,
    padding: "10px 0",
  },
  title: {
    padding: "10px 0",
  },
  repo: {
    padding: "10px 0",
  },
  loading: {
    height: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

const UserPage = () => {
  const classes = useStyles();
  const { login } = useParams();
  const [user, setUser] = useState({
    userData: [],
    userRepos: [],
    userOrgs: [],
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSelectedUser = async () => {
      const userRes = await fetch(`https://api.github.com/users/${login}`);
      const userData = await userRes.json();

      const userOrgsRes = await fetch(`${userData.organizations_url}`);
      const userOrgs = await userOrgsRes.json();

      const userReposRes = await fetch(userData.repos_url);
      const userRepos = await userReposRes.json();

      setUser({
        userData: userData,
        userOrgs: userOrgs,
        userRepos: userRepos,
      });
      setIsLoading(false);
    };

    fetchSelectedUser();
  }, [login]);

  let { avatar_url, followers, following, name } = user.userData;

  if (isLoading) {
    return (
      <div className={classes.loading}>
        <CircularProgress />
      </div>
    );
  }
  return (
    <Container>
      <Grid container>
        <Grid className={classes.gridItem} item xs={12} sm={4}>
          <img className={classes.image} src={avatar_url} alt={name} />
          <Typography variant="h4" color="textPrimary">
            {name}
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="body2" className={classes.follows}>
                {following} following
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography color="textPrimary" variant="body2" className={classes.follows}>
                {followers} followers
              </Typography>
            </Grid>
          </Grid>

          <div>
            <Divider />

            <Typography variant="h5" color="primary" className={classes.title}>
              Organizations
            </Typography>

            <div className={classes.orgs}>
              {user.userOrgs.length > 0 ? (
                user.userOrgs.map((org) => {
                  const { avatar_url } = org;
                  return <img key={avatar_url} className={classes.repoImage} src={avatar_url} alt="dawd" />;
                })
              ) : (
                <Typography variant="body2" color="textPrimary">
                  No organizations to show.
                </Typography>
              )}
            </div>
          </div>
        </Grid>

        <Grid className={classes.gridItem} item xs={12} sm={8}>
          <Typography variant="h5" color="primary" className={classes.title}>
            Repositories
          </Typography>

          <Divider />

          {user.userRepos.map((repo) => {
            const { description, language, name } = repo;
            return (
              <div key={name}>
                <div className={classes.repo}>
                  <Grid container>
                    <Grid item xs={12} sm={10}>
                      <Typography color="textPrimary" variant="h6">
                        {name}
                      </Typography>

                      <Typography color="textPrimary" variant="body1">
                        {description}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} sm={2}>
                      <Typography color="textPrimary" variant="body2">
                        {language}
                      </Typography>
                    </Grid>
                  </Grid>
                </div>

                <Divider />
              </div>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};

export default UserPage;
