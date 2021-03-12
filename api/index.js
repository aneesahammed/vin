import splitbee from "@splitbee/web";
import { validateNif } from "../lib";

module.exports = (req, res) => {
  splitbee.init();

  if (req.method === "GET") {
    const { q } = req.query;

    splitbee.track("Query", {
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
      console.log("data->" + data);
      splitbee.track("POST", {
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
