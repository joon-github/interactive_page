(() => {
  let yOffset = 0; // 현재 스크롤 위치
  let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 씬
  let isEnterNewScene = false; // 새로운 씬이 출력된 순간 true
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5,
      scrollheight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
        messageA: document.querySelector("#scroll-section-0 .main-message.a"),
        messageB: document.querySelector("#scroll-section-0 .main-message.b"),
        messageC: document.querySelector("#scroll-section-0 .main-message.c"),
        messageD: document.querySelector("#scroll-section-0 .main-message.d"),
      },
      values: {
        messageA_opacity: [0, 1],
      },
    },
    {
      // 1
      type: "normal",
      heightNum: 5,
      scrollheight: 0,
      objs: {
        container: document.querySelector("#scroll-section-1"),
      },
    },
    {
      // 2
      type: "sticky",
      heightNum: 5,
      scrollheight: 0,
      objs: {
        container: document.querySelector("#scroll-section-2"),
      },
    },
    {
      // 3
      type: "sticky",
      heightNum: 5,
      scrollheight: 0,
      objs: {
        container: document.querySelector("#scroll-section-3"),
      },
    },
  ];

  const setLayout = () => {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollheight = sceneInfo[i].heightNum * window.innerHeight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollheight}px`;
    }
    let totalScrollHeight = 0;
    for (let i = 0; i < sceneInfo.length; i++) {
      totalScrollHeight += sceneInfo[i].scrollheight;
      if (totalScrollHeight >= yOffset) {
        currentScene = i;
        break;
      }
    }
    document.body.setAttribute("id", `show-scene-${currentScene}`);
  };

  const calcValues = (values, currentYOffset) => {
    let scrollRatio = currentYOffset / sceneInfo[currentScene].scrollheight;
    return scrollRatio * (values[1] - values[0]) + values[0];
  };
  const playAnimation = () => {
    const values = sceneInfo[currentScene].values;
    const obj = sceneInfo[currentScene].objs;
    const currentYOffset = yOffset - prevScrollHeight;
    switch (currentScene) {
      case 0:
        const messageA_opacity_in = calcValues(
          values.messageA_opacity,
          currentYOffset
        );
        obj.messageA.style.opacity = messageA_opacity_in;
        break;
      case 1:
        console.log("1");
        break;
      case 2:
        console.log("2");
        break;
      case 3:
        console.log("3");
        break;
    }
  };
  const scrollLoop = () => {
    isEnterNewScene = false;
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollheight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollheight) {
      isEnterNewScene = true;
      currentScene++;
    } else if (yOffset < prevScrollHeight && yOffset > 0) {
      isEnterNewScene = true;
      currentScene--;
    }

    document.body.setAttribute("id", `show-scene-${currentScene}`);
    if (isEnterNewScene) return;
    playAnimation();
  };
  window.addEventListener("load", setLayout);
  window.addEventListener("resize", setLayout);
  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLoop();
  });
  setLayout();
})();
