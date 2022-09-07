gsap.registerPlugin(ScrollTrigger);
gsap.to(".mouse-scroll", {
  alpha: 0,
  duration: 0.7,
  scrollTrigger: {
    // trigger: "body",
    scrub: 0.5,
    // start: "top top",
    end: "top+=400px top",
  }
})
const canvas = document.getElementById("intro-video");
const context = canvas.getContext("2d");
// canvas.width = 1208;
// canvas.height = 600;

const frameCount = 140;
const currentFrame = (index) =>
  `../assets/videos/home/frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

let img = new Image();
img.onload = function () {
  canvas.height = img.height;
  canvas.width = img.width;
};
img.src = currentFrame(0);

const images = [];
const airpods = {
  frame: 0,
};

for (let i = 0; i < frameCount; i++) {
  const img = new Image();
  img.src = currentFrame(i);
  images.push(img);
}

gsap.set("main nav, main section", {
  alpha: 0
});
const tl = gsap.timeline();
tl.to(airpods, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 1.5,//0.5,
    // markers: true,
    end: "bottom bottom+=200px"
  },
  onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
})
  .to(canvas, {
    alpha: 0,
    duration: 1,
    scrollTrigger: {
      scrub: true,
      // markers: true,
      trigger: "body",
      start: "bottom bottom+=600px",
      end: "bottom bottom-=30px",
      toggleActions: "play reverse play reverse"
      // end: "bottom bottom+=200px"
    }
  })
  .to("main nav, main section", {
    alpha: 1,
    duration: 2,
    stagger: 0.6,
    scrollTrigger: {
      scrub: true,
      trigger: "body",
      start: "bottom bottom+=600px",
      end: "bottom bottom-=30px",
      toggleActions: "play reverse play reverse"
    }
  })

images[0].onload = render;
document.addEventListener("DOMContentLoaded", () => {
  render();
})
function render() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.drawImage(images[airpods.frame], 0, 0);
}