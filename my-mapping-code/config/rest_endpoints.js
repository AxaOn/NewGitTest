const PROTOCOL = "http";
const SERVER_IP = 'localhost'
const PORT = '5000'


export const SERVER_PATH = `${PROTOCOL}://${SERVER_IP}:${PORT}`;
export const ROOT_URL = `${SERVER_PATH}/api`;

export const DRONE_INFO = `${ROOT_URL}/droneInfo`;
export const FLIGHTS_LOGS = `${ROOT_URL}/logsCollection`;
export const FLIGHT_LOGS = `${ROOT_URL}/log`;
export const MISSION_PARAMETERS = `${ROOT_URL}/missionParameters`;
export const FLIGHT_VIDEO_LOG_PATH = `${SERVER_PATH}/static/video-logs/`;
export const FLIGHT_VIDEO_LOG = `${ROOT_URL}/videoLog`;