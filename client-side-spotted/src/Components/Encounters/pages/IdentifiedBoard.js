import { useState, useEffect, React } from "react";
import { IdntEncService } from "../../../Service/IdentifiedEncounterService";
import GradientCircularProgress from "../components/CircularProgress";
import IdntEncounterCard from "../components/IdntEncounterCard";
import csvDownload from "json-to-csv-export";
import GetAppIcon from "@material-ui/icons/GetApp";
import { Grid, IconButton, makeStyles } from "@material-ui/core";
import StatusDialog from "../components/StatusDialog";

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
  const [status, setStatus] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await IdntEncService.getIdentifiedEncounters().then((encounters) =>
          setEncounters(encounters)
        );
      } catch (err) {
        setStatus("Somthing went wrong, please login again...");
        setOpen(true);
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

  const handleClose = () => {
    setOpen(false);
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
        <StatusDialog open={open} status={status} onClose={handleClose} />
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
