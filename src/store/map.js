let defaultTaggingShow = sessionStorage.getItem("taggingShow");
let defaultAlarmShow = sessionStorage.getItem("alarmShow");
let defaultPipingShow = sessionStorage.getItem("pipingShow");
let defaultWalkShow = sessionStorage.getItem("walkShow");

const map = {
  state: {
    // 点标注
    taggingShow: defaultTaggingShow || 0,
    // 报警演示
    alarmShow: defaultAlarmShow || 0,
    // 线路展示
    pipingShow: defaultPipingShow || 0,
    // 行走漫步
    walkShow: defaultWalkShow || 0,
    // 楼层，显示936每层楼用能信息及楼层按钮
    mapFloorShow: false,
    // 显示魔方功能信息
    mapCubeShow: false
  },
  mutations: {
    // 点标注
    changeTagging(state) {
      state.taggingShow = state.taggingShow === 0 ? 1 : 0;
      sessionStorage.setItem("taggingShow", state.taggingShow);
    },
    // 报警演示
    changeAlarm(state) {
      state.alarmShow = state.alarmShow === 0 ? 1 : 0;
      sessionStorage.setItem("alarmShow", state.alarmShow);
    },
    // 线路展示
    changePiping(state) {
      state.pipingShow = state.pipingShow === 0 ? 1 : 0;
      sessionStorage.setItem("pipingShow", state.pipingShow);
    },
    // 行走漫步
    changeWalk(state) {
      state.walkShow = state.walkShow === 0 ? 1 : 0;
      sessionStorage.setItem("walkShow", state.walkShow);
    },
    // 隐藏楼层显示
    hideFloor(state) {
      state.mapFloorShow = false;
    },
    hideCube(state) {
      state.mapCubeShow = false;
    }
  }
};

export default map;
