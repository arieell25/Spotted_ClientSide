import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";

import {
  Card,
  CardActionArea,
  CardActions,
  Typography,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: "5% 8%",
    margin: "10px",
  },
  linkText: {
    textDecoration: "none",
  },
  img: {
    width: "100%",
    paddingTop: 4,
    borderRadius: 10,
  },
  lable: {
    color: "#e0e0e7",
  },
}));

export default function IdntEncounterCard(props) {
  const classes = useStyles();
  const { index, encounter, identFlag } = props;
  const [date, setDate] = useState();
  useEffect(() => {
    let date = new Date(encounter.CreatedAt);
    setDate(date.toLocaleDateString("he-IL"));

    // eslint-disable-next-line
  }, []);

  return (
    <Grid item xs={12} md={3} sm={6} xl={2}>
      <Card className={classes.root}>
        <NavLink
          className={classes.linkText}
          to={
            identFlag
              ? {
                  pathname: "/IdentifiedProfile",
                  search: "?id=" + index,
                }
              : {
                  pathname: "/EncounterProfile",
                  search: "?id=" + index,
                }
          }
        >
          <CardActionArea>
            <CardMedia
              className={classes.img}
              component="img"
              alt="Encounter"
              height="140"
              image={
                encounter.ProfilePicture
                  ? encounter.ProfilePicture
                  : "https://t4.ftcdn.net/jpg/02/07/87/79/360_F_207877921_BtG6ZKAVvtLyc5GWpBNEIlIxsffTtWkv.jpg"
              }
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography variant="body2" color="secondary" component="h5">
                ID no. {encounter.IdentifiedEncounterID}
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                Identity created at {date}
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                {encounter.IsAlive === null || true
                  ? "Considerd as Alive"
                  : null}
              </Typography>
              <Typography variant="body2" color="secondary" component="p">
                {encounter.Gender
                  ? `Gender: ${encounter.Gender}`
                  : "Gender: unknown"}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <button className="btn">PROFILE</button>
          </CardActions>
        </NavLink>
      </Card>
    </Grid>
  );
}
