'use client'

import { useState, useEffect } from 'react'

type Todo = {
  id: number
  text: string
  done: boolean
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([])
  const [input, setInput] = useState('')

  useEffect(() => {
    const stored = localStorage.getItem('todos')
    if (stored) setTodos(JSON.parse(stored))
  }, [])

  function save(next: Todo[]) {
    setTodos(next)
    localStorage.setItem('todos', JSON.stringify(next))
  }

  function add() {
    const text = input.trim()
    if (!text) return
    save([...todos, { id: Date.now(), text, done: false }])
    setInput('')
  }

  function toggle(id: number) {
    save(todos.map(t => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function remove(id: number) {
    save(todos.filter(t => t.id !== id))
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-900 flex items-start justify-center pt-20 px-4">
      <div className="w-full max-w-md">
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50 mb-6">
          Todo
        </h1>

        <form
          onSubmit={e => { e.preventDefault(); add() }}
          className="flex gap-2 mb-6"
        >
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="Add a task..."
            className="flex-1 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-2 text-zinc-900 dark:text-zinc-50 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-400"
          />
          <button
            type="submit"
            className="rounded-lg bg-zinc-900 dark:bg-zinc-50 text-white dark:text-zinc-900 px-4 py-2 font-medium hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Add
          </button>
        </form>

        {todos.length === 0 ? (
          <p className="text-center text-zinc-400 text-sm">No tasks yet.</p>
        ) : (
          <ul className="space-y-2">
            {todos.map(todo => (
              <li
                key={todo.id}
                className="flex items-center gap-3 rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-800 px-4 py-3"
              >
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggle(todo.id)}
                  className="h-4 w-4 cursor-pointer accent-zinc-900 dark:accent-zinc-50"
                />
                <span
                  className={`flex-1 text-sm ${todo.done ? 'line-through text-zinc-400' : 'text-zinc-900 dark:text-zinc-50'}`}
                >
                  {todo.text}
                </span>
                <button
                  onClick={() => remove(todo.id)}
                  className="text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors text-lg leading-none"
                  aria-label="Delete"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}
