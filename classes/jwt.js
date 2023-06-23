const jwt = require("jsonwebtoken");

class JWT {
  constructor(secret, options = {}) {
    this.secret = secret;
    this.options = options;
  }

  getToken(payload, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.sign(
        payload,
        this.secret,
        { ...this.options, ...options },
        (error, token) => {
          if (error) reject(error);
          resolve(token);
        }
      );
    });
  }

  verifyToken(token, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        this.secret,
        { ...this.options, ...options },
        (error, decoded) => {
          if (error) reject(error);
          resolve(decoded);
        }
      );
    });
  }

  decodeToken(token, options = {}) {
    return new Promise((resolve, reject) => {
      jwt.decode(token, { ...this.options, ...options }, (error, decoded) => {
        if (error) reject(error);
        resolve(decoded);
      });
    });
  }
}

module.exports = JWT;
