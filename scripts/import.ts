const config = require("dotenv").config().parsed;
const at = require("airtable");
const fs = require("fs");
const _ = require("lodash");
const OUTPUT_PATH = "src/generated/data.ts";

at.configure({
  apiKey: config.AIRTABLE_API_KEY,
});
const base: Airtable.Base = new at.base(config.AIRTABLE_BASE);

type Task = {
  id: string;
  text: string;
  pack: string;
  rating: number;
  tags: string[];
};

const importData = async (): Promise<Task[]> => {
  return new Promise((resolve, reject) => {
    let data: Task[] = [];
    base("Tasks")
      .select()
      .eachPage(
        (records, next: () => any) => {
          records.forEach((record) => {
            // @ts-ignore
            const { Task, Pack, ID, Rating, Tags } = record.fields;
            const id = `${Pack.toLowerCase()}_${ID}`;
            data.push({
              id,
              text: (Task as string).replace("\\n", "\n"),
              tags: Tags || [],
              pack: Pack,
              rating: Rating,
            });
          });
          next();
        },
        // @ts-ignore
        (err) => {
          if (err) reject(err);
          resolve(data);
        }
      );
  });
};

const writeData = async (body: string, path: string) => {
  console.log("Finished loading data...");
  return new Promise((resolve) => {
    fs.writeFile(path, body, undefined, resolve);
  });
};

const getTags = (data: Task[]): string[] =>
  _.chain(data)
    .map((d: Task) => d.tags)
    .flatten()
    .uniq()
    .filter()
    .value();

const getPacks = (data: Task[]): string[] =>
  _.chain(data)
    .map((d: Task) => d.pack)
    .uniq()
    .value();

const generateHeader = (tags: string[], packs: string[]) => {
  const tagsType = tags.map((t) => `"${t}"`).join(" | ");
  const packsType = packs.map((p) => `"${p}"`).join(" | ");

  return `export type Tag = ${tagsType};
export type Pack = ${packsType};
export type Todo = {
    id: string;
    text: string;
    pack: Pack;
    tags: Tag[];
    rating?: number;
};`;
};

const importTodos = async () => {
  const data = await importData();
  console.log(`Got ${data.length} tasks...`);
  const tags = getTags(data);
  const packs = getPacks(data);

  const packStats = _.chain(data)
    .countBy((d: Task) => d.pack)
    .value();

  const tagStats = _.fromPairs(
    tags.map((t) => [
      t,
      data.filter((d: Task) => d.tags && d.tags.includes(t)).length,
    ])
  );
  console.log("Packs:", packStats);
  console.log("Tags:", tagStats);

  const body = `${generateHeader(tags, packs)}

const data: Todo[] = ${JSON.stringify(data, null, 2)};

export default data;`;
  await writeData(body, OUTPUT_PATH);
  console.log("Written to", OUTPUT_PATH);
};

importTodos();
