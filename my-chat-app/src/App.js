import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";

import SingUp from './pages/SingUp';
import SignIn from './pages/SignIn';




function App() {
  return (
    <div className="App">
         <Router>
            <Switch>
              <Route path="/signin">
                <h1>hi</h1>
                <SignIn />
              </Route>

              <Route path= "/signup">
                <SingUp/>
              </Route>

              <Route path= "/main">
                <Main/>
              </Route>
            </Switch>
          </Router>
    </div>
  );
}

export default App;
