import fs from "fs";
import path from "path";

const fileName = "todo.json";
const filePath = path.resolve("files", fileName);

export default async function DisplayTodos(){
  try{
    const res = await fs.promises.readFile(filePath, "utf-8");
    const todos = res ? JSON.parse(res) : [];
    return todos;
  }catch(err){
    console.error(err.message);
    return false;
  }
}