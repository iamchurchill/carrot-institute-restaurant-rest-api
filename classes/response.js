const xml2js = require("xml2js");

class Response {
  static success(
    res,
    {
      data,
      message = "",
      access_token = null,
      refresh_token = null,
      status = 200,
      headers = {},
      format = "json",
    } = {}
  ) {
    const response = {
      status: true,
      message,
      data,
    };

    if (access_token) {
      response.access_token = access_token;
    }
    if (refresh_token) {
      response.refresh_token = refresh_token;
    }

    for (const key in headers) {
      res.setHeader(key, headers[key]);
    }

    switch (format) {
      case "json":
        return res.status(status).json(response);
      case "xml":
        res.set("Content-Type", "application/xml");
        return res.status(status).send(self.convertToXml(response));
      case "text":
        res.set("Content-Type", "text/plain");
        return res.status(status).send(self.convertToText(response));
      default:
        return res.status(status).json(response);
    }
  }

  static error(
    res,
    {
      errors,
      message = "",
      status = 500,
      headers = {},
      format = "json",
      view,
    } = {}
  ) {
    const response = {
      status: false,
      message,
      errors,
    };

    for (const key in headers) {
      res.setHeader(key, headers[key]);
    }

    switch (format) {
      case "json":
        return res.status(status).json(response);
      case "xml":
        res.set("Content-Type", "application/xml");
        return res.status(status).send(self.convertToXml(response));
      case "text":
        res.set("Content-Type", "text/plain");
        return res.status(status).send(self.convertToText(response));
      case "html":
        return res.status(status).render(view, { error: response });
      default:
        return res.status(status).json(response);
    }
  }

  convertToXml(data) {
    const builder = new xml2js.Builder();
    return builder.buildObject(data);
  }

  convertToText(data) {
    let text = "";
    for (const key in data) {
      text += `${key}: ${data[key]}\n`;
    }
    return text;
  }
}

module.exports = Response;
