import { useState, useEffect, React } from "react";
import { IdntEncService } from "../../../Service/IdentifiedEncounterService";
import GradientCircularProgress from "../components/CircularProgress";
import IdntEncounterCard from "../components/IdntEncounterCard";
import csvDownload from "json-to-csv-export";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Grid, IconButton, makeStyles, Button } from "@material-ui/core";

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
        {/* <Button
        variant="contained"
        className={classes.button}
        startIcon={<GetAppIcon />}
      >
        Export
      </Button> */}
        <IconButton
          className={classes.csvbtn}
          onClick={() => csvDownload(encounters, "individualsData.csv")}
          color="secondary"
        >
          <GetAppIcon />
        </IconButton>
        <Grid container className="Encounters">
          {encounters.map(renderEachEncounter).reverse().slice(0, limit)}
        </Grid>
      </div>
    );
  }
}
