import LofieLogo from "../logo/LofieLogo";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect, useState } from "react";
import FormPanel from "../LoginRegister/FormPanel";

const NavBar = () => {
  const [isVisible, setVisible] = useState(false);

  gsap.registerPlugin(ScrollTrigger);
  let navItem = useRef(null);

  useEffect(() => {
    gsap.to(navItem.current, {
      y: 0,
      opacity: 1,
      duration: 1.5,
    });
  }, []);

  const handleOnClick = () => {
    setVisible(true);
  };

  const handleClickAbout = (elID) => {
    if (elID) {
      document.getElementById(elID).scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav ref={navItem} className="flex opacity-0 translate-y-[-100px]">
        <div className="ml-[-45px] mt-[-55px] cursor-pointer hover:animate-pulse">
          <LofieLogo />
        </div>
        <ul className="flex gap-10 text-[25px] font-semibold ml-auto mt-[65px]">
          <li
            className="nav-item"
            onClick={(e) => {
              handleClickAbout("gallery-section");
            }}
          >
            Features
          </li>
          <li className="nav-item">Pricing</li>
          <li
            className="nav-item"
            onClick={(e) => {
              handleClickAbout("about-section");
            }}
          >
            About
          </li>
          <li
            className="nav-item"
            onClick={(e) => {
              handleClickAbout("contact-section");
            }}
          >
            Contact
          </li>
        </ul>
        <button
          className="rounded-[10px] bg-gunmetal px-6 h-11 py-[10px] mt-[65px] ml-24 hover:text-white hover:bg-black transition-all duration-300 text-[18px]"
          onClick={handleOnClick}
        >
          Get started
        </button>
      </nav>
      {isVisible === true && <FormPanel close={() => setVisible(false)} />}
    </>
  );
};

export default NavBar;
