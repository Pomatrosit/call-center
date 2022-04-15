export const getCallOptions = () => {
  return {
    mediaConstraints: { audio: true, video: false },
    pcConfig: {
      iceServers: [
        {
          urls: ["stun:stun.zadarma.com:3478"],
        },
      ],
    },
  };
};

// stun:stun.zadarma.com:3478
// stun:stun.freecall.com:3478
// 79195033167
// 79828147079
