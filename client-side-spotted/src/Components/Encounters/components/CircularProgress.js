import React from 'react';
import { CircularProgress, makeStyles } from "@material-ui/core";
//test
const useStyles = makeStyles(() => ({
  circle: {
    stroke: "url(#linearColors)",
  },
  progress:{
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '10%'
  }
}));

export default function GradientCircularProgress() {
  const classes = useStyles({});

  return (
    <div className={classes.progress}>
      <svg width="1%" height="1%">
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor="#C5F836" />
          <stop offset="90%" stopColor="#3AA4D1" />
        </linearGradient>
      </svg>
      <CircularProgress
        thickness={4}
        classes={{ circle: classes.circle }}
      />
    </div>
  );
}