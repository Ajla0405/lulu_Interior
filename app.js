import "https://flackr.github.io/scroll-timeline/dist/scroll-timeline.js";

const scrollTracker = document.querySelector(".scroll-tracker");


const scrollTrackingTimeline = new ScrollTimeline({
  source: document.scrollingElement,
  orientation: "block",
  scrollOffsets: [CSS.percent(0), CSS.percent(100)],
});



scrollTracker.animate(
  {
    transform: ["scaleX(0)", "scaleX(1)"],
  },
  {
    duration: 1,
    timeline: scrollTrackingTimeline,
  }
);



document.addEventListener("DOMContentLoaded", () => {
  const slideshows = document.querySelectorAll('[data-component="slideshow"]');

  slideshows.forEach(initSlideShow);

  function initSlideShow(slideshow) {
    const slides = slideshow.querySelectorAll('[role="list"] .slide');
    const dotContainer = document.createElement("div");
    dotContainer.classList.add("dot-container");
    slideshow.appendChild(dotContainer);
    let index = 0;
    const time = 5000;

    slides[index].classList.add("active");
    createDots();

    const interval = setInterval(showNextSlide, time);

    function showNextSlide() {
      slides[index].classList.remove("active");
      index = (index + 1) % slides.length;
      slides[index].classList.add("active");
      updateDots();
    }

    function showPrevSlide() {
      slides[index].classList.remove("active");
      index = (index - 1 + slides.length) % slides.length;
      slides[index].classList.add("active");
      updateDots();
    }

    function createDots() {
      slides.forEach((slide, i) => {
        const dot = document.createElement("span");
        dot.classList.add("dot");
        dot.setAttribute("data-index", i);
        dot.addEventListener("click", () => {
          clearInterval(interval);
          goToSlide(i);
        });
        dotContainer.appendChild(dot);
      });
      updateDots();
    }

    function updateDots() {
      const dots = dotContainer.querySelectorAll(".dot");
      dots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add("active");
        } else {
          dot.classList.remove("active");
        }
      });
    }

    function goToSlide(idx) {
      slides[index].classList.remove("active");
      index = idx;
      slides[index].classList.add("active");
      updateDots();
    }
  }
});


document.addEventListener("DOMContentLoaded", function() {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (entry.boundingClientRect.top > 0) {
          entry.target.classList.add('reveal', 'h2-animation');
        } else {
          entry.target.classList.add('reveal-up', 'p-animation');
        }
      } else {
        entry.target.classList.remove('reveal', 'reveal-up', 'h2-animation', 'p-animation');
      }
    });
  }, observerOptions);

  document.querySelectorAll('.main-quotes span').forEach(span => {
    observer.observe(span);
  });
});
