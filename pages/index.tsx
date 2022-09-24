import type { NextPage } from "next";
import TodoList from "../modules/todoList/TodoList";


const Home: NextPage = () => {
  return (
    <div>
      <TodoList />
    </div>
  );
};

export default Home;
