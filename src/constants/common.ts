/// DEV
export const API_URL = "https://lk.sipli.ru/cc";
export const SOCKET_URL = "https://lk.sipli.ru:4001";

// export const API_URL = "https://lk.sipli.ru:3057";
// export const SOCKET_URL = "https://lk.sipli.ru:4011";

export const WEB_PHONE_SOCKET = "wss://wrs.hanumi.net:8089/ws";
export const WEB_PHONE_SOCKT_EU = "wss://wrtcger.hanumi.net:8089/ws";
// ru wss://wrs.hanumi.net:8089/ws
// eu wss://wrtcger.hanumi.net:8089/ws

export enum TOKENS {
  accessToken = "accessToken",
  refreshToken = "refreshToken",
}

export enum SESSION_STORAGE {
  journalId = "journalId",
  hashphone = "hashPhone",
}
