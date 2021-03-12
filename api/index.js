import { validateNif } from "../lib";
const { SplitbeeAnalytics } = require("@splitbee/node");
const analytics = new SplitbeeAnalytics("DUVYHEBZOVJ6");

module.exports = (req, res) => {
  if (req.method === "GET") {
    const { q } = req.query;

    analytics.track({
      event: "Query",
      query: q,
    });

    if (q) {
      let obj = {};
      obj[q] = validateNif(q);
      return res.status(200).json(obj);
    } else return res.status(200).json("Hello World!");
  } else if (req.method === "POST") {
    let data = req.body;
    data = data?.data;

    if (data) {
      analytics.track({
        event: "POST",
        data: data,
      });

      let obj = {};
      data.forEach((item) => {
        obj[item] = validateNif(item);
      });

      return res.status(200).json(obj);
    } else return res.status(200).json("Hello World!");
  } else {
    return res.status(405).json({
      Error: "Method not allowed",
    });
  }
};
