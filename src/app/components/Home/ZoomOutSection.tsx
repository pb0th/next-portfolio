"use client";
import { useEffect } from "react";

export default function ZoomOutSection() {
  const prevScrolly = 0;
  let fadeInScrollStart: number;

  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollDirection = scrollPosition > prevScrolly ? "down" : "up";
    handleContainerTransformScale(scrollPosition, scrollDirection);
  };

  const handleContainerTransformScale = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    const scaleFactor = 0.0008;
    const containerElement = document.getElementById(
      "zoom-out-section-container"
    );
    const scaleContainer = document.getElementById("zoom-out-scale-container");
    const containerTopPosition = containerElement!.offsetTop;
    const currentScrollPosition = scrollPosition - containerTopPosition;

    if (scrollPosition >= containerTopPosition) {
      const newScale =
        scrollDirection == "down"
          ? Math.max(1 - scaleFactor * currentScrollPosition, 0.6)
          : Math.min(1 - scaleFactor * currentScrollPosition, 1);

      scaleContainer!.style.transform = `scale(${newScale})`;

      if (newScale <= 0.85) {
        fadeInScrollStart =
          fadeInScrollStart == undefined
            ? currentScrollPosition
            : fadeInScrollStart;
        const opacityFactor = 0.003;
        const newFadeInOpacity =
          scrollDirection == "down"
            ? Math.max(
                1 - opacityFactor * (currentScrollPosition - fadeInScrollStart),
                0
              )
            : Math.min(
                1 - opacityFactor * (currentScrollPosition - fadeInScrollStart),
                1
              );
        const newBorderRadius = Math.min(
          100 * scaleFactor * (currentScrollPosition - fadeInScrollStart),
          40
        );

        scaleContainer!.style.borderRadius = `${newBorderRadius}px`;
        scaleContainer!.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, ${newFadeInOpacity}), rgba(0, 0, 0, ${newFadeInOpacity}) ), url('/about.jpg')`;
      }
    } else {
      scaleContainer!.style.transform = `scale(1)`;
      scaleContainer!.style.borderRadius = `0px`;
      scaleContainer!.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) ), url('/about.jpg')`;
      // scaleContainer!.style.background = `black`;
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
      className=" w-full "
      style={{ height: "160vh" }}
      id="zoom-out-section-container"
    >
      <div
        className=" sticky top-0 -right-20 h-screen w-full object-cover bg-no-repeat bg-cover"
        id="zoom-out-scale-container"
        style={{
          backgroundImage: `linear-gradient( rgba(0, 0, 0, 1), rgba(0, 0, 0, 1) ), url('/about.jpg')`,
        }}
      ></div>
    </div>
  );
}
