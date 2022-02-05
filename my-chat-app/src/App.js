import logo from './logo.svg';
import './App.css';
import Main from './Main';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import SingUp from './pages/SingUp';
import SignIn from './pages/SignIn';


function App() {
  return (
    <div className="App">
         <BrowserRouter>
            <Routes>

              <Route path="/signin" element={< SignIn/>} />
              
              <Route path="/signup" element={< SingUp/>} />
              <Route path="/" element={< Main/>} />

            </Routes>
          </BrowserRouter>

          <h1>This is the chat</h1>
    </div>
  );
}

export default App;
