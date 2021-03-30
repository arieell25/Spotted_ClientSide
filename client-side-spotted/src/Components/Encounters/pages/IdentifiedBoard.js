import { useState, useEffect, React } from 'react'
import { IdntEncService } from '../../../Service/IdentifiedEncounterService'
// import Encounter from './Encounter'
import EncounterCard from '../components/EncounterCard'
import {
  Grid
} from '@material-ui/core';

export default function IdentifiedBoard() {
  const [encounters, setEncounters] = useState(null);
  const [edit, setEdit] = useState(null);
  const [limit, setLimit] = useState(8);


  // const [encounterAdd, setencounterAdd] = useState(false)
  const [flag] = useState(false) 

  useEffect(() => {
    async function fetchData() {
      try {
        await IdntEncService.getIdentifiedEncounters().then(encounters => setEncounters(encounters));
      } catch (err) {
        console.log('error fetching...:', err);
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
      <EncounterCard index={item.IdentifiedEncounterID} encounter={item} key={item.IdentifiedEncounterID} identFlag = {true}></EncounterCard>
    );
  };

  if (!encounters) return <div>Loading...</div>
  else {
    return(
      <Grid container className="Encounters">
        {encounters
          .map(renderEachEncounter)
          .reverse()
          .slice(0, limit)
        }
      </Grid>
    )
  }
      }
   
