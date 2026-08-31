import { useCallback, useContext, useEffect, useState } from "react";
import { DataContext } from "utils/context";
import { GoBackButtonProps } from "./GoBackButton.types";
import { handleGoBack } from "features/home/helpers";
import { gsap } from "gsap";
import classnames from "classnames";
import { PageNames } from "utils/urls";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import debounce from "lodash/debounce";

import styles from "./GoBackButton.module.css";

gsap.registerPlugin(ScrollTrigger);

const GoBackButton = ({
  handleGoBackCallback,
  page,
  isMobile,
}: GoBackButtonProps) => {
  const { isFirstClickDone } = useContext(DataContext);
  const [isMobileGoBackClicked, setIsMobileGoBackClicked] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const shouldScroll = isMobile && page === PageNames.WORK && !isScrolling;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedScroll = useCallback(
    debounce((nextValue: boolean) => {
      setIsScrolling(nextValue);
    }, 200),
    []
  );

  // back to home
  useEffect(() => {
    if (isMobile && isMobileGoBackClicked) {
      gsap.fromTo(
        "#goBackButtonMobile",
        { opacity: 1, x: 0 },
        { opacity: 0, x: 1000, duration: 0.4, ease: "power1.inOut" }
      );
    }
  }, [isMobileGoBackClicked, isMobile]);

  // from home to pages
  useEffect(() => {
    if (isMobile && isFirstClickDone) {
      gsap.fromTo(
        "#goBackButtonMobile",
        { opacity: 0, x: 1000 },
        { opacity: 1, x: 0 }
      );
    }
  }, [isFirstClickDone, isMobile]);

  shouldScroll &&
    ScrollTrigger.addEventListener("scrollStart", () => {
      setIsScrolling(true);
    });

  shouldScroll &&
    ScrollTrigger.addEventListener("scrollEnd", () => {
      debouncedScroll(false);
    });

  // mobile - hide back button when scrolling
  useEffect(() => {
    if (isMobile && page === PageNames.WORK && isFirstClickDone) {
      if (isScrolling) {
        gsap.fromTo("#goBackButtonMobile", { opacity: 1 }, { opacity: 0 });
      } else {
        gsap.fromTo("#goBackButtonMobile", { opacity: 0 }, { opacity: 1 });
      }
    }
  }, [isFirstClickDone, isMobile, isScrolling, page]);

  return (
    <>
      <div className={styles.goBackButton}>
        <button
          onClick={() => {
            if (isFirstClickDone)
              handleGoBack(page, handleGoBackCallback, isMobile);
          }}
        >
          alexandra petryga
        </button>
      </div>

      {isFirstClickDone && isMobile && page && (
        <div
          className={classnames(styles.mobile, {
            [styles.work]: page === PageNames.WORK,
            [styles.about]: page === PageNames.ABOUT,
          })}
          id="goBackButtonMobile"
        >
          <button
            onClick={() => {
              handleGoBack(page, handleGoBackCallback, isMobile);
              setIsMobileGoBackClicked(true);
            }}
          >
            back
          </button>
        </div>
      )}
    </>
  );
};

export default GoBackButton;
