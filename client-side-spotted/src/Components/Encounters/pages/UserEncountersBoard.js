import { useState, useEffect, React } from "react";
import { EncounterService } from "../../../Service/EncounterService";
import EncounterCard from "../components/EncounterCard";
import GradientCircularProgress from "../components/CircularProgress";
import { Grid } from "@material-ui/core";
import StatusDialog from "../components/StatusDialog";

export default function EncountersBoard() {
  const [encounters, setEncounters] = useState(null);
  const [edit, setEdit] = useState(null);
  const [limit, setLimit] = useState(13);
  const [status, setStatus] = useState("");
  const [openRespons, setOpenRespons] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        await EncounterService.getUserEncounters().then((encounters) =>
          setEncounters(encounters)
        );
      } catch (err) {
        setStatus("Faild loading data...please try again");
        setOpenRespons(true);
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

  const handleCloseRespons = () => {
    setOpenRespons(false);
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      showMore();
  }

  const renderEachEncounter = (item, i) => {
    if (item.IdentifiedEncounterID) {
      return (
        <EncounterCard
          index={item.IdentifiedEncounterID}
          encounter={item}
          key={item.EncounterID}
        ></EncounterCard>
      );
    } else {
      return (
        <EncounterCard
          index={item.EncounterID}
          encounter={item}
          key={item.EncounterID}
        ></EncounterCard>
      );
    }
  };

  if (!encounters) return <GradientCircularProgress />;
  else {
    return (
      <div>
        <StatusDialog
          open={openRespons}
          status={status}
          onClose={handleCloseRespons}
        />
        <Grid container className="Encounters">
          {encounters.map(renderEachEncounter).reverse().slice(0, limit)}
        </Grid>
      </div>
    );
  }
}
