import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import TypeUpload from './Components/Encounters/TypeUpload'
import AddEncounter from './Components/Encounters/AddEncounter'
import UploadPhoto from './Components/Encounters/UploadPhoto'
import {HeaderTitle} from './Components/HeaderTitle'
import Encounters from './Components/Encounters/Encounters'

const App = () => {
  return (
    <Router>
      <div className='body'>
        <NavBar />
        {/* <HeaderTitle /> */}
        <div className='container'>
        { <Route path='/Encounters' component={Encounters} /> }
          { <Route path='/HeaderTitle' component={HeaderTitle} /> }
          { <Route path='/AddEncounter' component={AddEncounter} /> }
          { <Route path='/TypeUpload' component={TypeUpload} /> }
          { <Route path='/UploadPhoto' component={UploadPhoto} /> }
        </div>
      </div>

    </Router>
  )
}

export default App;
