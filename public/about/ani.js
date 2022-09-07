gsap.registerPlugin(ScrollTrigger);
document.querySelectorAll("section:not(#about)").forEach(section => {
  gsap.to(section, {
    backgroundColor: "rgb(205,205,205)",
    color: "#323",
    duration: 0.4,
    scrollTrigger: {
      trigger: section,
      start: "center+=80px bottom",
      end: "top+=80px top",
      toggleActions: "play reverse play reverse"
    }
  })
})
document.addEventListener("DOMContentLoaded", () => {
  ScrollTrigger.matchMedia({
    "(max-width: 700px)": function () {

      gsap.set("#about p:not(:first-child)", { alpha: 0 });
      document.querySelectorAll("#about p:not(:first-child)").forEach((p, i) => {
        gsap.to(p, {
          duration: 1,
          alpha: 1,
          scrollTrigger: {
            trigger: "#about",
            start: `top+=${10 + i * 160}px top`,
            end: "bottom center"
          }
        })
      })
    }
  })
})