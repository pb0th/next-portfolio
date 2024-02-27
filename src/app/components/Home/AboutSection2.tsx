// "use client";
// import { useEffect } from "react";
// import "aos/dist/aos.css";
// import AOS from "aos";
// export default function AboutSection2() {
//   let prevScrolly = 0;
//   const handleScroll = () => {
//     const scrollPosition = window.scrollY;
//     const scrollDirection = scrollPosition > prevScrolly ? "down" : "up";
//     handleLineFade(scrollPosition, scrollDirection);

//     handleParagraphFade(scrollPosition, scrollDirection, "about-paragraph-1");
//     handleParagraphFade(scrollPosition, scrollDirection, "about-paragraph-2");
//     handleParagraphFade(scrollPosition, scrollDirection, "about-paragraph-3");
//     prevScrolly = scrollPosition;
//   };
//   const handleLineFade = (
//     scrollPosition: number,
//     scrollDirection: "up" | "down"
//   ) => {
//     const sectionContainerElement = document.getElementById(
//       "about-section-container"
//     );
//     const paragraphContainer = document.getElementById(
//       "about-paragraph-container"
//     );
//     const scrollStart = sectionContainerElement!.offsetTop - 200;

//     const scrollEnd =
//       paragraphContainer!.getBoundingClientRect().bottom + scrollPosition;

//     const verticalLineElement = document.getElementById("about-vertical-line");
//     if (scrollPosition >= scrollStart) {
//       const currentScrollPosition = scrollPosition - scrollStart;
//       const newOpacity =
//         scrollDirection == "down"
//           ? Math.max(1 - 0.01 * currentScrollPosition, 0)
//           : Math.min(1 - 0.01 * currentScrollPosition, 1);

//       verticalLineElement!.style.opacity = newOpacity.toString();
//     } else {
//       verticalLineElement!.style.opacity = "1";
//     }
//     const aboutTitleElement = document.getElementById("about-title");
//     if (scrollPosition >= scrollEnd - 200) {
//       aboutTitleElement!.style.opacity = "0";
//     } else {
//       aboutTitleElement!.style.opacity = "1";
//     }
//   };

//   const handleParagraphFade = (
//     scrollPosition: number,
//     scrollDirection: "up" | "down",
//     elementId: string
//   ) => {
//     const element = document.getElementById(elementId);
//     const scrollStart =
//       element!.getBoundingClientRect().top - 150 + scrollPosition;

//     if (scrollPosition >= scrollStart) {
//       const currentScrollPosition = scrollPosition - scrollStart;
//       const newFade =
//         scrollDirection == "down"
//           ? Math.max(1 - 0.01 * currentScrollPosition, 0)
//           : Math.min(1 - 0.01 * currentScrollPosition, 1);
//       element!.style.opacity = newFade.toString();
//     } else {
//       element!.style.opacity = "1";
//     }
//   };

//   useEffect(() => {
//     AOS.init({
//       duration: 800,
//       once: false,
//     });
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, []);
//   return (
//     <div
//       className="relative"
//       style={{ minHeight: "60vh" }}
//       id="about-section-container"
//     >
//       <div style={{ width: "100%" }} className="absolute -top-28">
//         <div className=" sticky top-10" id="about-section-title">
//           <h2
//             className="text-5xl font-bold text-center"
//             data-aos="fade-in"
//             id="about-title"
//           >
//             AN INTRODUCTION TO NEAK PANHBOTH
//           </h2>
//           <div className="flex justify-center">
//             <div
//               className="border-l border-black h-12 mt-6"
//               id="about-vertical-line"
//             ></div>
//           </div>
//         </div>
//         <div
//           className="mt-4 flex flex-col items-center w-full  text-lg font-light "
//           id="about-paragraph-container"
//         >
//           <div className="w-body text-center  gap-x-10">
//             <div id="about-paragraph-1">
//               Greetings! I'm Neak Panhboth, a dynamic 24-year-old Software
//               Engineer originating from the lively city of Phnom Penh, Cambodia.
//               My journey into the realm of technology and software development
//               reached a milestone with my graduation from The Kirirom Institute
//               of Technology in November 2022. Currently, I find myself immersed
//               in the tech scene in Kagawa Prefecture, Japan. At the heart of my
//               technical prowess lies a passion for crafting immersive and
//               user-centric digital experiences, and my expertise is particularly
//               pronounced in the domains of Flutter and React.js. Flutter, with
//               its expressive UI and cross-platform capabilities, allows me to
//               breathe life into mobile applications with a seamless and visually
//               appealing user interface. On the web development front, React.js
//               is my go-to framework for creating dynamic, responsive, and
//               interactive web interfaces.
//             </div>
//             <div className=" mt-10" id="about-paragraph-2">
//               In the ever-evolving landscape of software engineering, my
//               commitment to staying ahead of the curve is unwavering. Beyond the
//               lines of code, I bring creativity and innovation to the forefront
//               of my work. I take pride in my ability to blend technical
//               proficiency with a keen eye for design, resulting in applications
//               that not only meet functional requirements but also captivate
//               users. Collaboration is at the core of my work philosophy. I
//               believe in the power of teamwork to drive innovation and bring
//               ideas to life. My adaptability allows me to seamlessly integrate
//               into diverse teams, ensuring a harmonious working environment and
//               fostering the exchange of ideas.
//             </div>
//             <div className="  mt-10" id="about-paragraph-3">
//               As a software engineer, I am driven by the belief that technology
//               has the power to transform lives positively. My goal is to
//               contribute to this transformative journey by leveraging my skills
//               in Flutter and React.js to create exceptional digital experiences.
//               I invite you to explore my portfolio, witness the fusion of
//               creativity and technology, and join me in shaping the future of
//               software development.Feel free to connect for discussions,
//               collaboration, or simply to share your insights. Let's embark on a
//               collaborative journey where Flutter and React.js become the
//               cornerstones of extraordinary digital innovation!
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
