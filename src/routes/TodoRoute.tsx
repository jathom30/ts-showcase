import React, { useState } from 'react';
import { Box } from '../components';
import { TodoType, useTodos } from '../hooks';
import { v4 as uuid } from 'uuid'

export const TodoRoute = () => {
  const [isCreating, setIsCreating] = useState(false)
  const [isEditingId, setIsEditingId] = useState<string>()
  const [newTitle, setNewTitle] = useState('')
  const [newDescription, setNewDescription] = useState('')
  const {
    todos,
    createTodo,
    updateTodo,
    deleteTodo,
  } = useTodos()

  const handleCreateNew = () => {
    if (newTitle) {
      createTodo({
        id: uuid(),
        title: newTitle,
        ...(newDescription ? {description: newDescription} : null),
      })
    }
    setIsCreating(false)
    setNewTitle('')
    setNewDescription('')
  }

  const handleUpdateTodo = (todoId: string) => {
    if (newTitle) {
      updateTodo({
        id: todoId,
        title: newTitle,
        ...(newDescription ? {description: newDescription} : null)
      })
    }
    setIsEditingId(undefined)
    setNewTitle('')
    setNewDescription('')
  }

  const handleEdit = (todo: TodoType) => {
    setIsEditingId(todo.id)
    setIsCreating(false)
    setNewTitle(todo.title)
    setNewDescription(todo.description || '')
  }

  return (
    <div className="TodoRoute">
      <Box kind="flex" flexDirection="column" gap="l" alignItems="flex-start">
        <h1>My Todos</h1>
        <Box kind="flex" flexDirection="column" gap="m">
          {todos?.map((todo) => (
            <div key={todo.id} className="TodoRoute__todo">
              <Box kind="flex" gap="s" flexDirection="column" padding="s">
                {isEditingId === todo.id ? (
                  <>
                    <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
                    <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
                    <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
                  </>
                ) : (
                  <>
                    <h3>{todo.title}</h3>
                    <p>{todo?.description}</p>
                    <button onClick={() => deleteTodo(todo.id)}>Mark Complete</button>
                    <button onClick={() => handleEdit(todo)}>Edit</button>
                  </>
                )}
              </Box>
            </div>
          ))}
        </Box>
        <button onClick={() => setIsCreating(true)}>Create New</button>
        {isCreating ? (
          <Box kind="flex" flexDirection="column" gap="s">
            <input value={newTitle} onChange={(e) => setNewTitle(e.target.value)} />
            <textarea value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <button onClick={handleCreateNew}>Create</button>
          </Box>
        ) : null}
      </Box>
    </div>
  )
}