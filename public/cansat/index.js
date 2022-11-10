gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    return gsap.timeline().fromTo(targets, {
      duration: config.duration,
      alpha: 0,
    }, {
      stagger: config.stagger,
      alpha: 1
    }).to(targets, {
      stagger: config.stagger,
      alpha: 0
    });
  },
  defaults: { duration: 0.2 },
  extendTimeline: true
});
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
var targets = document.querySelectorAll(".container-hero div");

targets.forEach((target, index) => {
  const tl = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: target,
      // markers: true,
      scrub: true,
      start: index == 0 ? "top 50%" : "center-=80px 50%",
      end: index == 0 ? "bottom top" : "bottom+=400px top",
      pin: true
    }
  })
    .fromTo(target, { y: index == 0 ? -10 : 25 }, { y: index == 0 ? -25 : -45 })
    .from(target, { opacity: index == 0 ? 1 : 0, duration: 0.2 }, 0)
    .to(target, { opacity: 0, duration: 0.4 }, 0.8)
});
// Video
const canvas = document.getElementById("video");
const context = canvas.getContext("2d");
// canvas.width = 1208;
// canvas.height = 600;

const frameCount = 188;
const currentFrame = (index) =>
  `../assets/videos/cansat/frame-${(index + 1).toString().padStart(3, "0")}.jpg`;

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
images[0].onload = function () {
  render();
  positionLabels();
};
function video1() {
  const renderTimeline = gsap.timeline({
    scrollTrigger: {
      scrub: 0.8,
      trigger: "#s1",
      start: "top-=100px bottom",
      end: "bottom bottom",
      onEnter: positionLabels,
    }
  });
  renderTimeline.to(airpods, {
    frame: 80 - 1,//frameCount - 1,
    snap: "frame",
    ease: "none",
    // scrollTrigger: {
    //   scrub: 0.8,
    //   trigger: "#s1",
    //   start: "top-=100px bottom",
    //   end: "bottom bottom",
    //   onEnter: positionLabels,
    // },
    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  })
    .fromTo("body", {
      backgroundColor: "#000",
      duration: 0.02
    }, {
      backgroundColor: "#b8b8b8",
    }, 0.24)
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
function label1() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#label1",
      scrub: 0.5,
      start: "top bottom",
      end: "bottom bottom",
    }
  });
  tl.fade("#label1 .label", {
    stagger: 0.3,
  });
  return tl;
}
function label2() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#label2",
      scrub: 0.5,
      start: "top bottom",
      end: "bottom bottom"
    }
  });
  tl.fade("#label2 .label", {
    stagger: 0.1
  })
  return tl;
}
function labelScene(num) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: `#label${num}`,
      scrub: 0.5,
      start: "top bottom",
      end: "bottom bottom"
    }
  });
  tl.fade(`#label${num} .label`, {
    stagger: 0.1
  })
  return tl;
}
const masterTimeline = gsap.timeline();
masterTimeline.add(video1())
  .add(labelScene(1))
  .add(videoResume(80, 106, "#s2"))
  .add(labelScene(2))
  .add(videoResume(106, frameCount, "#s3"))
  .add(labelScene(3))
function render(frame) {
  try {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(images[frame ?? airpods.frame], 0, 0);
  }
  catch (e) {
    console.log(e);
  }
}
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
    applyPos("force", 60, 17);
    applyPos("container", 40, 55, 120);
    applyPos("parachute", 15, 19);
    applyPos("battery", 64, 24);
    applyPos("avionics", 24, 55, 120);
    applyPos("gcs", 31, 55, 120);
    applyPos("payload", 76, 55, 120);
    applyPos("cdhs", 55, 15);
    applyPos("fsw", 20, 70);
  } else {
    applyPos("force", 42, 30);
    applyPos("container", 35, 54, 32);
    applyPos("parachute", 16, 33);
    applyPos("battery", 64, 35);
    applyPos("avionics", 28, 52, 52);
    applyPos("gcs", 34, 55, 32);
    applyPos("payload", 76, 55, 32);
    applyPos("cdhs", 55, 34);
    applyPos("fsw", 18, 60);
  }
  function applyPos(lname, topOffset, leftOffset, addLeftOffset = 0) {
    const label = document.getElementById(lname);
    topOffset = topOffset / 100 * height;
    leftOffset = leftOffset / 100 * width + addLeftOffset;
    label.style.top = (top + topOffset) + "px";//`calc(${top}px + ${topOffset}px)`;
    label.style.left = (left + leftOffset) + "px";//`calc(${left}px + ${leftOffset}px)`;
  }
}