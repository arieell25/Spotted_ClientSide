import React from 'react';
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  circle: {
    stroke: "url(#linearColors)",
  },
}));

export default function GradientCircularProgress() {
  const classes = useStyles({});

  return (
    <>
      <svg width="50%" height="50%">
        <linearGradient id="linearColors" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor="#C5F836" />
          <stop offset="90%" stopColor="#3AA4D1" />
        </linearGradient>
      </svg>
      <CircularProgress
        thickness={4}
        classes={{ circle: classes.circle }}
      />
    </>
  );
}