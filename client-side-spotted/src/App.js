import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import TypeUpload from './Components/Encounters/TypeUpload'
import AddEncounter from './Components/Encounters/AddEncounter'
import UploadPhoto from './Components/Encounters/UploadPhoto'
import {HeaderTitle} from './Components/HeaderTitle'
import EncountersBoard from './Components/Encounters/showEncounters/EncountersBoard'
// import Encounters from './Components/Encounters/Encounters'
import SignUp from './Components/SignUp/SignUp'
import EncounterProfile from './Components/Encounters/showEncounters/EncounterProfile'

import AddIdentifiedEncounter from './Components/Encounters/AddIdentifiedEncounter'

const App = () => {
  return (
    <Router>
      <div className='body'>
        <NavBar />
        {/* <HeaderTitle /> */}
        <div className='container'>
        { <Route path='/SignUp' component={SignUp} /> }
          { <Route path='/HeaderTitle' component={HeaderTitle} /> }
          { <Route path='/AddEncounter' component={AddEncounter} /> }
          { <Route path='/TypeUpload' component={TypeUpload} /> }
          { <Route path='/UploadPhoto' component={UploadPhoto} /> }
          { <Route path='/EncountersBoard' component={EncountersBoard}/>}
          { <Route path='/AddIdentifiedEncounter' component={AddIdentifiedEncounter}/>}
          { <Route path='/EncounterProfile' component={EncounterProfile}/>}
        </div>
      </div>

    </Router>
  )
}

export default App;
