import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./pages/Main";
import Album from "./pages/Album";

function App() {
  return (
    <div className="text-slate-300 font-sora h-screen w-screen px-2 py-4 overflow-y-auto overflow-x-hidden bg-gradient-to-tl from-nearwhite to-nearblack">
      {/* <NavBar /> */}
      {/* <Main /> */}
      <Album />
    </div>
  );
}

export default App;
