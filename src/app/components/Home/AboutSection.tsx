"use client";
import { useEffect, useState } from "react";

export function AboutSection() {
  let prevScrollY = 0;
  let textDescStart: number;
  let fadeOutStart: number;
  let zoomOutStart: number;

  const [introOpacity, setIntroOpacity] = useState(1);
  const [introTextScale, setIntroTextScale] = useState(1);

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollDirection = scrollPosition > prevScrollY ? "down" : "up";
    handleTransitionIn(scrollPosition, scrollDirection);
    handleDescriptionTransition(scrollPosition, scrollDirection);
    handleTransitionOut(scrollPosition, scrollDirection);
    handleZoomOut(scrollPosition, scrollDirection);
    prevScrollY = scrollPosition;
  };

  const handleTransitionIn = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    const containerElement = document.getElementById("about-section-container");
    if (containerElement) {
      const scrollStart = containerElement?.offsetTop;
      const currentScrollPosition = scrollPosition - scrollStart;
      if (scrollPosition >= scrollStart!) {
        const opacityFactor = 0.0008;
        const newOpacity =
          scrollDirection == "down"
            ? Math.max(1 - opacityFactor * currentScrollPosition, 0)
            : Math.min(1 - opacityFactor * currentScrollPosition, 1);
        const newScale =
          scrollDirection == "down"
            ? Math.min(introTextScale + 0.0006 * currentScrollPosition, 3)
            : Math.max(introTextScale + 0.0006 * currentScrollPosition, 1);

        if (newOpacity == 0) {
          textDescStart =
            textDescStart == undefined ? scrollPosition : textDescStart;
        }

        setIntroOpacity(newOpacity);
        setIntroTextScale(newScale);
      } else {
        setIntroOpacity(1);
      }
    }
  };

  const handleDescriptionTransition = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    const aboutTextDesc = document.getElementById("about-desc-text");
    const aboutTextDescTitle = document.getElementById("about-desc-text-title");
    const aboutTextDescParagraph = document.getElementById(
      "about-desc-text-paragraph"
    );
    const originalYPosition = -300;
    if (aboutTextDesc && textDescStart) {
      if (scrollPosition >= textDescStart) {
        const currentScrollPosition = scrollPosition - textDescStart;

        const textDescOpacity =
          scrollDirection == "down"
            ? Math.min(0.002 * currentScrollPosition, 1)
            : Math.max(0.002 * currentScrollPosition, 0);
        const letterSpacing =
          scrollDirection == "down"
            ? Math.max(1 - 0.002 * currentScrollPosition, 0)
            : Math.min(Math.max(1 - 0.002 * currentScrollPosition, 0), 1);

        const newTranslateY =
          scrollDirection == "down"
            ? Math.min(0.3 * (originalYPosition + currentScrollPosition), 0)
            : Math.max(
                0.3 * Math.min(originalYPosition + currentScrollPosition, 0)
              );
        aboutTextDesc!.style.opacity = textDescOpacity.toString();
        aboutTextDescTitle!.style.letterSpacing = `${letterSpacing}rem`;
        aboutTextDescParagraph!.style.transform = `translateY(${-newTranslateY}px)`;
        if (textDescOpacity == 1) {
          fadeOutStart =
            fadeOutStart == undefined ? scrollPosition : fadeOutStart;
        }
      } else {
        aboutTextDesc!.style.opacity = "0";
        aboutTextDescTitle!.style.letterSpacing = `0rem`;
        aboutTextDescParagraph!.style.transform = `translateY(${originalYPosition}px)`;
      }
    }
  };

  const handleTransitionOut = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    if (fadeOutStart && scrollPosition >= fadeOutStart) {
      const currentScrollPosition = scrollPosition - fadeOutStart;
      const aboutTextDesc = document.getElementById("about-desc-text");
      const aboutTextDescTitle = document.getElementById(
        "about-desc-text-title"
      );
      const aboutTextDescParagraph = document.getElementById(
        "about-desc-text-paragraph"
      );
      const bgOpacity =
        scrollDirection == "down"
          ? Math.min(0.002 * currentScrollPosition, 1)
          : Math.max(0.002 * currentScrollPosition, 0);
      const textOpacity =
        scrollDirection == "down"
          ? Math.max(1 - 0.002 * currentScrollPosition, 0)
          : Math.min(1 - 0.002 * currentScrollPosition, 1);
      const newTranslate =
        scrollDirection == "down"
          ? Math.min(0.5 * currentScrollPosition, 200)
          : Math.max(0.5 * currentScrollPosition, 0);

      aboutTextDesc!.style.background = `rgba(0, 0, 0, ${bgOpacity})`;
      aboutTextDescTitle!.style.opacity = textOpacity.toString();
      aboutTextDescTitle!.style.transform = `translateY(${-newTranslate}px)`;
      aboutTextDescParagraph!.style.opacity = textOpacity.toString();
      aboutTextDescParagraph!.style.transform = `translateY(${newTranslate}px)`;
      if (bgOpacity == 1) {
        zoomOutStart =
          zoomOutStart == undefined ? scrollPosition : zoomOutStart;
      }
    }
  };

  const handleZoomOut = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    const containerElement = document.getElementById("about-sticky-container");
    if (zoomOutStart && scrollPosition >= zoomOutStart) {
      const currentScrollPosition = scrollPosition - zoomOutStart;

      const newScale =
        scrollDirection == "down"
          ? Math.max(1 - 0.0008 * currentScrollPosition, 0.6)
          : Math.min(Math.max(1 - 0.0008 * currentScrollPosition, 0.6), 1);
      console.log(newScale);
      containerElement!.style.transform = `scale(${newScale})`;
      //   containerElement!.style.transformOrigin = `center bottom`;
    } else {
      containerElement!.style.transform = `scale(1)`;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      id="about-section-container"
      style={{
        height: "360vh",
        width: "100%",
      }}
    >
      <div
        className="h-screen w-full bg-black text-white sticky top-0 overflow-hidden"
        id="about-sticky-container"
      >
        <div
          className="absolute h-full w-full flex items-center justify-center z-40 bg-black"
          style={{ opacity: introOpacity }}
        >
          <div
            className="text-white text-center"
            style={{ transform: `scale(${introTextScale})` }}
          >
            <h6 className="font-bold mb-4">INTO THE JOURNEY OF</h6>
            <h2
              className="text-6xl font-bold"
              style={{ letterSpacing: `${introTextScale}rem` }}
            >
              A SOFTWARE ENGINEER
            </h2>
          </div>
        </div>
        <div
          className="absolute top-0 z-30 h-full w-full p-10 flex items-center justify-center text-white  "
          style={{ opacity: 0 }}
          id="about-desc-text"
        >
          <div className="text-center">
            <div id="about-desc-text-title">
              <div className="text-md">DRIVEN BY PASSION</div>
              <div className="font-bold text-7xl mt-2">ABOUT MYSELF</div>
            </div>

            <div
              className="mt-6 text-sm  w-body"
              style={{ lineHeight: "1.8" }}
              id="about-desc-text-paragraph"
            >
              I'm Neak Panhboth, a dynamic 24-year-old Software Engineer
              originating from the lively city of Phnom Penh, Cambodia. My
              journey into the realm of technology and software development
              reached a milestone with my graduation from The Kirirom Institute
              of Technology in November 2022. Currently, I find myself immersed
              in the tech scene in Kagawa Prefecture, Japan.
            </div>
          </div>
        </div>
        <div className="w-full h-full absolute top-0 left-0 z-0">
          <video
            loop
            muted
            autoPlay
            className="w-full h-full object-cover"
            playsInline
          >
            <source id="video-source" src="/about_bg.mp4" type="video/mp4" />
          </video>
          <div className="w-full h-full absolute top-0 left-0 z-10 bg-black opacity-30"></div>
        </div>
      </div>
    </div>
  );
}
