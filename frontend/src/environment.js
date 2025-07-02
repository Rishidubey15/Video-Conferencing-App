let IS_PROD = true;

const server = IS_PROD ? "https://video-conferencing-app-uze9.onrender.com" : "http://localhost:8000";

export default { server };