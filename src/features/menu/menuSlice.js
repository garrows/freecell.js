import { createSlice } from '@reduxjs/toolkit'

let nextTodoId = 0

const menuSlice = createSlice({
  name: 'menu',
  initialState: [],
  reducers: {
    illegalMove: {
      reducer(state, action) {
        const { id, text } = action.payload
        alert('Hello illegalMove slice! ' + text);
        state.push({ id, text, completed: false })
      },
      prepare(text) {
        return { payload: { text, id: nextTodoId++ } }
      }
    },
    toggleTodo(state, action) {
      const todo = state.find(todo => todo.id === action.payload)
      if (todo) {
        todo.completed = !todo.completed
      }
    }
  }
})

export const { illegalMove, toggleTodo } = menuSlice.actions

export default menuSlice.reducer
