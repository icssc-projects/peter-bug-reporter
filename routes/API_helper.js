var request = require("request");

module.exports = {
  make_API_call: function (url, json) {
    return new Promise((resolve, reject) => {
      request.post(
        url,
        {
          auth: {
            bearer: "",
          },
          headers: { "user-agent": "node.js" },
          json: json,
        },
        (err, res, body) => {
          if (err) reject(err);
          resolve(body);
        }
      );
    });
  },
};
