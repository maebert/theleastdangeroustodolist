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
  exclude: string[];
  group: string | null;
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
            const { text, pack, rating, tags, exclude, group } = record.fields;
            data.push({
              id: record.id,
              text: (text as string).replace("\\n", "\n"),
              tags: tags || [],
              pack,
              rating,
              exclude: exclude || [],
              group,
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
    exclude: string[]
    group?: string
};`;
};

const importTodos = async () => {
  const data = await importData();
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

  const body = `${generateHeader(tags, packs)}

const data: Todo[] = ${JSON.stringify(data, null, 2)};

export default data;`;
  await writeData(body, OUTPUT_PATH);
};

importTodos();
