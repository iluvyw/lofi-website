import { useEffect, useState, useRef } from "react";
import useOnScreen from "../../../../hooks/useOnScreen";
import FixedData from "../FixedData";
import { classnames } from "tailwindcss-classnames";
import { gsap, Power3 } from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { GrNext } from "react-icons/gr";
import { GrPrevious } from "react-icons/gr";

const listImages = FixedData.Features.listFeatures;
gsap.registerPlugin(ScrollTrigger);

let FeatureItem = ({ src, title, subtile, index }) => {
  const ref = useRef(null);
  const onScreen = useOnScreen(ref, 0.5);

  return (
    <div
      className={classnames(
        "aspect-video h-[100%] grid grid-cols-[20vw_1fr_200px] w-[100%] bg-gradient-to-b from-black/50 to-slate-500/25 bg-opacity-0",
        { "is-reveal": onScreen }
      )}
      id="gallery-item-wrapper"
      ref={ref}
    >
      <div></div>
      <div className="w-[100%] h-[100%] relative will-change-transform">
        <div className="absolute bottom-[10%] z-50 translate-x-[-20%] #dbd8d6">
          <h1 className="leading-[6vw] font-jamjuree text-[6vw] antialiased">
            {title}
          </h1>
          <h2 className="relative leading-[6vw] font-bodoni text-[6vw] antialiased stroke-[2px] stroke-[#dbd8d6]">
            {subtile}
          </h2>
        </div>
        <div
          style={{ backgroundImage: `url(${src})` }}
          className="scale-0.7 bg-cover bg-center origin-center w-[100%] h-[100%] will-change-transform transition-all duration-[1500]"
        ></div>
      </div>
      <div></div>
    </div>
  );
};

const Gallery = () => {
  const [activeImage, setActiveImage] = useState(0);
  const slideRef = useRef();
  const onScreen = useOnScreen(slideRef, 0.5);

  const handlePrevClick = () => {
    setActiveImage(activeImage === 0 ? listImages.length - 1 : activeImage - 1);
  };

  const handleNextClick = () => {
    setActiveImage(activeImage === listImages.length - 1 ? 0 : activeImage + 1);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextClick();
    }, 3000);
    return () => {
      clearInterval(interval);
    };
  }, [activeImage]);

  useEffect(() => {
    if (onScreen) {
      gsap.to(slideRef.current, {
        duration: 6,
        opacity: 1,
        ease: Power3.easeOut,
      });
    }
  }, [onScreen]);
  return (
    <section className="" id="gallery-section">
      <div
        ref={slideRef}
        className={classnames("w-full select-none relative opacity-0", {
          "is-reveal": onScreen,
        })}
      >
        <FeatureItem
          key={listImages[activeImage].src}
          index={activeImage}
          {...listImages[activeImage]}
        />
        <div className="absolute top-1/2 transform -translate-y-1/2 px-8 w-full flex justify-between items bg-center">
          <button onClick={handlePrevClick}>
            <GrPrevious
              size={"40px"}
              className="bg-slate-500 rounded-full p-2 bg-opacity-40 cursor-pointer hover:bg-opacity-100"
            />
          </button>

          <button onClick={handleNextClick}>
            <GrNext
              size={"40px"}
              className="bg-slate-600 rounded-full p-2 bg-opacity-40 cursor-pointer hover:bg-opacity-100"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
