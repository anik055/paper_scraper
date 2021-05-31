// import logo from './logo.svg';
import "./App.css";
import Home from "./component/Home/Home";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";



function App() {

  return (
    <Router>
      <Switch>
        <Route path="/" >
          <Home/>
          <h1>anik</h1>
        </Route>
      </Switch>
    </Router>
    );
}

export default App;
