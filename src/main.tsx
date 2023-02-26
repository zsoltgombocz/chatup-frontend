import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter as Router } from "react-router-dom";
import Application from './Application';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <Application />
  </Router>,
)
