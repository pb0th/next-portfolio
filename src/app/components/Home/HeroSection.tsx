"use client";
import { useEffect, useState } from "react";
import "../../css/home.css";

export default function HeroSection() {
  let textFadeOutStart: number;
  const [backgroundOpacity, setBackgroundOpacity] = useState(0);
  const [prevScrollY, setPrevScrollY] = useState(0);
  let isIntroTextAnimated = false;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollDirection = scrollPosition > prevScrollY ? "down" : "up";

    handleBackgroundDarkenOnScroll(scrollPosition, scrollDirection);
    handleIntroTextFadeOutOnScroll(scrollPosition, scrollDirection);
  };

  const handleBackgroundDarkenOnScroll = (
    scrollPosition: number,
    scrollDirection: "down" | "up"
  ) => {
    const darkenOnScrollFactor = 0.003;
    let newOpacity;

    if (scrollDirection === "down") {
      newOpacity = Math.min(
        backgroundOpacity +
          darkenOnScrollFactor * (scrollPosition - prevScrollY),
        1
      );
      if (newOpacity === 1 && !textFadeOutStart) {
        textFadeOutStart = scrollPosition;
      }
    } else {
      newOpacity = Math.max(
        backgroundOpacity +
          darkenOnScrollFactor * (scrollPosition - prevScrollY),
        0
      );
    }

    setBackgroundOpacity(newOpacity);
    setPrevScrollY(scrollPosition);
  };

  const handleIntroTextFadeOutOnScroll = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    if (scrollPosition != undefined) {
      const opacityFactor = 0.001;
      const textFadeOutScrollPosition = scrollPosition - textFadeOutStart;
      const newTranslate =
        textFadeOutScrollPosition >= 0 ? 0.4 * textFadeOutScrollPosition : 0;
      const newOpacity =
        scrollDirection == "down"
          ? Math.max(1 - opacityFactor * textFadeOutScrollPosition, 0)
          : Math.min(1 - opacityFactor * textFadeOutScrollPosition, 1);

      const introTextNameElement = document.getElementById(
        "hero-section-intro-text-name"
      );
      const introTextDescElement = document.getElementById(
        "hero-section-intro-text-desc"
      );
      introTextNameElement!.style.transform = `translateX(${newTranslate}px)`;
      introTextNameElement!.style.opacity = newOpacity.toString();
      introTextDescElement!.style.transform = `translateX(${-newTranslate}px)`;
      introTextDescElement!.style.opacity = newOpacity.toString();
    }
  };

  const handleAnimateIntroText = () => {
    if (!isIntroTextAnimated) {
      isIntroTextAnimated = true;
      const introTextDescElement = document.getElementById(
        "hero-section-intro-text-desc"
      );
      const words = [
        "CAMBODIAN",
        "SOFTWARE",
        "ENGINEER",
        "WORKING",
        "IN",
        "JAPAN",
      ];
      let textFadeInAnimationDelay = 0;
      let spanElement;

      words.forEach((word) => {
        // create the a element for each word
        spanElement = document.createElement("span");
        // inject the word into the span element
        spanElement.innerText = `${word}  `;
        // add animation delay to make them appear one after another
        spanElement.style.animationDelay = `${textFadeInAnimationDelay}s`;
        // append the span element to the intro text paragraph
        introTextDescElement?.appendChild(spanElement);
        // increment delay every iteration
        textFadeInAnimationDelay += 0.3;
      });
      spanElement!.addEventListener("animationend", () => {
        // background fade in animation
        handleDarkBackgroundFadeOut();
      });
    }
  };

  const handleDarkBackgroundFadeOut = () => {
    const heroSectionIntroTextContainerElement = document.getElementById(
      "hero-section-intro-video-container"
    );
    heroSectionIntroTextContainerElement!.style.animation =
      "bg-fade-out 2s ease-in-out forwards";
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    handleAnimateIntroText();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="bg-black relative"
      id="hero-section-parent-container"
      style={{ minHeight: "220vh", width: "100%" }}
    >
      <div className="w-full h-screen sticky top-0 left-0 right-0 bottom-0">
        <div className="w-full h-full">
          <div
            className="w-full h-full absolute top-0 left-0"
            style={{ opacity: `0` }}
            id="hero-section-intro-video-container"
          >
            <video
              loop
              muted
              autoPlay
              className="w-full h-full object-cover"
              playsInline
              id="hero-section-intro-video"
            >
              <source id="video-source" src="/hero_bg.mp4" type="video/mp4" />
            </video>
          </div>
          <div
            className="w-full h-full absolute top-0 left-0 flex justify-center items-center overflow-x-hidden"
            id="hero-section-intro-text-container"
            style={{ backgroundColor: `rgba(0, 0, 0, ${backgroundOpacity})` }}
          >
            <div className="text-center text-white">
              <h2
                className="text-4xl lg:text-7xl 2xl:text-9xl "
                id="hero-section-intro-text-name"
              >
                NEAK PANHBOTH2
              </h2>
              <h5
                className="mt-6 text-sm lg:text-lg xl:text-2xl font-light tracking-widest text-center"
                id="hero-section-intro-text-desc"
              ></h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
