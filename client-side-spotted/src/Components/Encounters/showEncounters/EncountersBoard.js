import { useState, useEffect, React } from 'react'
import { EncounterService } from '../../../Service/EncounterService'
import Encounter from './Encounter'

export default function EncountersBoard() {
  const [encounters, setEncounters] = useState(null)
  // const [encounterAdd, setencounterAdd] = useState(false)
  const [flag] = useState(false) 

  useEffect(() => {
    getEncounters();
  }, [flag])

  const getEncounters = async () => {
    const data = await EncounterService.show()
    console.log(data)
    setEncounters(data)
  }

  if (!encounters) return <div>Loading...</div>
  else {
    return (
      <div className='encounterList'>
          <table className='table'>
            <thead>
              <tr>
                <th>Encounter ID</th>
                <th>Encounter Date</th>
                <th>Site ID</th>
              </tr>
            </thead>
            <tbody>
              {encounters.map(encounter => <Encounter encounter={encounter} key={encounter.EncounterID} />)}
            </tbody>
          </table>
        </div>
      
    )
  }
}
