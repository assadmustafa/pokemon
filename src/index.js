import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import NoPage from "./pages/NoPage";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SignOut from "./SignOut";
import Game from "./pages/Game";
import Scoreboard from "./pages/Scoreboard";
<style>
  @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@500&display=swap');
</style>

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="scoreboard" element={<Scoreboard />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="signout" element={<SignOut />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);