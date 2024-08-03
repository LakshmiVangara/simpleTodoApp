// src/components/Todo.js

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styles from "./Todo.module.css";

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [token] = useState("");

  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3000/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(response.data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  }, [token]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  return (
    <div className={styles.todoContainer}>
      <h1 className={styles.title}>Todo List</h1>
      <ul className={styles.list}>
        {todos.map((todo) => (
          <li key={todo.id} className={styles.item}>
            {todo.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
