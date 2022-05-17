import data from "../FixedData";
import music from "../../../../assets/other/music.png";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import useOnScreen from "../../../../hooks/useOnScreen";
import { classnames } from "tailwindcss-classnames";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  let aboutItem = useRef(null);
  const onScreen = useOnScreen(aboutItem, 0.1);

  useEffect(() => {
    if (onScreen) {
      gsap.to(aboutItem.current, {
        duration: 12,
        opacity: 1,
        ease: Power3.easeOut,
      });
    }
  }, [onScreen]);

  return (
    <section
      ref={aboutItem}
      className={classnames("flex justify-end items-start gap-4 opacity-0", {
        "is-reveal": onScreen,
      })}
      id="about-section"
    >
      <div className="flex-col">
        <div className="text-[50px]">
          <span className="text-[130px] text-[#FFBD33]">Lofie</span>Chill
        </div>
        <img width={"500px"} src={music} alt="" className="mt-[-150px]" />
      </div>

      <p className="w-[30%] text-justify text-[20px] text-gunmetal font-thin mt-16 text-opacity-80 ">
        {data.About}
      </p>
    </section>
  );
};

export default About;
