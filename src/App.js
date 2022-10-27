import './App.css';
import Home from './pages/Home';
import Login from './pages/Login';
import { Route, Routes } from 'react-router-dom';
import SignUp from "./pages/signUp";
import About from "./pages/about";
import SearchPage from "./pages/searchPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/sign_up" element={<SignUp />} />
      <Route path="/About" element={<About />} />
      <Route path="/Search" element={<SearchPage />} />
      <Route path="/Books" element={<Home />} />
    </Routes>
  )
}

export default App;
