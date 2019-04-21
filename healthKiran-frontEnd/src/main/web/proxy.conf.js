const PROXY_CONFIG = {
  "/api": {
    "logLevel": "debug",
    "target": "http://localhost:8080",
    "secure": false
  }
}

module.exports = PROXY_CONFIG;
