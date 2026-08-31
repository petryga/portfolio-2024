import { gsap } from "gsap";

export const CONTACT_INFO = [
  {
    id: "one",
    text: "email",
    href: "mailto:hello@petryga.com",
  },
  {
    id: "two",
    text: "linkedin",
    href: "https://www.linkedin.com/in/petryga/",
  },
  {
    id: "three",
    text: "github",
    href: "https://github.com/petryga",
  },
];

export const handleAboutHoverIn = (id: string) => {
  const tl2 = gsap.timeline();

  tl2.to(`#${id}`, {
    scaleX: 0.8,
    transformOrigin: "center left",
    duration: 0.3,
    ease: "power1.inOut",
    fontWeight: 500,
  });
};

export const handleAboutHoverOut = (id: string) => {
  const tl2 = gsap.timeline();

  tl2.to(`#${id}`, {
    scaleX: 1,
    duration: 0.3,
    ease: "power1.inOut",
    fontWeight: 700,
  });
};
