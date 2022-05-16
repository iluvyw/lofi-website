import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import { AuthProvider } from "./hooks/useAuthentication";

function App() {
  return (
    <div className="text-slate-300 font-sora h-screen px-8 py-4 overflow-y-auto overflow-x-hidden bg-gradient-to-tl from-nearwhite to-nearblack">
      <AuthProvider>
        <LandingPage />
      </AuthProvider>
    </div>
  );
}

export default App;
