import {useState} from 'react';

export type TodoType = {
  id: string
  title: string
  description?: string
}

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([])

  const createTodo = (todo: TodoType) => {
    setTodos((prevTodos) => [...prevTodos, todo])
  }

  const updateTodo = (todo: TodoType) => {
    setTodos((prevTodos) => {
      const index = prevTodos.findIndex((prevTodo: TodoType) => prevTodo.id === todo.id)
      prevTodos[index] = todo
      return [...prevTodos]
    })
  }

  const deleteTodo = (todoId: string) => {
    setTodos((prevTodos) => prevTodos.filter((prevTodo) => prevTodo.id !== todoId))
  }

  return {todos, createTodo, updateTodo, deleteTodo}
}