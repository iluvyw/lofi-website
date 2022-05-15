import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import Main from "./pages/Main";

function App() {
  return (
    <div className="text-slate-300 font-sora h-screen w-screen px-2 py-4 overflow-y-auto overflow-x-hidden bg-gradient-to-tl from-nearwhite to-nearblack">
      {/* <NavBar /> */}
      <Main />
    </div>
  );
}

export default App;
