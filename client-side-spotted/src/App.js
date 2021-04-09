import { BrowserRouter as Router, Route } from 'react-router-dom'
import { ThemeProvider } from '@material-ui/styles'
import NavBar from './Components/NavBar'
import TypeUpload from './Components/Encounters/components/TypeUpload'
import AddEncounter from './Components/Encounters/pages/AddEncounter'
import UploadPhoto from './Components/Encounters/pages/UploadPhoto'
import {HeaderTitle} from './Components/HeaderTitle'
import EncountersBoard from './Components/Encounters/pages/EncountersBoard'
import IdentifiedBoard from './Components/Encounters/pages/IdentifiedBoard'
import IdentifyPhoto from './Components/Encounters/pages/IdentifyPhoto'
// import Encounters from './Components/Encounters/Encounters'
import EditIdentifiedEncounter from './Components/Encounters/pages/EditIdentified'
import AddIdentifiedEncounter from './Components/Encounters/pages/AddIdentifiedEncounter'
import EncounterProfile from './Components/Encounters/components/EncounterProfile'
import IdentifiedProfile from './Components/Encounters/components/IdentifiedProfile'
import theme from './Components/Themes/theme';

const App = () => {
  return (
  <ThemeProvider theme={theme}>
    <Router>
      <div className='body'>
        <NavBar />
        {/* <HeaderTitle /> */}
        <div className='container'>
        { <Route path='/' /> }
        {/* { <Route path='/SignUp' component={SignUp} /> } */}
          { <Route path='/HeaderTitle' component={HeaderTitle} /> }
          { <Route path='/AddEncounter' component={AddEncounter} /> }
          { <Route path='/TypeUpload' component={TypeUpload} /> }
          { <Route path='/UploadPhoto' component={UploadPhoto} /> }
          { <Route path='/EncountersBoard' component={EncountersBoard}/>}
          { <Route path='/IdentifiedBoard' component={IdentifiedBoard}/>}  
          { <Route path='/EncounterProfile' component={EncounterProfile}/>}
          { <Route path='/IdentifiedProfile' component={IdentifiedProfile}/>}  
          { <Route path='/IdentifyPhoto' component={IdentifyPhoto}/>}
          { <Route path='/EditIdentifiedEncounter' component={EditIdentifiedEncounter}/>}
          { <Route path='/AddIdentifiedEncounter' component={AddIdentifiedEncounter}/>}
        </div>
      </div>

    </Router>
    </ThemeProvider>

  )
}

export default App;
