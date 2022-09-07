gsap.registerPlugin(ScrollTrigger);
// gsap.fromTo("#about h2, #about p", {
//   y: 10,
//   duration: 1,
// }, {
//   y: 0
// })
gsap.to("#s2 > div", {
  y: "30%",
  ease: "none",
  duration: 1,
  scrollTrigger: {
    scrub: true,
    trigger: "#s2",
    start: "top bottom",
    end: "bottom top-=30%",
    markers: true,
  }
})