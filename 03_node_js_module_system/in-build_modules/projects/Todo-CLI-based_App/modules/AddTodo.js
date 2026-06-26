import fs from "fs";
import path from "path";

const fileName = "todo.json";
const filePath = path.resolve("files", fileName);

export default async function AddTodo(data){
  if(typeof data !== "object" || Object.keys(data).length === 0){
    console.error("***invalid data type!");
    return false;
  }
  let existingTodos;
  try{
    const res = await fs.promises.readFile(filePath, "utf-8");
    existingTodos = res ? JSON.parse(res) : [];
    const todoFound = existingTodos.find(todo => todo.title === data.title);
    if(todoFound){
      throw new Error("***a todo with the same title is already created!");
    }
  }catch(err){
    console.error(err.message);
    return false;
  }
  const updatedData = {...data, id: (existingTodos.length + 1)};
  existingTodos.push(updatedData);
  try{
    await fs.promises.writeFile(filePath, JSON.stringify(existingTodos), "utf-8");
    console.log("*** the new todo has been created!");
    return true;
  }catch(err){
    console.error(err.message);
    return false;
  }
}