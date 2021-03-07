import { BrowserRouter as Router, Route } from 'react-router-dom'
import NavBar from './Components/NavBar'
import { HeaderTitle } from './Components/HeaderTitle'
import Form from './Components/Encounters/Form'

const App = () => {
  return (
    <Router>
      <div className='body'>
        <NavBar />
        <HeaderTitle />
        <div className='container'>
          { <Route path='/Form' component={Form} /> }
          {/* <Route path='/' component={name_component} /> */}
          {/* <Route path='/' component={name_component} /> */}
        </div>
      </div>

    </Router>
  )
}

export default App;
