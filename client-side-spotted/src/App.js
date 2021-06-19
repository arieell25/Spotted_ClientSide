import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import React from "react";
import { ThemeProvider } from "@material-ui/styles";
import { userService } from "./Service/UserService";
import NavBar from "./Components/NavBar";
import AddEncounter from "./Components/Encounters/pages/AddEncounter";
import UploadPhoto from "./Components/Encounters/pages/UploadPhoto";
import { HeaderTitle } from "./Components/HeaderTitle";
import EncountersBoard from "./Components/Encounters/pages/EncountersBoard";
import IdentifiedBoard from "./Components/Encounters/pages/IdentifiedBoard";
import IdentifyPhoto from "./Components/Encounters/pages/IdentifyPhoto";
import EditIdentifiedEncounter from "./Components/Encounters/pages/EditIdentified";
import EncounterProfile from "./Components/Encounters/components/EncounterProfile";
import IdentifiedProfile from "./Components/Encounters/components/IdentifiedProfile";
import theme from "./Components/Themes/theme";
import EditEncounter from "./Components/Encounters/pages/EditEncounter";
import EditUserProfile from "./Components/Encounters/pages/EditUserProfile";
import UserEncountersBoard from "./Components/Encounters/pages/UserEncountersBoard";
// import AdminDashboard from './Components/admin/AdminDashboard';

import Dashboard from "./Components/admin/views/Dashboard";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="body">
        <NavBar />
        <Router>
          <div className="container">
            <Route exact path="/">
              {!userService.isAdmin() ? (
                <Redirect to="/EncountersBoard" />
              ) : (
                <Redirect to="/AdminDashboard" />
              )}
            </Route>
            <Route path="/Home" component={HeaderTitle} />
            <Route path="/AddEncounter" component={AddEncounter} />
            <Route path="/UploadPhoto" component={UploadPhoto} />
            <Route path="/EncountersBoard" component={EncountersBoard} />
            <Route
              path="/UserEncountersBoard"
              component={UserEncountersBoard}
            />
            <Route path="/IdentifiedBoard" component={IdentifiedBoard} />
            <Route path="/EncounterProfile" component={EncounterProfile} />
            <Route path="/IdentifiedProfile" component={IdentifiedProfile} />
            <Route path="/IdentifyPhoto" component={IdentifyPhoto} />
            <Route
              path="/EditIdentifiedEncounter"
              component={EditIdentifiedEncounter}
            />
            <Route path="/EditEncounter" component={EditEncounter} />
            <Route path="/EditUserProfile" component={EditUserProfile} />
            <Route path="/AdminDashboard" component={Dashboard} />
            <Route path="/admin/dashboard" component={Dashboard} />
          </div>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
