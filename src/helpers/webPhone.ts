import axios from "axios";

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

export const changeWebPhoneStatus = async (status: string) => {
  try {
    const response = await axios.post(`/calls/status/${status}`);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const registerWebPhone = async () => {
  try {
    const response = await axios.post("/calls/registration");
    console.log(response);
    const response2 = await axios.post(`/calls/status/pause`);
    console.log(response2);
  } catch (error) {
    console.log(error);
  }
};

export const sanitizePhone = (phone: string) => {
  const phoneArr = phone.split("");
  phoneArr[0] = "7";
  return phoneArr.join("");
};
