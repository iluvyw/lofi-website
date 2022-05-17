import ContentLanding from "./ContentLanding/ContentLanding";
import NavBar from "./NavBar/NavBar";

const LandingPage = () => {
  return (
    <div className="w-full h-auto" id="landing-page">
      <div className="main-container" id="main-container"></div>
      <NavBar />
      <ContentLanding />
    </div>
  );
};

export default LandingPage;
