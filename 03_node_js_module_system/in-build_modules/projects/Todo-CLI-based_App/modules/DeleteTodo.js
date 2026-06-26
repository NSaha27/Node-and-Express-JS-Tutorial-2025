import fs from "fs";
import path from "path";

const fileName = "todo.json";
const filePath = path.resolve("files", fileName);

export default async function DeleteTodo(id){
  let existingTodos;
  try{
    const res = await fs.promises.readFile(filePath, "utf-8");
    existingTodos = res ? JSON.parse(res) : [];
  }catch(err){
    console.error(err.message);
    return false;
  }
  const todoFound = existingTodos.find(todo => todo.id === Number(id));
  if(!todoFound){
    console.log("***no such todo was found !");
    return false;
  }
  const newTodoList = existingTodos.filter(todo => todo.id !== Number(id));
  try{
    await fs.promises.writeFile(filePath, JSON.stringify(newTodoList), "utf-8");
    console.log("*** the todo has been deleted !");
    return true;
  }catch(err){
    console.error(err.message);
    return false;
  }
}