import data from "../FixedData";
import music from "../../../../assets/other/music.png";
import { gsap, Power3 } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import useAuthentication from "../../../../hooks/useAuthentication";

const About = () => {
  gsap.registerPlugin(ScrollTrigger);
  const { user } = useAuthentication();
  let aboutItem = useRef(null);

  useEffect(() => {
    gsap.to(aboutItem.current, {
      duration: 12,
      opacity: 1,
      ease: Power3.easeOut,
    });
  }, []);
  return (
    <section
      ref={aboutItem}
      className="flex justify-end items-start gap-4 opacity-0"
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
