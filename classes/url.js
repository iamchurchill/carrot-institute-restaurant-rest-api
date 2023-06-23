class Url {
  static getUrl(request) {
    const protocol = request.headers["x-forwarded-proto"] || request.protocol;
    const hostname = request.headers.host;
    let port = request.headers["x-nginx-port"] || request.socket.localPort;
    const path = request.originalUrl;

    const isDefaultPort =
      (protocol === "http" && port === 80) ||
      (protocol === "https" && port === 443);

    let ipAddress;
    if (request.headers["x-real-ip"]) {
      ipAddress = request.headers["x-real-ip"].split(":").pop();
    } else if (request.headers["x-forwarded-for"]) {
      ipAddress = request.headers["x-forwarded-for"].split(":").pop();
    }

    if (ipAddress) {
      port = ipAddress.split(":").pop();
    }

    if (isDefaultPort) {
      return `${protocol}://${hostname}${path}`;
    } else {
      return `${protocol}://${hostname}:${port}${path}`;
    }
  }
}

module.exports = Url;
