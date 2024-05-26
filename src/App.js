import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Signin from "./pages/Signin";
import Signoff from "./pages/Signoff";
import Forgotpassword from './pages/Forgotpassword';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/sign-in" element={<Signin />} />
          <Route path="/sign-off" element={<Signoff />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
