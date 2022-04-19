import moment from 'moment'

import selectExpenses from '../../selectors/expenses'
import expenses from '../fixtures/expenses'

test('should filter text by value', () => {
  const filters = {
    text: 'e',
    sortBy: 'date',
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[1]])
})

test('should filter text by start date', () => {
  const filters = {
    startDate: moment(0),
    sortBy: 'date',
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0]])
})

test('should filter text by end date', () => {
  const filters = {
    endDate: moment(0).add(2, 'days'),
    sortBy: 'date',
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[0], expenses[1]])
})

test('should sort by date', () => {
  const filters = {
    sortBy: 'date',
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[2], expenses[0], expenses[1]])
})

test('should sort by amount', () => {
  const filters = {
    sortBy: 'amount',
  }
  const result = selectExpenses(expenses, filters)
  expect(result).toEqual([expenses[1], expenses[2], expenses[0]])
})