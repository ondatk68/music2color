// const fs = require("fs");
// const createCsvWriter = require("csv-writer").createObjectCsvWriter;
import { createObjectCsvWriter } from "csv-writer";

import * as csv from "csv";
import * as fs from "fs";
import { DecisionTreeClassifier as DTClassifier } from "ml-cart";

const color2num = {
  Red: 0,
  Orange: 1,
  Yellow: 2,
  Green: 3,
  Lime: 4,
  Blue: 5,
  Aqua: 6,
  Purple: 7,
  Pink: 8,
  Brown: 9,
  Black: 10,
  White: 11,
};

const num2color = {
  0: "Red",
  1: "Orange",
  2: "Yellow",
  3: "Green",
  4: "Lime",
  5: "Blue",
  6: "Aqua",
  7: "Purple",
  8: "Pink",
  9: "Brown",
  10: "Black",
  11: "White",
};
export default defineEventHandler(async (event) => {
  await readBody(event)
    .then((data) => {
      let id = data.id;
      let color = data.color;
      return [id, color];
    })
    .then((data) => {
      let csvWriter = createObjectCsvWriter({
        path: "../data/vote_res.csv",
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
    })
    .then(() => {
      const readFile = (filePath) => {
        return new Promise((resolve, reject) => {
          const data = [];
          fs.createReadStream(filePath)
            .pipe(csv.parse({ columns: true }))
            .on("data", (row) => {
              data.push(row);
            })
            .on("end", () => {
              resolve(data);
            })
            .on("error", (error) => {
              reject(error);
            });
        });
      };

      Promise.all([
        readFile("../data/vote_res.csv"),
        readFile("../assets/top_chart_50.csv"),
      ])
        .then(([voteRes, join]) => {
          // IDをキーに結合する
          const joinedData = voteRes.map((vote) => {
            const joinData = join.find((j) => j.id === vote.id);
            return { ...vote, ...joinData };
          });
          return joinedData;
        })
        .then((data) => {
          // console.log(data);
          const xs = [];
          const ys = [];
          data.forEach((row) => {
            xs.push([
              parseFloat(row["danceability"]),
              parseFloat(row["energy"]),
              parseFloat(row["key"]),
              parseFloat(row["loudness"]),
              parseFloat(row["mode"]),
              parseFloat(row["speechiness"]),
              parseFloat(row["acousticness"]),
              parseFloat(row["instrumentalness"]),
              parseFloat(row["liveness"]),
              parseFloat(row["valence"]),
              parseFloat(row["tempo"]),
              parseFloat(row["time_signature"]),
            ]);
            ys.push(color2num[row["color"]]);
          });

          return [xs, ys];
        })
        .then((data) => {
          const options = {
            gainFunction: "gini",
            maxDepth: 10,
            minNumSamples: 3,
          };

          const classifier = new DTClassifier();
          classifier.train(data[0], data[1]);
          const result = classifier.predict(data[0]);

          return classifier;
        })
        .then((classifier) => {
          fs.writeFile(
            "../model/model.txt",
            JSON.stringify(classifier),
            (err, data) => {
              if (err) console.log(err);
              else console.log("write end");
            }
          );

          return new Promise((resolve, reject) => {
            const data = {};
            fs.createReadStream("../assets/top_chart_50.csv")
              .pipe(csv.parse({ columns: true }))
              .on("data", (row) => {
                data[row["id"]] =
                  num2color[
                    classifier.predict([
                      [
                        parseFloat(row["danceability"]),
                        parseFloat(row["energy"]),
                        parseFloat(row["key"]),
                        parseFloat(row["loudness"]),
                        parseFloat(row["mode"]),
                        parseFloat(row["speechiness"]),
                        parseFloat(row["acousticness"]),
                        parseFloat(row["instrumentalness"]),
                        parseFloat(row["liveness"]),
                        parseFloat(row["valence"]),
                        parseFloat(row["tempo"]),
                        parseFloat(row["time_signature"]),
                      ],
                    ])
                  ];
              })
              .on("end", () => {
                resolve(data);
              })
              .on("error", (error) => {
                reject(error);
              });
          });
        })
        .then((data) => {
          //console.log(data);
          fs.writeFileSync(
            "../result/res.json",
            JSON.stringify(data, null, "    ")
          );
          console.log("vote reflected!");
        })
        .then(() => {
          const data = JSON.parse(fs.readFileSync("../result/resjson", "utf8"));

          for (const key in data) {
            console.log(key, data[key]);
          }
        })
        .catch((error) => console.error(error));
    });
});
