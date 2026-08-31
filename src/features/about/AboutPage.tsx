import {
  CONTACT_INFO,
  handleAboutHoverIn,
  handleAboutHoverOut,
} from "./helpers";
import skills from "assets/skills.svg";

import styles from "./AboutPage.module.css";

const AboutPage = () => {
  return (
    <div id="aboutPage" className={styles.aboutPage}>
      <h1>About Me</h1>
      <div className={styles.text}>
        <p>
          I work with forward-thinking people to design and build interactive,
          accessible websites and applications. I aim high and I love challenge.
          <br /> <br />
          The process is simple. Have a wild idea; reach out to me to discuss
          your requirements; see your idea come to life.
        </p>
        {CONTACT_INFO.map((info, i) => {
          const { text, id, href } = info;
          return (
            <div
              key={id}
              onMouseEnter={(e) => {
                handleAboutHoverIn(id);
              }}
              onMouseLeave={() => {
                handleAboutHoverOut(id);
              }}
            >
              <div id={id} className={styles.link}>
                <a href={href} target="_blank" rel="noreferrer">
                  {text}
                </a>
              </div>
            </div>
          );
        })}
      </div>
      <div className={styles.circle}>
        <img src={skills} alt="skills text rotating circle" />
      </div>
    </div>
  );
};
export default AboutPage;
