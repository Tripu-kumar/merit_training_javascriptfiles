
import './App.css';
import Pnr from './pnr';
import Reserved from './reserved';
import Fareseat from './fareseat';
import {Link,BrowserRouter as Router,Route,Switch} from 'react-router-dom'
function App() {
  return (
    <div className="App">
    
    <Router>
    <Switch>
      <Route path="/pnr" component={Pnr}/>
      <Route path="/reserved" component={Reserved}/>
      <Route path="/fareseat" component={Fareseat}/>
      <Route path="" component={Pnr}/>
    </Switch>
    </Router>
    
    </div>
  );
}

export default App;
