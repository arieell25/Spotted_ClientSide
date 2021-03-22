import { useState, useEffect, React } from 'react'
import { EncounterService } from '../../../Service/EncounterService'
// import Encounter from './Encounter'
import EncounterCard from './Encounter'
import {
  Grid
} from '@material-ui/core';

export default function EncountersBoard() {
  const [encounters, setEncounters] = useState(null);
  const [edit, setEdit] = useState(null);
  const [limit, setLimit] = useState(8);


  // const [encounterAdd, setencounterAdd] = useState(false)
  const [flag] = useState(false) 

  useEffect(() => {
    async function fetchData() {
      try {
        await EncounterService.getEncounters().then(encounters => setEncounters(encounters));
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
      <EncounterCard index={item.EncounterID} encounter={item} key={item.EncounterID}></EncounterCard>
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
    // return (
    //   <div className='encounterList'>
    //       <table className='table'>
    //         <thead>
    //           <tr>
    //             <th>Encounter ID</th>
    //             <th>Encounter Date</th>
    //             <th>Site ID</th>
    //             <th>Reported By</th>
    //             <th>Total Spotted</th>

    //           </tr>
    //         </thead>
    //         <tbody>
    //           {encounters.map(encounter => <Encounter encounter={encounter} key={encounter.EncounterID} />)}
    //         </tbody>
    //       </table>
    //     </div>
      
    // )
  // }
// }
