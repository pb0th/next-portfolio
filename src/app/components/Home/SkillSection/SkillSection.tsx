"use client";
import { useEffect } from "react";
import SkillCard from "./SkillCard";

const SkillSection = () => {
  let prevScrolly = 0;
  let skillZoomInStart: number;
  let currentSkillId = 1;
  const skills = [
    {
      title: "Frontend Web Development",
      description:
        "Craft responsive interfaces for optimal user experiences on various devices.",
      bgColor: "",
    },
    {
      title: "Backend Development",
      description:
        "Architect scalable server-side solutions, proficient in Node.js, Python, or Java, and database systems.",
      bgColor: "",
    },
    {
      title: "Cross-Platform Mobile Development",
      description:
        "Build native-like mobile applications using React Native or Flutter for seamless experiences on iOS and Android.",
      bgColor: "",
    },
    {
      title: "Cloud Computing",
      description:
        "Navigate AWS, Azure, or Google Cloud to deploy scalable, resilient solutions, optimizing infrastructure for modern architectures.",
      bgColor: "",
    },
  ];
  const handleScroll = () => {
    const scrollPosition = window.scrollY;
    const scrollDirection = scrollPosition > prevScrolly ? "down" : "up";
    handleFadeIn(scrollPosition, scrollDirection);
    handleSkillCardZoom(scrollPosition, scrollDirection);
    prevScrolly = scrollPosition;
  };
  const handleFadeIn = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    const sectionContainerElement = document.getElementById(
      "skill-section-container"
    );
    const titleElement = document.getElementById("skill-section-title");
    const cardsElement = document.getElementById("skill-section-cards");
    const scrollStart =
      sectionContainerElement!.getBoundingClientRect().top + scrollPosition;
    const currentScrollPosition = scrollPosition - scrollStart;
    let newOpacity;
    let newTranslateY;
    if (scrollPosition >= scrollStart - 200) {
      newOpacity =
        scrollDirection == "down"
          ? Math.min(0.002 * currentScrollPosition, 1)
          : Math.max(0.002 * currentScrollPosition, 0);

      titleElement!.style.opacity = newOpacity.toString();
      cardsElement!.style.opacity = newOpacity.toString();
    }
    if (scrollPosition >= scrollStart) {
      const originalYPosition = -200;
      newTranslateY =
        scrollDirection == "down"
          ? Math.min(originalYPosition + currentScrollPosition, 0)
          : Math.max(
              originalYPosition + currentScrollPosition > 0
                ? 0
                : originalYPosition + currentScrollPosition,
              originalYPosition
            );

      titleElement!.style.transform = `translateY(${newTranslateY}px)`;
      cardsElement!.style.transform = `translateY(${-newTranslateY}px)`;
    }
    if (newOpacity == 1 && newTranslateY == 0) {
      skillZoomInStart =
        skillZoomInStart == undefined
          ? currentScrollPosition
          : skillZoomInStart + 100;
    }
  };
  const handleSkillCardZoom = (
    scrollPosition: number,
    scrollDirection: "up" | "down"
  ) => {
    if (scrollPosition >= skillZoomInStart) {
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div
      style={{ minHeight: "360vh", width: "100%" }}
      id="skill-section-container"
    >
      <div className="sticky h-screen top-0 flex justify-center items-center w-full ">
        <div className="w-body">
          <h2
            className="text-4xl font-bold text-center pt-6"
            style={{ opacity: 0 }}
            id="skill-section-title"
          >
            MY SKILLSET
          </h2>
          <div
            className="mt-10 grid grid-cols-2 gap-6"
            id="skill-section-cards"
            style={{ opacity: 0 }}
          >
            {skills.map(({ title, description, bgColor }, index) => (
              <SkillCard
                key={index}
                skill={{ title, description, id: `skill-card-${index + 1}` }}
                bgColor={bgColor}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SkillSection;
