import { useState, useEffect, React } from "react";
import { IdntEncService } from "../../../Service/IdentifiedEncounterService";
import GradientCircularProgress from "../components/CircularProgress";
import IdntEncounterCard from "../components/IdntEncounterCard";
import csvDownload from "json-to-csv-export";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";

import { Grid, IconButton, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  csvbtn: {
    float: "right",
    right: "3%",
    top: 5,
  },
}));

export default function IdentifiedBoard() {
  const classes = useStyles();
  const [encounters, setEncounters] = useState(null);
  const [edit, setEdit] = useState(null);
  const [limit, setLimit] = useState(8);

  // const [encounterAdd, setencounterAdd] = useState(false)
  const [flag] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await IdntEncService.getIdentifiedEncounters().then((encounters) =>
          setEncounters(encounters)
        );
      } catch (err) {
        console.log("error fetching...:", err);
      }
      setEdit(false);
    }
    fetchData();
    window.addEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [edit]);

  const showMore = () => {
    setLimit((prevState) => prevState + 8);
    setEdit(true);
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      showMore();
  }
  // useEffect(() => {
  //   getEncounters();
  // }, [flag])

  // const getEncounters = async () => {
  //   const data = await EncounterService.getEncounters()
  //   console.log(data)
  //   setEncounters(data)
  // }

  const renderEachEncounter = (item, i) => {
    return (
      <IdntEncounterCard
        index={item.IdentifiedEncounterID}
        encounter={item}
        key={item.IdentifiedEncounterID}
        identFlag={true}
      ></IdntEncounterCard>
    );
  };

  if (!encounters) return <GradientCircularProgress />;
  else {
    return (
      <div>
        <IconButton
          className={classes.csvbtn}
          onClick={() => csvDownload(encounters, "individualsData.csv")}
          color="secondary"
        >
          <CloudDownloadIcon fontSize="large" />
        </IconButton>
        <Grid container className="Encounters">
          {encounters.map(renderEachEncounter).reverse().slice(0, limit)}
        </Grid>
      </div>
    );
  }
}
