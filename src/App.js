import {BrowserRouter as Router, Route, Switch} from "react-router-dom"

import MainPage from "./Pages/MainPage/MainPage"

import "./Style/Content.css"
import "./Style/Footer.css"
import "./Style/Navbar.css"

function App() {
  return (
    <Router>
      <Switch>
        <Route path = "/" exact component = {MainPage} />
      </Switch>
    </Router>
  );
}

export default App;
