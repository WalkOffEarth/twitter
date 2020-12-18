import "./App.css";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import Tweets from "./pages/Tweets";
import Trends from "./pages/Trends";
function App() {
  return (
    <Router>
      <div className="App">Hello World</div>
      <nav>
        <ul>
          <li>
            <Link to="/">Tweets</Link>
          </li>
          <li>
            <Link to="/trends">Trends</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/trends" component={Trends}></Route>
        <Route path="/" component={Tweets}></Route>
      </Switch>
    </Router>
  );
}

export default App;
