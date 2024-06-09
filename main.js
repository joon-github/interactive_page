(() => {
  let yOffset = 0; // 현재 스크롤 위치
  let prevScrollHeight = 0; // 현재 스크롤 위치보다 이전에 위치한 섹션들의 스크롤 높이값의 합
  let currentScene = 0; // 현재 활성화된 씬
  const sceneInfo = [
    {
      // 0
      type: "sticky",
      heightNum: 5,
      scrollheight: 0,
      objs: {
        container: document.querySelector("#scroll-section-0"),
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

  const setlayOut = () => {
    // 각 스크롤 섹션의 높이 세팅
    for (let i = 0; i < sceneInfo.length; i++) {
      sceneInfo[i].scrollheight = sceneInfo[i].heightNum * window.innerHeight;
      prevScrollHeight += sceneInfo[i].scrollheight;
      sceneInfo[
        i
      ].objs.container.style.height = `${sceneInfo[i].scrollheight}px`;
    }
  };
  const scrollLopp = () => {
    prevScrollHeight = 0;
    for (let i = 0; i < currentScene; i++) {
      prevScrollHeight += sceneInfo[i].scrollheight;
    }

    if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollheight) {
      currentScene++;
    } else if (yOffset < prevScrollHeight && yOffset > 0) {
      currentScene--;
    }
    console.log(currentScene);
  };

  window.addEventListener("resize", setlayOut);
  window.addEventListener("scroll", () => {
    yOffset = window.scrollY;
    scrollLopp();
  });
  setlayOut();
})();
