import './assets/scss/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import FavoritePage from './pages/FavoritePage';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/anime/:id">
          <DetailPage />
        </Route>
        <Route path="/favorite">
          <FavoritePage />
        </Route>
        <Route path="/">
          <HomePage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
