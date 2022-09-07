gsap.registerPlugin(ScrollTrigger);
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {
    return gsap.timeline().fromTo(targets, {
      duration: config.duration,
      alpha: 0,
      scrollTrigger: {
        trigger: "body",

      }
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

const frameCount = 82;
const currentFrame = (index) =>
  `../assets/videos/cubesat/frame-${(index + 1).toString().padStart(2, "0")}.jpg`;

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
    frame: frameCount - 1,
    duration: 10,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onEnter: positionLabels,
    },
    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  })
  return renderTimeline;
}
ScrollTrigger.matchMedia({
  "(min-width: 900px)": function () {
    const masterTimeline = gsap.timeline({
      defaults: {
        duration: 0.5,
      },
      scrollTrigger: {
        scrub: 0.8,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onEnter: positionLabels,
      },
    });
    masterTimeline.to(airpods, {
      frame: frameCount - 1,
      duration: 10,
      snap: "frame",
      ease: "none",
      onUpdate: render
    })
      // masterTimeline.add(video1())
      .fromTo(".paragraph", {
        duration: 2,
        stagger: 0.5,
        y: 25,
        alpha: 0
      }, {
        y: 0,
        alpha: 1,
      }, 1.2)
      .to(".paragraph", {
        duration: 1,
        y: -20,
        alpha: 0,
      }, 4)
      .to(".paragraph .line", {
        width: "30px",
        duration: 2.4,
      }, 1.3)
      .to("body", {
        backgroundColor: "#0d0f1e",
        duration: 1,
      }, 7.2)
      .fromTo("#labels2", {
        duration: 1,
        alpha: 0,
        y: 30,
      }, {
        alpha: 1,
        y: 0
      }, 6);
  },
  "(max-width: 900px)": function () {
    const masterTimeline = gsap.timeline({
      defaults: {
        duration: 0.5,
      },
      scrollTrigger: {
        scrub: 0.2,
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        onEnter: positionLabels,
      },
    });
    masterTimeline.to(airpods, {
      frame: frameCount - 1,
      duration: 10,
      snap: "frame",
      ease: "none",
      onUpdate: render
    })
      // masterTimeline.add(video1())
      .fromTo("#p1", {
        duration: 2,
        y: 25,
        alpha: 0
      }, {
        y: 0,
        alpha: 1,
      }, 2)
      .to("#p1 .line", {
        width: "30px",
        duration: 3,
      }, "<")
      .to("#p1", {
        duration: 1,
        alpha: 0,
      }, 4)
      .fromTo("#p2", {
        duration: 2,
        y: 25,
        alpha: 0
      }, {
        y: 0,
        alpha: 1,
      }, 4.6)
      .to("#p2 .line", {
        width: "30px",
        duration: 3,
      }, "<")
    // .to(".paragraph .line", {
    //   width: "30px",
    //   duration: 2.4,
    // }, 1.3)


  }
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
  if (vw > 900) {
    applyPos("p1", 40, 10);
    applyPos("p2", 40, 75);
    applyPos("labels2", 7, 5);
  } else {
    applyPos("p1", 5, 40);
    applyPos("p2", 5, 40);
    document.getElementById("p1").style.left = "15px";
    document.getElementById("p2").style.left = "15px";
  }
  function applyPos(lname, topOffset, leftOffset, addLeftOffset = 0) {
    const label = document.getElementById(lname);
    topOffset = topOffset / 100 * height;
    leftOffset = leftOffset / 100 * width + addLeftOffset;
    label.style.top = (top + topOffset) + "px";//`calc(${top}px + ${topOffset}px)`;
    label.style.left = (left + leftOffset) + "px";//`calc(${left}px + ${leftOffset}px)`;
  }
}