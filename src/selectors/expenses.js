import moment from 'moment'

export default (expenses, { startDate, endDate, text, sortBy }) => {
  return expenses.filter(expense => {
    const createdAtMoment = moment(expense.createdAt)
    const startDateMatch = startDate ? startDate.isSameOrBefore(createdAtMoment, 'day') : true
    const endDateMatch = endDate ? endDate.isSameOrAfter(createdAtMoment, 'day') : true
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
