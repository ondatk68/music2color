import * as fs from "fs";

export default defineEventHandler(async (event) => {
  const res = [];
  await readBody(event)
    .then((data) => {
      let color = data.color;
      return color;
    })
    .then((color) => {
      const data = JSON.parse(fs.readFileSync("../result/res.json", "utf8"));
      //   console.log(data);
      return data[color];
    })
    .then((data) => {
      data.forEach((element) => {
        res.push(element);
      });
    });

  return res;
});
