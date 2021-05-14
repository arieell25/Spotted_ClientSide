import { useState, useEffect, React } from 'react'
import { EncounterService } from '../../../Service/EncounterService'
import EncounterCard from '../components/EncounterCard'
import GradientCircularProgress from '../components/CircularProgress'
import StatusDialog from '../components/StatusDialog';
import EncountersTable from '../components/EncountersTable';
import {
  Grid,
  makeStyles
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({

}));
export default function UserEncountersBoard() {
  const classes = useStyles();
  const [gridView, setGridView] = useState(true);
  const [status, setStatus] = useState([]);
  const [open, setOpen] = useState(false);
  const [encounters, setEncounters] = useState(null);
  const [edit, setEdit] = useState(null);
  const [limit, setLimit] = useState(13);

  useEffect(() => {
    async function fetchData() {
      try {
        await EncounterService.getEncounters()
        .then(encounters => setEncounters(encounters))
        // .catch(res => console.log(res));
      } catch (err) {
        console.log('error fetching...:', err);
        setStatus('Somthing went wrong, please login again...');
        setOpen(true);
      }
      setEdit(false);
    }
    fetchData();
    window.addEventListener('scroll', handleScroll);
    // eslint-disable-next-line
  }, [edit]);

  const showMore = () => {
    setLimit(prevState => prevState + 8);
    setEdit(true);
  };

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      showMore();
  }
  const handleClose = () => {
    setOpen(false);
  };

  const renderEachEncounter = (item, i) => {
    if(item.IdentifiedEncounterID){
      return (
        <EncounterCard index={item.IdentifiedEncounterID} encounter={item} key={item.EncounterID}></EncounterCard>
      );
    }
    else{
    return (
      <EncounterCard index={item.EncounterID} encounter={item} key={item.EncounterID}></EncounterCard>
    );
  }
  };

  if (!encounters) return (
    <div>

    <StatusDialog
      open={open}
      status={status}
      onClose={handleClose}/>
      <GradientCircularProgress />
      </div>

    )
  else {
    return(
      <div>
        
        {/* {gridView && <div><EncountersTable rows={encounters}/></div>} */}
        {gridView &&
        <Grid container className="Encounters">

          {encounters
            .map(renderEachEncounter)
            .reverse()
            .slice(0, limit)
          }
        </Grid>
  }
        </div>
      
    )
        }
      }
