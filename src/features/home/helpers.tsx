import { gsap } from "gsap";

export const handleMouseLeaveAll = () => {
  const tl = gsap.timeline();
  tl.to("li", {
    fontWeight: 900,
    duration: 0.2,
    ease: "power1.inOut",
  });
};

export const handleMouseEnter = (id: string) => {
  const tl = gsap.timeline();
  tl.to(`#${id}`, { fontWeight: 300, duration: 0.2, ease: "power1.inOut" });
};

export const handleGoBack = (
  page: string,
  handleGoBackCallback: () => void,
  isMobile: boolean,
  is1000?: boolean,
  is800?: boolean,
  is635?: boolean,
  is360?: boolean
) => {
  const timeline = gsap.timeline();

  let homeFontSize = "10rem";

  if (is1000) {
    homeFontSize = "8rem";
  }
  if (is800) {
    homeFontSize = "6rem";
  }
  if (is635) {
    homeFontSize = "5.5rem";
  }
  if (is360) {
    homeFontSize = "5rem";
  }

  if (!isMobile) {
    timeline
      .fromTo(
        `#${page}Page`,
        { opacity: 1, x: 0 },
        { opacity: 0, x: 1500, duration: 0.6, ease: "power1.inOut" }
      )
      .to("#home", {
        duration: 0.5,
        ease: "power1.inOut",
        x: 0,
        left: "50%",
        textAlign: "left",
        scaleX: 1.5,
      })
      .to(
        "li",
        {
          fontSize: homeFontSize,
          color: "#fff",
          fontWeight: 900,
          onComplete: handleGoBackCallback,
        },
        "<"
      );
  } else {
    timeline.fromTo(
      `#${page}Page`,
      { opacity: 1, x: 1 },
      {
        opacity: 0,
        x: 1000,
        duration: 0.3,
        ease: "power1.inOut",
        onComplete: handleGoBackCallback,
      }
    );
  }
};

export const changeLiColor = (page: string) => {
  const otherPage = page === "about" ? "work" : "about";
  const timeline = gsap.timeline();
  timeline
    .to(`li#${page}`, {
      color: "#444",
    })
    .to(
      `li#${otherPage}`,
      {
        color: "#fff",
      },
      "<"
    );
};
