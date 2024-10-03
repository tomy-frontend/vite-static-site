import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

// 下からフェードイン
document.addEventListener("DOMContentLoaded", () => {
  const fadeInElements = document.querySelectorAll(".jsfadeIn");

  if (fadeInElements.length > 0) {
    fadeInElements.forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          // scrub: true,
          // markers: true, // デバッグ用マーカー
        },
        duration: 1,
        opacity: 0,
        y: 50,
        ease: "power1.out",
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const fadeInLeftElements = document.querySelectorAll(".jsfadeInLeft");

  // .jsfadeInLeft 要素が存在する場合のみ処理を実行
  if (fadeInLeftElements.length > 0) {
    fadeInLeftElements.forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          // scrub: true,
          // markers: true, // デバッグ用マーカー
        },
        duration: 1,
        opacity: 0,
        x: -50,
        ease: "power1.out",
      });
    });
  }
});

// 右からフェードイン
document.addEventListener("DOMContentLoaded", () => {
  const fadeInRightElements = document.querySelectorAll(".jsfadeInRight");

  if (fadeInRightElements.length > 0) {
    fadeInRightElements.forEach((element) => {
      gsap.from(element, {
        scrollTrigger: {
          trigger: element,
          start: "top 90%",
          end: "bottom 60%",
          toggleActions: "play none none none",
          // markers: true, // デバッグ用マーカー
        },
        duration: 1,
        opacity: 0,
        x: 50,
        ease: "power1.out",
      });
    });
  }
});

// 拡大から縮小
document.addEventListener("DOMContentLoaded", () => {
  const jsScaleElements = document.querySelectorAll(".jsScale");

  if (jsScaleElements.length > 0) {
    jsScaleElements.forEach((jsScale) => {
      gsap.fromTo(
        jsScale,
        { scale: 1.2 },
        {
          scrollTrigger: {
            trigger: jsScale,
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none none",
            once: true,
            // markers: true, // デバッグ用マーカー
          },
          scale: 1,
          ease: "power1.out",
          duration: 2.0,
        }
      );
    });
  }
});
