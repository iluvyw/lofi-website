import "./App.css";
import Main from "./pages/Main";
import Album from "./pages/Album";
import CreateAlbum from "./pages/CreateAlbum";
import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./hooks/useAuthentication";

function App() {
  return (
    <div className="text-slate-300 font-sora h-screen w-screen px-2 py-4 overflow-y-auto overflow-x-hidden bg-gradient-to-tl from-nearwhite to-nearblack">
      <AuthProvider>
        <Routes>
          <Route exact path='/' element={<LandingPage />} />
          <Route exact path='/create-album' element={<CreateAlbum />} />
          <Route exact path='/choose-album' element={<Album />} />
          <Route exact path='/album/:id' element={<Main />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
