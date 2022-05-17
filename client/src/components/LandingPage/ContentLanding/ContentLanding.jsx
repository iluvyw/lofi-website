import About from "./About/About";
import Gallery from "./Features/FeatureGallery";
import Contact from "./Contact/Contact";

const ContentLanding = () => {
  return (
    <div className="mt-4" id="content-landing">
      <About />
      <Gallery />
      <Contact />
    </div>
  );
};

export default ContentLanding;
