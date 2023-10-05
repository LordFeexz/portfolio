import { useEffect } from "react";
import { useHover } from "@uidotdev/usehooks";
import { animate, spring, type AnimationOptionsWithOverrides } from "motion";
import view from "../utils/in-view";

export default function useNavbar() {
  const theme = {
    defaultBackground: "rgba(236, 254, 255, 0.40)",
    darkBlueNavbarBackground: "rgba(62, 148, 229, 0.10)",
    darkRedNavbarBackground: "rgba(232, 85, 121, 0.10)",
    textLightColor: "rgba(236, 254, 255, 1)",
    textDarkColor: "rgba(21, 94, 117, 1)",
    textRedColor: "rgba(190, 18, 60, 1)",
  };

  const [navRef, isHover] = useHover();

  useEffect(() => {
    const nav = document.querySelector("#nav");
    const navPointer = nav?.querySelector(".nav-pointer");

    const animateOption = {
      duration: 0.5,
      easing: [0.17, 0.55, 0.55, 1],
    } satisfies AnimationOptionsWithOverrides;

    let active = nav?.querySelector(".active");
    let animating = false;

    function clearActive() {
      nav
        ?.querySelectorAll(".active")
        .forEach((tab) => tab.classList.remove("active"));
    }

    async function activated(
      pointer: Element | null,
      active: any,
      toAnimate = true,
      event = "scroll"
    ) {
      if (animating && event === "scroll") return;

      if (active === null) {
        clearActive();
        animate(pointer as Element, { opacity: 0 }, animateOption);
        return;
      }

      if (event !== "click") {
        nav?.querySelector(".active")?.classList?.remove("active");
        active.classList.add("active");
      }

      let { width } = active.getBoundingClientRect();

      const { finished } = animate(
        pointer as Element,
        {
          opacity: 1,
          height: `${active.offsetHeight}px`,
          width: `${Math.floor(width)}px`,
          top: `${active.offsetTop}px`,
          left: `${active.offsetLeft}px`,
        },
        !toAnimate
          ? {}
          : {
              easing: spring({
                damping: 20,
                stiffness: 300,
              }),
            }
      );

      finished.then(() => {
        animating = false
      })
    }

    view(
      document.querySelector("#header") as Element,
      () => {
        animate(
          nav as Element,
          {
            backgroundColor: theme.defaultBackground,
            color: theme.textDarkColor,
            opacity: 1,
          },
          animateOption
        );
        activated(navPointer as Element, null);
      },
      { amount: "all" }
    );

    view(document.querySelector('#projects') as Element,() => {
      animate(nav as Element,{ backgroundColor:theme. defaultBackground, color:theme. textDarkColor, opacity: 1 },animateOption)
    },)

    view(document.querySelector('#project-hackpark') as Element,() => {
      animate(nav as Element, { backgroundColor:theme. defaultBackground, color:theme. textDarkColor, opacity: 1 }, animateOption);
      activated(navPointer as Element, document.querySelector('a[href="#projects"]'));
    })

    view(document.querySelector('#project-forumGamers') as Element,() => {
      animate(nav as Element, { backgroundColor:theme. darkRedNavbarBackground, color:theme. textRedColor, opacity: 1 }, animateOption);
      activated(navPointer as Element, document.querySelector('a[href="#projects"]'));
    })

    view(document.querySelector("#work-indofund") as Element, () => {
      animate(nav as Element, { backgroundColor:theme. darkBlueNavbarBackground, color:theme. textLightColor, opacity: 1 }, animateOption);
      activated(navPointer as Element, document.querySelector('a[href="#work-experiences"]'));
    })

    view(document.querySelector("#work-experiences") as Element, () => {
      animate(nav as Element, { backgroundColor:theme. darkBlueNavbarBackground, color:theme. textLightColor, opacity: 1 }, animateOption);
      activated(navPointer as Element, document.querySelector('a[href="#work-experiences"]'));
    });

    view(document.querySelector("#contact") as Element, () => {
      animate(nav as Element, { opacity: 0 }, animateOption);
      activated(navPointer as Element, document.querySelector('a[href="#contact"]'));
    });

    nav?.querySelectorAll(".nav-item").forEach((tab: any) => {
      tab.onclick = () => {
        animating = true;
        clearActive();
        tab.classList.add("active");
        active = tab;
        activated(navPointer as Element, tab, true, "click");
      };
    });

  }, []);

  return [
    navRef,
    isHover
      ? "0px 0px 0px 0px rgba(0, 0, 0, 0.10), 0px 3px 6px 0px rgba(0, 0, 0, 0.10), 0px 12px 12px 0px rgba(0, 0, 0, 0.09), 0px 26px 16px 0px rgba(0, 0, 0, 0.05), 0px 46px 19px 0px rgba(0, 0, 0, 0.01), 0px 73px 20px 0px rgba(0, 0, 0, 0.00)"
      : "0px 4px 10px 0px rgba(0, 0, 0, 0.03)",
  ];
}
