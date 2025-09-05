import {Switch,Route} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import QuizGame from './components/QuizGame'
import GameResults from "./components/GameResults"
import GameReport from './components/GameReport'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

// Replace your code here
const App = () => (
    <Switch>
        <Route exact path='/login' component={Login} />
        <ProtectedRoute exact path='/' component={Home} />
        <ProtectedRoute exact path='/quiz-game' component={QuizGame}/>
        <ProtectedRoute exact path="/game-results" component={GameResults} />
        <ProtectedRoute exact path="/game-report" component={GameReport} />
        <NotFound />
    </Switch>
)

export default App
