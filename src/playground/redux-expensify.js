import { createStore, combineReducers } from 'redux'
import { v4 as uuidv4 } from 'uuid'

const addExpense = (
  {
    description = '',
    note = '',
    amount = 0,
    createdAt = 0,
  } = {}
) => ({
  type: 'ADD_EXPENSE',
  expense: {
    id: uuidv4(),
    description,
    note,
    amount,
    createdAt,
  }
})

const removeExpense = ({ id = '' } = {}) => ({
  type: 'REMOVE_EXPENSE',
  id
})

const editExpense = (id, updates) => ({
  type: 'EDIT_EXPENSE',
  id,
  updates, 
})

const expensesReducerDefaultState = []

const expensesReducer = (state = expensesReducerDefaultState, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.expense]
    case 'REMOVE_EXPENSE':
      return state.filter(({ id }) => id !== action.id)
    case 'EDIT_EXPENSE':
      return state.map((expense) => {
        if (expense.id === action.id) {
          return { ...expense, ...action.updates }
        } else {
          return expense
        }
      })
    default:
      return state
  }
}

const setTextFilter = (text = '') => ({
  type: 'SET_TEXT_FILTER',
  text
})

const sortByAmount = () => ({
  type: 'SORT_BY_AMOUNT',
})

const sortByDate = () => ({
  type: 'SORT_BY_DATE',
})

const setStartDate = (startDate) => ({
  type: 'SET_START_DATE',
  startDate
})

const setEndDate = (endDate) => ({
  type: 'SET_END_DATE',
  endDate
})

const filterReducerDefaultState = {
  text: '',
  sortBy: 'date',
}

const filterReducer = (state = filterReducerDefaultState, action) => {
  switch (action.type) {
    case 'SET_TEXT_FILTER':
      return {
        ...state,
        text: action.text
      }
    case 'SORT_BY_AMOUNT':
      return {
        ...state,
        sortBy: 'amount',
      }
    case 'SORT_BY_DATE':
      return {
        ...state,
        sortBy: 'date',
      }
    case 'SET_START_DATE':
      return {
        ...state,
        startDate: action.startDate,
      }
    case 'SET_END_DATE':
      return {
        ...state,
        endDate: action.endDate,
      }
    default:
      return state
  }
}

const getVisibleExpenses = (expenses, { startDate, endDate, text, sortBy }) => {
  return expenses.filter(expense => {
    const startDateMatch = typeof startDate !== 'number' || expense.createdAt >= startDate 
    const endDateMatch = typeof endDate !== 'number' || expense.createdAt <= endDate
    const textMatch = typeof text !== 'string' || expense.description.toLowerCase().includes(text.toLowerCase())

    return startDateMatch && endDateMatch && textMatch
  }).sort((a, b) => {
    if (sortBy === 'date') {
      return b.createdAt - a.createdAt
    }
    if (sortBy === 'amount') {
      return b.amount - a.amount
    }
  })
}

const store = createStore(
  combineReducers({
    expenses: expensesReducer,
    filters: filterReducer,
  })
)

store.subscribe(() => {
  const { expenses, filters } = store.getState()
  console.log(getVisibleExpenses(expenses, filters))
})

const expenseOne = store.dispatch(addExpense({ description: 'rent', amount: 100, createdAt: 1000 }))
const expenseTwo = store.dispatch(addExpense({ description: 'coffee', amount: 300, createdAt: -1000 }))

// store.dispatch(removeExpense({ id: expenseOne.expense.id }))
// store.dispatch(editExpense(expenseTwo.expense.id, { amount: 500 }))

// store.dispatch(setTextFilter('cOf'))
// store.dispatch(setTextFilter())

// store.dispatch(sortByAmount())
// store.dispatch(sortByDate())

// store.dispatch(setStartDate(2125))
// store.dispatch(setStartDate())
// store.dispatch(setEndDate(123))
// store.dispatch(setStartDate(150))

const demoState = {
  expenses: [{
    id: 'asdoafdf',
    description: 'January rent',
    note: 'This is the last rent for this month',
    amount: 54500,
    createdAt: 0,
  }],
  filters: {
    text: 'rent',
    sortedBy: 'amount',   // amount or date
    startDate: null,
    endDate: null,
  }
}

const user = {
  age: 12,
  name: 'hello'
}

console.log({
  ...user
})