import { useEffect, useRef, useState } from "react";
import { gsap, Power2, Power4, Power3, Elastic } from "gsap";
import { TextPlugin, RoughEase } from "gsap/all";
import ScrollTrigger from "gsap/ScrollTrigger";
import useOnScreen from "../../../../hooks/useOnScreen";
import classnames from "tailwindcss-classnames";

const words = [" from 19APCS2.", " Lofie team.", " Developers."];
gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(TextPlugin);
gsap.registerPlugin(RoughEase);

const Contact = () => {
  const [currentIndex, setIndex] = useState(0);
  const [displayText, setDisplayText] = useState(false);

  let wrapRef = useRef();
  const onScreen = useOnScreen(wrapRef, 0.5);
  let cursorRef = useRef();
  let boxRef = useRef();
  let hiRef = useRef();
  let textRef = useRef();
  let textTL = gsap.timeline();
  function increaseIndex() {
    setIndex(currentIndex === words.length - 1 ? 0 : currentIndex + 1);
  }

  useEffect(() => {
    if (onScreen) {
      gsap.to(wrapRef.current, {
        duration: 4,
        opacity: 1,
        ease: Power3.easeOut,
      });

      gsap
        .timeline()
        .to(boxRef.current, {
          duration: 2,
          width: "27vw",
          delay: 0.5,
          ease: Power4.easeInOut,
        })
        .to(hiRef.current, {
          duration: 0.7,
          y: "-0.5vw",
          ease: Power3.easeOut,
          onComplete: () => {
            setDisplayText(true);
          },
        })
        .to(boxRef.current, {
          duration: 4,
          height: "5vw",
          ease: Elastic.easeOut,
        })
        .to(boxRef, {
          duration: 2,
          autoAlpha: 0.5,
          yoyo: true,
          repeat: -1,
        });
    }

    let interval;
    if (displayText) {
      interval = setInterval(() => {
        increaseIndex();
      }, 2000);

      textTL.add(
        gsap.to(textRef.current, {
          duration: 1,
          text: words[currentIndex],
          repeat: 1,
          repeatDelay: 10,
        })
      );
    }

    gsap.to(cursorRef.current, {
      opacity: 0,
      ease: Power2.easeInOut,
      repeat: -1,
    });
    return () => {
      clearInterval(interval);
    };
  }, [textTL, onScreen, currentIndex]);

  return (
    <section
      id="contact-section"
      ref={wrapRef}
      className={classnames(
        "opacity-0 mt-[10%] bg-gradient-to-br from-zinc-900 to-slate-500 font-cutive text-[4.5vw] h-screen p-8 font-extrabold flex items-center",
        { "is-reveal": onScreen }
      )}
    >
      <h1 className="relative overflow-hidden">
        <span
          className="absolute bottom-[3vh] inline-block bg-amber-700 -z-1 w-[0vw] h-[0.3vw]"
          ref={boxRef}
        ></span>
        <span ref={hiRef} className="inline-block translate-y-[7vw]">
          Hi, we are
        </span>
        <span ref={textRef} className=""></span>
        <span className="" ref={cursorRef}>
          _
        </span>
      </h1>
    </section>
  );
};

export default Contact;
