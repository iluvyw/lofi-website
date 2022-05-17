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
        <Route path='/create-album' element={<CreateAlbum />} />
        <Route path='/choose-album' element={<Album />} />
        <Route path='/album/:id' element={<Main />} />
      </Routes>
    </div>
  );
}

export default App;
