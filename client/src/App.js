import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./pages/Main";
import Album from "./pages/Album";
import CreateAlbum from "./pages/CreateAlbum";
import { Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div className="text-slate-300 font-sora h-screen w-screen px-2 py-4 overflow-y-auto overflow-x-hidden bg-gradient-to-tl from-nearwhite to-nearblack">
      {/* <NavBar /> */}
      <Routes>
        {/* <Route exact path='/' element={<Background />} /> */}
        <Route exact path='/create-album' element={<CreateAlbum />} />
        <Route exact path='/choose-album' element={<Album />} />
        <Route exact path='/album/:id' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
