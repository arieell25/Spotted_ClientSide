/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
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
  checked: {
    marginLeft: 8,
    paddingRight: "4px",
  },
  cardContainer: {
    float: "left",
  },
  verified: {
    display: "inline-flex",
  },
}));

export default function EncounterCard(props) {
  const classes = useStyles();
  const { index, encounter, identFlag } = props;
  const [date, setDate] = useState();
  useEffect(() => {
    let date = new Date(encounter.EncounterDate);
    setDate(date.toLocaleDateString("he-IL"));
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
              <div className={classes.cardContainer}>
                <Typography variant="body2" color="secondary" component="h5">
                  Encounter no.: {encounter.EncounterID}
                </Typography>
                {encounter.OriginalID ? (
                  <Typography variant="body2" color="secondary" component="h5">
                    SII ID: {encounter.OriginalID}
                  </Typography>
                ) : null}
                <Typography variant="body2" color="secondary" component="p">
                  Encounter date: {date}
                </Typography>
                <Typography variant="body2" color="secondary" component="p">
                  {encounter.Site ? `Site: ${encounter.Site.SiteName}` : null}
                </Typography>
                <Typography variant="body2" color="secondary" component="p">
                  {encounter.Photographer ? `Site: ${encounter.SiteID}` : null}
                </Typography>
              </div>
              {encounter.Verified && (
                <div className={classes.verified}>
                  <Typography variant="body2" color="secondary" component="p">
                    Verified
                  </Typography>
                  <CheckCircleOutlineIcon
                    className={classes.checked}
                    color="secondary"
                  />
                </div>
              )}
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
