import React from 'react'
import { connect } from 'react-redux'
import numeral from 'numeral'

import selectExpenses from '../selectors/expenses'
import getExpensesTotal from '../selectors/expenses-total'

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
  const expenseWord = expenseCount === 1 ? 'expense' : 'expenses'
  const formattedExpenseTotal = numeral(expensesTotal / 100).format('$0,0.00')
  console.log(expenseCount, expensesTotal)
  return (
    <p>
      Viewing {expenseCount} {expenseWord} totalling {formattedExpenseTotal}
    </p>
  )
}

const mapStateToProps = (state) => {
  const visibleExpenses = selectExpenses(state.expenses, state.filters)

  return {
    expenseCount: visibleExpenses.length,
    expensesTotal: getExpensesTotal(visibleExpenses),
  }
}

export default connect(mapStateToProps)(ExpensesSummary)