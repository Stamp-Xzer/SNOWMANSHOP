import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import Home from "./Page/Homepage";
import Appproduct from "./Page/Addproduct";
import Dev from "./Page/Dev";
import Login from "./Page/Login";
import Signup from "./Page/Signup";
import Profile from "./Page/Profile";
import Shop from "./Page/Shop";
import Orders from "./Page/Orders";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/Home" />} />
        <Route path="/Home" component={Home} />
        <Route path="/Addproduct" component={Appproduct} />
        <Route path="/Dev" component={Dev} />
        <Route path="/Login" component={Login} />
        <Route path="/Signup" component={Signup} />
        <Route path="/Profile" component={Profile} />
        <Route path="/Shop" component={Shop} />
        <Route path="/Order" component={Orders} />
      </Switch>
    </Router>
  );
};

export default App;
