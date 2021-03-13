import { validateNif } from "../lib";
import { splitbeeInit } from "../lib/splitbee";

const analytics = splitbeeInit();

module.exports = (req, res) => {
  if (req.method === "GET") {
    const { q } = req.query;

    console.log(
      `Token::${process.env.SPLITBEE_TOKEN}\nAnalytics::${JSON.stringify(
        analytics
      )}`
    );

    analytics?.track({
      userId: "anon",
      event: "Query",
      data: {
        query: q,
      },
    });

    if (q) {
      let obj = {};
      obj[q] = validateNif(q);
      return res.status(200).json(obj);
    } else return res.status(200).json("Hello World!");
  } else if (req.method === "POST") {
    let data = req.body;
    data = data?.data;

    analytics?.track({
      userId: "anon",
      event: "POST",
      data: {
        input: data,
      },
    });

    if (data) {
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
