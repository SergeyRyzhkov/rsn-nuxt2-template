const loadClassesName = ["loading-image"];

const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0.1,
};

let observer = {
  observe(_target: HTMLElement) {},
};

if (process.client) {
  observer = new IntersectionObserver((images, observer) => {
    images.forEach((iter) => {
      if (iter.isIntersecting) {
        const lazyImg = iter.target;
        if (!!lazyImg) {
          lazyImg.setAttribute("src", lazyImg.getAttribute("data-src") || "");

          const onLoaded = () => {
            lazyImg.setAttribute("data-loaded", "true");
            lazyImg.removeAttribute("data-src");
            lazyImg.classList.remove(...loadClassesName);
          };

          lazyImg.addEventListener("load", onLoaded);
          lazyImg.addEventListener("loadeddata", onLoaded);
        }
        observer.unobserve(lazyImg);
      }
    });
  }, options);
}

export const observe = (target: HTMLElement) => {
  target.classList.add(...loadClassesName);
  observer.observe(target);
};
