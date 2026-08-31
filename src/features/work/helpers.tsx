import img1 from "assets/1.jpeg";
import img2 from "assets/2.jpeg";
import img3 from "assets/3.jpeg";
import img4 from "assets/4.jpeg";
import img5 from "assets/5.jpeg";
import img6 from "assets/6.jpeg";
import img7 from "assets/7.jpeg";
import img9 from "assets/9.jpeg";
import img10 from "assets/10.jpg";

import { ProjectProps } from "features/work/WorkPage.types";

// Retired bootcamp projects keep an empty `link` — the card still renders,
// but WorkPage skips the wrapping <a> when there's no URL.
export const PROJECTS: ProjectProps[] = [
  {
    id: "ten",
    name: "drag & drop job application tracker",
    date: 2023,
    src: img10,
    link: "https://job-tracker-ibdv.onrender.com/",
    skills:
      "Node.js • Express • MongoDB • JWT • React • Typescript • RTK Query • Redux",
  },
  {
    id: "nine",
    name: "goveyance",
    date: "2022-present",
    src: img9,
    link: "https://goveyance.com",
    skills: "React • Typescript • RTK Query • Redux",
  },
  {
    id: "seven",
    name: "portfolio v.2",
    date: 2021,
    src: img7,
    link: "https://petryga.github.io/portfolio-2021/",
    skills: "Javascript",
  },
  {
    id: "six",
    name: "readywhen",
    date: 2022,
    src: img6,
    link: "https://www.readywhen.com",
    skills: "React • Typescript • Redux",
  },
  {
    id: "five",
    name: "portfolio v.1",
    date: 2020,
    src: img5,
    link: "https://petryga.github.io/portfolio-2020/",
    skills: "Javascript",
  },
  {
    id: "four",
    name: "film buff",
    date: 2020,
    src: img4,
    link: "",
    skills: "React • Firebase • API",
  },
  {
    id: "three",
    name: "travel from home",
    date: 2020,
    src: img3,
    link: "",
    skills: "React • Firebase • JavaScript • API",
  },
  {
    id: "two",
    name: "medieval art & dad jokes gallery",
    date: 2020,
    src: img2,
    link: "",
    skills: "JavaScript • 2 APIs • SCSS",
  },
  {
    id: "one",
    name: "toronto / vancouver skyline",
    date: 2020,
    src: img1,
    link: "",
    skills: "jQuery • SCSS",
  },
];
