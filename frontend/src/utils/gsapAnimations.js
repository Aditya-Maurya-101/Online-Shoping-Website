import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Hero text animation - Letter by letter reveal
export const animateHeroText = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((element) => {
    const text = element.innerText;
    element.innerHTML = text
      .split('')
      .map((char) => `<span class="letter">${char === ' ' ? '&nbsp;' : char}</span>`)
      .join('');

    gsap.fromTo(
      `${selector} .letter`,
      {
        opacity: 0,
        y: 20,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'power2.out',
      }
    );
  });
};

// Fade in and scale animation
export const animateFadeInScale = (selector, delay = 0) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      scale: 0.8,
      y: 30,
    },
    {
      opacity: 1,
      scale: 1,
      y: 0,
      duration: 0.8,
      delay,
      ease: 'back.out',
    }
  );
};

// Slide in from left animation
export const animateSlideInLeft = (selector, delay = 0) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      x: -60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    }
  );
};

// Slide in from right animation
export const animateSlideInRight = (selector, delay = 0) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      x: 60,
    },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      delay,
      ease: 'power2.out',
    }
  );
};

// Staggered list animation
export const animateStaggerList = (selector) => {
  gsap.fromTo(
    `${selector} > *`,
    {
      opacity: 0,
      y: 20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
    }
  );
};

// Scroll trigger fade in
export const animateOnScroll = (selector, options = {}) => {
  gsap.fromTo(
    selector,
    {
      opacity: 0,
      y: 50,
      ...options.from,
    },
    {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: selector,
        start: 'top 80%',
        end: 'top 20%',
        scrub: false,
        markers: false,
        ...options.scrollTrigger,
      },
      ...options.to,
    }
  );
};

// Floating animation
export const animateFloat = (selector) => {
  gsap.to(selector, {
    y: -20,
    duration: 2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
};

// Counter animation
export const animateCounter = (selector, endValue, duration = 2) => {
  const obj = { value: 0 };
  gsap.to(obj, {
    value: endValue,
    duration,
    onUpdate: () => {
      document.querySelector(selector).innerText = Math.floor(obj.value);
    },
  });
};

// Parallax animation
export const animateParallax = (selector, speed = 0.5) => {
  gsap.fromTo(
    selector,
    {},
    {
      y: (i, target) => {
        return window.innerHeight - target.offsetTop + (speed * 300);
      },
      scrollTrigger: {
        trigger: selector,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        markers: false,
      },
    }
  );
};

// Hover animation
export const setupHoverAnimation = (selector, options = {}) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      gsap.to(el, {
        scale: options.scale || 1.05,
        duration: 0.3,
        ease: 'power2.out',
        ...options.onHover,
      });
    });

    el.addEventListener('mouseleave', () => {
      gsap.to(el, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
        ...options.onLeave,
      });
    });
  });
};

// Number increment animation with scroll trigger
export const animateNumberOnScroll = (selector) => {
  const element = document.querySelector(selector);
  if (!element) return;

  const endValue = parseInt(element.innerText);
  const obj = { value: 0 };

  gsap.to(obj, {
    value: endValue,
    duration: 2,
    onUpdate: () => {
      element.innerText = Math.floor(obj.value);
    },
    scrollTrigger: {
      trigger: selector,
      start: 'top 80%',
      onEnter: () => {
        gsap.to(obj, {
          value: endValue,
          duration: 2,
          onUpdate: () => {
            element.innerText = Math.floor(obj.value);
          },
        });
      },
      once: true,
    },
  });
};
