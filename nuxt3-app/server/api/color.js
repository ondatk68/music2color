// const fs = require("fs");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import { createObjectCsvWriter } from "csv-writer";

export default defineEventHandler(async (event) => {
  await readBody(event)
    .then((data) => {
      let id = data.id;
      let color = data.color;
      return [id, color];
    })
    .then((data) => {
      let csvWriter = createObjectCsvWriter({
        path: "data/vote_res.csv",
        header: ["id", "color"],
        encoding: "utf8",
        append: true,
      });
      return [data[0], data[1], csvWriter];
    })
    .then((data) => {
      console.log(data[0], data[1]);
      data[2].writeRecords([{ id: data[0], color: data[1] }]).then(() => {
        console.log("...Done");
      });
    });
});
