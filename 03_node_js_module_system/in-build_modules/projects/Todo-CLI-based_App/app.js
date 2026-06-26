import readline from "readline";

import AddTodo from "./modules/AddTodo.js";
import DeleteTodo from "./modules/DeleteTodo.js";
import DisplayTodos from "./modules/DisplayTodos.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const handleAddTodo = () => {
  const todoData = { title: "", date: "", description: "" };
  rl.question("Enter Todo Title: ", (title) => {
    if(title.length === 0){
      console.log("\n*** invalid todo title!");
      handleAddTodo();
    }
    todoData.title = title;
    rl.question("Enter Todo Date (yyyy/mm/dd): ", (todoDate) => {
      const dateRegex = /^\d{4}\/\d{2}\/\d{2}$/;
      if (!dateRegex.test(todoDate)) {
        console.log("*** enter a valid date!");
        handleAddTodo();
      }
      todoData.date = todoDate;
      rl.question("Enter Todo Description: ", async (desc) => {
        todoData.description = desc;
        await AddTodo(todoData);
        return showMenu();
      })
    })
  });
};

const handleOpenTodos = async () => {
  const result = await DisplayTodos();
  if(!result){
    console.log("*unable to find any todo!");
    return showMenu();
  }
  result.map((todo) => {
    console.log(`${todo.id}. ${todo.title} (${todo.date})\nDetails: ${todo.description}`);
  });
  return showMenu();
}

const handleDeleteTodo = () => {
  rl.question("Enter todo ID: ", async (id) => {
    if (id.length === 0 || isNaN(Number(id))) {
      console.log("***enter a valid ID !");
      handleDeleteTodo();
    }
    await DeleteTodo(id);
    return showMenu();
  });
};

const handleOption = async (ans) => {
  if (ans.length === 0 || isNaN(Number(ans))) {
    console.log("*** enter a valid option!");
    showMenu();
  }
  const option = Number(ans);
  switch(option){
    case 1:
      console.log("\nEnter the following details:");
      handleAddTodo();
      break;
    case 2:
      console.log("\nHere are your todos:");
      await handleOpenTodos();
      break;
    case 3:
      handleDeleteTodo();
      break;
    case 4:
      console.log("Thank you, visit again!");
      rl.close();
      break;
    default:
      console.log("*** enter a valid option!");
      showMenu();
  }
}

const showMenu = () => {
  console.log("\nSelect an option:");
  console.log("1: Add a Todo");
  console.log("2: Open all Todos");
  console.log("3: Delete a Todo");
  console.log("4. Exit");
  rl.question("Choose the option: ", handleOption);
};

showMenu();