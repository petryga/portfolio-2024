import { gsap } from "gsap";
import { PROJECTS } from "features/work/helpers";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import classnames from "classnames";

import styles from "./WorkPage.module.css";

gsap.registerPlugin(ScrollTrigger);

const Work = () => {
  const projects: HTMLDivElement[] = gsap.utils.toArray(".project");

  projects.forEach((project) => {
    ScrollTrigger.create({
      trigger: project,
      scrub: true,
      start: "top top",
      snap: 1,
    });
  });

  return (
    <div id="workPage" className={styles.root}>
      {PROJECTS.map((project) => {
        const { id, name, date, src, link, skills } = project;
        return (
          <div key={id} className={classnames("project", styles.project)}>
            <div className={styles.info}>
              <div>{name}</div>
              <div className={styles.date}>{date}</div>
              <div>{skills}</div>
            </div>

            {link ? (
              <a href={link} target="_blank" rel="noreferrer">
                <img className={styles.image} src={src} alt={`${name} project`} />
              </a>
            ) : (
              <img className={styles.image} src={src} alt={`${name} project`} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Work;
