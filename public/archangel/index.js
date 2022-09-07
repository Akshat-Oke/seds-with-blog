gsap.registerPlugin(ScrollTrigger);
// gsap.set("section:not(:first-child)", {
//   opacity: 0
// })
gsap.to(".mouse-scroll", {
  alpha: 0,
  duration: 0.7,
  scrollTrigger: {
    // markers: true,
    // trigger: "body",
    scrub: 0.5,
    // start: "top top",
    end: "top+=400px top",
  }
})

// gsap.to("#archangel", {
//   alpha: 0,
//   y: -15,
//   duration: 1,
//   scrollTrigger: {
//     markers: true,
//     trigger: "#archangel",
//     start: "center 50%",
//     end: "bottom top-=50px",
//     pin: true,
//     scrub: true,
//   }
// })
// gsap.set("#intro-text", { alpha: 0 })
// gsap.fromTo("#intro-text1", {
//   alpha: 0,
//   y: -10,
//   duration: 1,
//   scrollTrigger: {
//     markers: true,
//     trigger: "#intro-text",
//     start: "center 50%",
//     end: "bottom top",
//     scrub: true,
//     pin: true,
//   }
// }, {
//   alpha: 1,
//   y: -10,
// })
var targets = document.querySelectorAll(".container-hero div");
// gsap.to(".container-hero div:first-child", {
//   y: -10,
//   alpha: 0,
//   duration: 2,
//   scrollTrigger: {
//     trigger: "#hero",
//     start: "top top",
//     end: "top top+=500px",
//     scrub: true,
//     markers: true,
//     // pin: true,
//   }
// })
// gsap.set("#hero", {
//   y: "-5vh"
// })
targets.forEach((target, index) => {
  const tl = gsap.timeline({
    defaults: { duration: 1 },
    scrollTrigger: {
      trigger: target,
      scrub: true,
      start: index == 0 ? "top 50%" : "center 50%",
      end: index == 0 ? "bottom top" : "bottom+=100px top",
      pin: true
    }
  })
    .fromTo(target, { y: index == 0 ? -10 : 25 }, { y: -25 })
    .from(target, { opacity: index == 0 ? 1 : 0, duration: 0.2 }, 0)
    .to(target, { opacity: 0, duration: 0.4 }, 0.8)
});
// Video
// gsap.registerPlugin(ScrollTrigger);
const canvas = document.getElementById("video");
const context = canvas.getContext("2d");
// canvas.width = 1208;
// canvas.height = 600;

const frameCount = 124;
const currentFrame = (index) =>
  `../assets/videos/archangel/frame-${(index + 48).toString().padStart(3, "0")}.jpg`;

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

function video1() {

  const renderTimeline = gsap.timeline();
  renderTimeline.to(airpods, {
    frame: 40 - 1,//frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.5,
      // markers: true,
      trigger: "#s",
      start: "top bottom+=100px",
      end: "bottom bottom+=200px",
      onEnter: positionLabels,
    },
    onUpdate: render, // use animation onUpdate instead of scrollTrigger's onUpdate
  })
  return renderTimeline;
}
let frameCache = 0;
function labelScene() {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#label1",
      scrub: 0.5,
      start: "top bottom+=100px",
      end: "bottom bottom+=200px",
    },
  })
    // Here the video will pause (after 40 frames)
    .fromTo("div.label", {
      duration: 2,
      alpha: 0,
    }, {
      alpha: 1,
      stagger: 0.4,
    })
    .to("div.label", {
      duration: 2,
      alpha: 0,
      stagger: 0.4
    }, "+=0.7");
  return tl;
}
//resume the video
function video2(a) {
  const renderTimeline = gsap.timeline();
  const obj = {
    frame: 41,
  }
  renderTimeline.to(obj, {
    frame: 124,//frameCount - 40 - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      onEnter: () => {
        console.log("Started");
        airpods.frame = 41;
      },
      scrub: 0.5,
      trigger: "#s2",
      start: "top bottom+=100px",
      end: "bottom bottom",
    },
    onUpdate: () => render(obj.frame), // use animation onUpdate instead of scrollTrigger's onUpdate
  })
  return renderTimeline;
}
function label2() {
  const tl = gsap.timeline({
    scrollTrigger: {
      onEnter: () => {
        console.log("Motor start label!");
      },
      scrub: 0.5,
      // markers: true,
      trigger: "#s2",
      start: "top bottom-=60%",
      end: "bottom bottom+=70%",
    },
  });
  tl.fromTo("#motor", {
    alpha: 0,
    duration: 0.3,
  }, {
    alpha: 1
  })
    .to("#motor", {
      alpha: 0,
      duration: 0.4
    })
  return tl;
}
gsap.registerEffect({
  name: "fade",
  effect: (targets, config) => {

    return gsap.timeline().fromTo(targets, {
      duration: config.duration,
      alpha: 0
    }, {
      alpha: 1
    }).to(targets, {
      alpha: 0
    });
  },
  defaults: { duration: 0.2 },
  extendTimeline: true
});
function mobileLabels() {
  const tl = gsap.timeline({
    scrollTrigger: {
      onEnter: positionLabels,
      trigger: "#label1",
      scrub: 0.5,
      start: "top bottom+=100px",
      end: "bottom bottom+=200px",
    },
  })
    // Here the video will pause (after 40 frames)
    // .fromTo("div.label:nth-child(1)", {
    //   duration: 0.2,
    //   alpha: 0,
    // }, {
    //   alpha: 1,
    // })
    .to("#video", {
      duration: 0.2,
      marginLeft: "97%",
      marginTop: "15%",
    })
    .fade("div.mobile-label:nth-child(1)", "<")
    // .fromTo("div.label:nth-child(2)", {
    //   duration: 0.2,
    //   alpha: 0,
    // }, {
    //   alpha: 1
    // })
    .fade("div.mobile-label:nth-child(2)")
    .to("#video", {
      duration: 0.2,
      marginLeft: "0%",
      marginTop: "0%"
    }, "<")
    .fade("div.mobile-label:nth-child(3)")
    .to("#video", {
      duration: 0.2,
      marginLeft: "-51%",
      marginTop: "1%"
    }, "<")
    .fade("div.mobile-label:nth-child(4)")
    .to("#video", {
      duration: 0.2,
      marginLeft: "-110%",

    }, "<")
    .to("div.label", {
      alpha: 0,
      duration: 0.4,
    })
    .to("#video", {
      margin: "0",
      duration: 0.4
    }, "<");
  return tl;
}
ScrollTrigger.matchMedia({
  "(max-width: 500px)": function () {

    const masterTimeline = gsap.timeline();
    masterTimeline.add(video1())
      .add(mobileLabels())
      .add(video2())
      .add(label2(), "<45%")
      .to("#video", {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          onEnter: () => console.log("Fade"),
          trigger: "#s2",
          start: "bottom bottom+=150px",
          end: "bottom bottom",
          scrub: true,
        }
      })
  },
  "(min-width: 500px)": function () {
    const masterTimeline = gsap.timeline();
    masterTimeline.add(video1())
      .add(labelScene())
      .add(video2())
      .add(label2(), "<45%")
      .to("#video", {
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          onEnter: () => console.log("Fade"),
          trigger: "#s2",
          start: "bottom bottom+=150px",
          end: "bottom bottom",
          scrub: true,
        }
      })
  }
})

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

// Position the first group of labels
document.addEventListener("DOMContentLoaded", () => {
  // positionLabels();
})
window.addEventListener('resize', positionLabels, true);
function positionLabels() {
  const dimensions = document.getElementById("video").getBoundingClientRect();
  const left = dimensions.left;
  const top = dimensions.top;
  const height = dimensions.height;
  const width = dimensions.width;
  console.log("left", left, "top", top)
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)
  // const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)
  if (vw > 500) {

    applyPos("bulkhead", 25, 8);
    applyPos("casing", 35, 46);
    applyPos("grains", 55, 54);
    applyPos("nozzle", 52, 79);
    applyPos("motor", 19, 31);
  } else {
    console.log("Let's go mobile!")
    // applyPos("bulkhead", 31, 124);
    // applyPos("casing", 31, 141);
    // applyPos("grains", 49, 128);
    // applyPos("nozzle", 47, 147);
    // applyPos("motor", 13, 114);
  }
  function applyPos(lname, topOffset, leftOffset) {
    const label = document.getElementById(lname);
    topOffset = topOffset / 100 * height;
    leftOffset = leftOffset / 100 * width;
    label.style.top = (top + topOffset) + "px";//`calc(${top}px + ${topOffset}px)`;
    label.style.left = (left + leftOffset) + "px";//`calc(${left}px + ${leftOffset}px)`;
  }
}