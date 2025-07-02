console.log("JS file is loaded!");


const createAnimation = ({
  duration = 21,
  reversed = false,
  target,
  text,
  textProperties
}) => {
  const pathId = `path-${gsap.utils.random(100000, 999999, 1)}`;
  const props = { duration, ease: "none", repeat: -1 };

  gsap.set(target.querySelector("path"), {
    attr: { fill: "none", id: pathId, stroke: "none" }
  });

  target.insertAdjacentHTML(
    "beforeend",
    `
      <text>
        <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
        <textPath href='#${pathId}' startOffset="0%">${text}</textPath>
      </text>
      `
  );

  if (textProperties) {
    gsap.set(target.querySelectorAll("textPath"), textProperties);
  }

   gsap.registerPlugin(ScrollTrigger);

  gsap.fromTo(".photo-gallery",
    { opacity: 0, y: 100 },
    {
      opacity: 1,
      y: 0,
      ease: "power2.out",
      scrollTrigger: {
        trigger: ".work-section",
        start: "top 70%",
        end: "bottom 20%",
        scrub: true
      }
    }
  );
  gsap.fromTo(
    target.querySelectorAll("textPath")[0],
    { attr: { startOffset: "0%" } },
    { attr: { startOffset: reversed ? "-100%" : "100%" }, ...props }
  );
  gsap.fromTo(
    target.querySelectorAll("textPath")[1],
    { attr: { startOffset: reversed ? "100%" : "-100%" } },
    { attr: { startOffset: "0%" }, ...props }
  );
};

document.addEventListener("DOMContentLoaded", () =>  createAnimation({
  duration: 21,
  reversed: true,
  target: document.querySelector(".ellipse svg"),
  text: "○ it was fun while it lasted ○ plnski ○ it was fun while it lasted ○ plnski",
  textProperties: {
    fontSize: /iPhone/.test(navigator.userAgent) ? "19px" : "17px"
  }
})
);