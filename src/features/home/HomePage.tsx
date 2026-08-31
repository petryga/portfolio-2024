import { useContext, useEffect, useState } from "react";
import { PAGE_OPTIONS, PageNames } from "utils/urls";
import { gsap } from "gsap";
import { DataContext } from "utils/context";
import GoBackButton from "components/goBackButton/GoBackButton";
import {
  changeLiColor,
  handleGoBack,
  handleMouseEnter,
  handleMouseLeaveAll,
} from "./helpers";
import WorkPage from "features/work/WorkPage";
import AboutPage from "features/about/AboutPage";
import classnames from "classnames";
import { useMediaQuery } from "react-responsive";
import useImagePreloader from "features/work/hooks";
import { PROJECTS } from "features/work/helpers";

import styles from "./HomePage.module.css";

export const HomePage = (): JSX.Element => {
  const { isFirstClickDone, setIsFirstClickDone } = useContext(DataContext);
  const { imagesPreloaded } = useImagePreloader(PROJECTS);
  const [page, setPage] = useState("");
  const is1000 = useMediaQuery({ query: "(max-width: 1000px)" });
  const isTablet = useMediaQuery({ query: "(max-width: 900px)" });
  const is800 = useMediaQuery({ query: "(max-width: 800px)" });
  const is635 = useMediaQuery({ query: "(max-width: 635px)" });
  const isMobile = useMediaQuery({ query: "(max-width: 600px)" });
  const is360 = useMediaQuery({ query: "(max-width: 360px)" });

  let liFontSize = "7rem";
  if (is1000) {
    liFontSize = "6rem";
  }

  //first click
  useEffect(() => {
    if (imagesPreloaded && !!page && !isFirstClickDone) {
      const timeline = gsap.timeline();
      if (!isMobile) {
        timeline
          .to("li", {
            fontWeight: 300,
            color: "#444",
            fontSize: liFontSize,
          })
          .to(
            `li#${page}`,
            {
              color: "#fff",
            },
            "<"
          )
          .to(
            "#home",
            {
              duration: 0.6,
              ease: "power1.inOut",
              scaleX: 0.5,
              x: "-50%",
              textAlign: "center",
              left: "50%",
              onComplete: () => {
                setIsFirstClickDone(true);
              },
            },
            "<"
          )
          .fromTo(
            `#${page}Page`,
            { opacity: 0, x: 1500 },
            { opacity: 1, x: 0, duration: 0.6, ease: "power1.inOut" }
          );
      } else {
        timeline
          .to("#name", {
            duration: 0.4,
            ease: "power1.inOut",
            x: -1000,
            opacity: 0,
            scaleX: 0.5,
          })
          .to("#home", {
            duration: 0.4,
            ease: "power1.inOut",
            x: -1000,
            opacity: 0,
            onComplete: () => {
              setIsFirstClickDone(true);
            },
          })
          .fromTo(
            `#${page}Page`,
            { opacity: 0, x: 1000 },
            { opacity: 1, x: 0, duration: 0.4, ease: "power1.inOut" }
          );
      }
    }
  }, [
    imagesPreloaded,
    isFirstClickDone,
    isMobile,
    liFontSize,
    page,
    setIsFirstClickDone,
  ]);

  // between pages
  useEffect(() => {
    if (!isMobile && !!page && isFirstClickDone) {
      const timeline = gsap.timeline();
      timeline.set(`#${page}Page`, { opacity: 0, x: 0 }).to(`#${page}Page`, {
        opacity: 1,
        duration: 1.5,
      });
    }
  }, [isFirstClickDone, isMobile, page]);

  // mobile - initial loading
  useEffect(() => {
    if (imagesPreloaded && isMobile && !isFirstClickDone) {
      const timeline = gsap.timeline();
      timeline
        .fromTo(
          "#name",
          {
            duration: 0.4,
            ease: "power1.inOut",
            x: -1000,
            opacity: 1,
          },
          { opacity: 1, x: 0 }
        )
        .fromTo(
          "#home",
          {
            duration: 0.4,
            ease: "power1.inOut",
            x: -1000,
          },
          { opacity: 1, x: "-50%" }
        );
    }
  }, [imagesPreloaded, isFirstClickDone, isMobile]);

  const handleGoBackCallback = () => {
    setPage("");
    setIsFirstClickDone(false);
  };

  if (!imagesPreloaded) {
    return <div className={styles.loading}>...</div>;
  }

  return (
    <div className={styles.root}>
      {isMobile && !isFirstClickDone && (
        <div id="name" className={styles.name}>
          alexandra petryga
        </div>
      )}
      <div className={classnames({ [styles.sidebar]: !isMobile })}>
        <GoBackButton
          handleGoBackCallback={handleGoBackCallback}
          page={page}
          isMobile={isMobile}
        />
        <ul
          id="home"
          className={classnames(styles.ul, {
            [styles.notMobileUl]: !isMobile,
          })}
          onMouseLeave={() => {
            if (!isTablet && !page) handleMouseLeaveAll();
          }}
        >
          {PAGE_OPTIONS.map((option) => {
            const { text } = option;
            const isActiveLi = page === text;
            return (
              <li
                key={text}
                id={text}
                className={classnames({
                  [styles.pageLi]: !isMobile && !!page,
                })}
                onClick={() => {
                  setPage(text);
                  if (page && isActiveLi) {
                    handleGoBack(
                      page,
                      handleGoBackCallback,
                      isMobile,
                      is1000,
                      is800,
                      is635,
                      is360
                    );
                  }
                  if (page && !isActiveLi) {
                    changeLiColor(page);
                  }
                }}
                onMouseEnter={(e: React.MouseEvent<any, MouseEvent>) => {
                  const id = (e.target as HTMLAnchorElement)?.id;
                  if (!isTablet && !page && id) handleMouseEnter(id);
                }}
              >
                {text}
              </li>
            );
          })}
        </ul>
      </div>

      <div className={styles.page}>
        {page === PageNames.ABOUT && <AboutPage />}
        {page === PageNames.WORK && <WorkPage />}
      </div>
    </div>
  );
};
