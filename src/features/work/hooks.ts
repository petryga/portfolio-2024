import { useEffect, useState } from "react";
import { ProjectProps } from "./WorkPage.types";

function preloadImage(src: string) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = function () {
      resolve(img);
    };
    img.onerror = img.onabort = function () {
      reject(src);
    };
    img.src = src;
  });
}

export default function useImagePreloader(projects: ProjectProps[]) {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  const imageList = projects.map((project) => project.src);

  useEffect(() => {
    let isCancelled = false;

    async function effect() {
      // console.log("PRELOAD");

      if (isCancelled) {
        return;
      }

      const imagesPromiseList: Promise<any>[] = [];
      for (const img of imageList) {
        imagesPromiseList.push(preloadImage(img));
      }

      await Promise.all(imagesPromiseList);

      if (isCancelled) {
        return;
      }

      setImagesPreloaded(true);
    }

    effect();

    return () => {
      isCancelled = true;
    };
  }, [imageList]);

  return { imagesPreloaded };
}
