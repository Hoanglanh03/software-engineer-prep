import fs from "fs";
import path from "path";

const dbPath = path.join(__dirname, "../data/db.json");

const readData = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

const writeData = async (data: any) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

export default {
  readData,
  writeData,
};
