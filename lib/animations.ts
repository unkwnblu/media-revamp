import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function fadeInUp(element: Element, delay = 0) {
  return gsap.fromTo(
    element,
    { opacity: 0, y: 60 },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay,
      ease: "power3.out",
    }
  );
}

export function staggerFadeIn(elements: Element[], stagger = 0.15) {
  return gsap.fromTo(
    elements,
    { opacity: 0, y: 40 },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger,
      ease: "power2.out",
    }
  );
}

export function textReveal(element: Element) {
  const words = element.querySelectorAll(".word");
  if (words.length > 0) {
    return gsap.fromTo(
      words,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.out",
      }
    );
  }
  return gsap.fromTo(
    element,
    { opacity: 0, y: 40 },
    { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
  );
}

export function parallaxScroll(element: Element, speed = 0.5) {
  return gsap.to(element, {
    yPercent: -20 * speed,
    ease: "none",
    scrollTrigger: {
      trigger: element,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });
}

export function horizontalScroll(
  container: HTMLElement,
  scrollElement: HTMLElement
) {
  const scrollWidth = scrollElement.scrollWidth;
  const viewWidth = container.offsetWidth;

  return gsap.to(scrollElement, {
    x: -(scrollWidth - viewWidth),
    ease: "none",
    scrollTrigger: {
      trigger: container,
      start: "top top",
      end: () => `+=${scrollWidth - viewWidth}`,
      scrub: 1,
      pin: true,
    },
  });
}

export function killScrollTriggers() {
  ScrollTrigger.getAll().forEach((t) => t.kill());
}
