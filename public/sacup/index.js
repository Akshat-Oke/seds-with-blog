gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    return gsap.timeline().fromTo(targets, {
      duration: config.duration,
      alpha: 0,
      // duration: 0.1
    }, {
      stagger: config.stagger,
      alpha: 1
    }).to(targets, {
      stagger: config.stagger,
      alpha: 0,
      // duration: 0.1
    }, "+=0.2");
  },
  defaults: { duration: 0.5 },
  extendTimeline: true
});
// gsap.fromTo(".mouse-scroll", {
//   alpha: 0,
//   duration: 0.1,
//   scrollTrigger: {
//     // trigger: "body",
//     markers: true,
//     scrub: 0.5,
//     // start: "top top",
//     // end: "top+=400px top",
//     start: "bottom-=400px bottom",
//     end: "bottom+=100px bottom"
//   }
// }, {
//   alpha: 1
// })
// gsap.fromTo(".mouse-scroll", {
//   alpha: 0,
//   duration: 0.7,
//   scrollTrigger: {
//     // trigger: "body",
//     markers: true,
//     scrub: 0.5,
//     start: "bottom bottom+=200px",
//     end: "bottom bottom",
//   }
// }, {
//   alpha: 1
// })
gsap.timeline({
  defaults: { duration: 1.2 },
  scrollTrigger: {
    trigger: "#sacup",
    // markers: true,
    scrub: true,
    start: "top 50%",
    end: "bottom+=100px top",
    pin: true
  }
})
  .fromTo("#sacup", { y: "-200px" }, { y: "-250px" })
  .from("#sacup", { alpha: 1, duration: 0.4 }, 0)
  .to("#sacup", { alpha: 0, duration: 0.6 }, 0.8)


// Video
const canvas = document.getElementById("video");
const context = canvas.getContext("2d");
// canvas.width = 1208;
// canvas.height = 600;

const frameCount = 215;
const currentFrame = (index) =>
  `../assets/videos/sacup/frame-${(frameCount - index).toString().padStart(3, "0")}.jpg`;

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
images[frameCount - 1].onload = function () {
  render(frameCount - 1);
  positionLabels();
  scrollBottom();
};
function render(frame) {
  try {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[frame ?? airpods.frame], 0, 0);
  }
  catch (e) {
    console.log(e);
  }
}
function video1() {
  const renderTimeline = gsap.timeline();
  renderTimeline.to(airpods, {
    frame: 52 - 1,//frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "main",
      start: "top top",
      end: "bottom bottom",
      onEnter: positionLabels,
    },
    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  })
  return renderTimeline;
}
function videoResume(startFrame, endFrame, trigger) {
  const renderTimeline = gsap.timeline();
  const obj = {
    frame: startFrame,//80,
  }
  renderTimeline.to(obj, {
    frame: endFrame - 1, //106 - 1,//frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      trigger: trigger,//"#s2",
      start: "top-=100px bottom",
      end: "bottom bottom",
      // onEnter: positionLabels,
    },
    onUpdate: () => render(obj.frame), // use animation onUpdate instead of scrollTrigger's onUpdate
  })
  return renderTimeline;
}
function labelScene(num) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#label${num}`,
      scrub: 0.5,
      start: "top bottom",
      end: "bottom bottom",
      onEnter: positionLabels
    }
  });
  tl.fade(`#label${num} .label`, {
    stagger: 0.1
  })
  return tl;
}
gsap.set(".mouse-scroll", { alpha: 0 })
const masterTimeline = gsap.timeline();
masterTimeline.add(video1())
  .add(labelScene(1))
  .add(videoResume(52, 90, "#s2"))
  .add(labelScene(2))
  .add(videoResume(90, 129, "#s3"))
  .add(labelScene(3))
  .add(videoResume(129, 161, "#s4"))
  .add(labelScene(4))
  .add(videoResume(161, frameCount - 13, "#s5"))
  .add(labelScene(5))
  .add(videoResume(frameCount - 13, frameCount, "#s6"))
  .to(".mouse-scroll", {
    alpha: 1,
    duration: 1,
    scrollTrigger: {
      onEnter: () => console.log("Fade"),
      trigger: "#s6",
      start: "center bottom-=100px",
      end: "center bottom-=200px",
      scrub: true,
    }
  }, {
    alpha: 1
  })
//Labels
window.addEventListener('resize', positionLabels, true);
function positionLabels() {
  const dimensions = document.getElementById("video").getBoundingClientRect();
  const left = dimensions.left;
  const top = dimensions.top;
  const height = dimensions.height;
  const width = dimensions.width;
  console.log("left", left, "top", top)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  if (vw > 650) {
    applyPos("nose", 17, 28, 120);
    applyPos("structures", 45, 27.7, 120);
    applyPos("payload", 34, 27.7, 150);
    applyPos("recovery", 20, 27.7, 150);
    applyPos("avionics", 63, 27.7, 150);
    applyPos("airbrakes", 46, 27.7, 120);
    applyPos("propulsion", 34, 28.6, 120);
  } else {
    applyPos("nose", 17, 28, 30);
    applyPos("structures", 45, 27.7, 30);
    applyPos("payload", 45, 30, 30);
    applyPos("recovery", 40, 27.7, 60);
    applyPos("avionics", 63, 27.7, 60);
    applyPos("airbrakes", 48.1, 30, 32);
    applyPos("propulsion", 34, 28.6, 30);

  }
  function applyPos(lname, topOffset, leftOffset, addLeftOffset = 0) {
    const label = document.getElementById(lname);
    topOffset = topOffset / 100 * height;
    leftOffset = leftOffset / 100 * width + addLeftOffset;
    label.style.top = (top + topOffset) + "px";//`calc(${top}px + ${topOffset}px)`;
    label.style.left = (left + leftOffset) + "px";//`calc(${left}px + ${leftOffset}px)`;
  }
}

function scrollBottom() { window.scrollTo(0, 99999); }
if (document.addEventListener) document.addEventListener("DOMContentLoaded", scrollBottom, false)
else if (window.attachEvent) window.attachEvent("onload", scrollBottom);