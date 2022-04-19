import React from 'react'
import moment from 'moment'
import { SingleDatePicker } from 'react-dates'
import 'react-dates/initialize';

export default class ExpenseForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      description: props.expense?.description || '',
      note: props.expense?.note || '',
      amount: props.expense ? (props.expense.amount / 100).toString() : '',
      createdAt: moment(props.expense?.createdAt),
      calendarFocused: false,
      error: ''
    }
  }

  onDescriptionChange = (e) => {
    this.setState({ description: e.target.value })
  }
  onNoteChange = (e) => {
    this.setState({ note: e.target.value })
  }
  onAmountChange = (e) => {
    const amount = e.target.value
    if (!amount || amount.match(/^\d{1,}(\.\d{0,2})?$/)) {
      this.setState({ amount })
    }
  }
  onDateChange = (createdAt) => {
    if (createdAt) {
      this.setState({ createdAt })
    }
  }
  onFocusedChange = ({ focused }) => {
    this.setState({ calendarFocused: focused })
  }
  onSubmit = (e) => {
    e.preventDefault()

    if (!this.state.description || !this.state.amount) {
      this.setState({ error: 'Please provide description and amount.' })
    } else {
      this.setState({ error: '' })
      this.props.onSubmit({
        description: this.state.description,
        amount: parseFloat(this.state.amount) * 100,
        createdAt: this.state.createdAt.valueOf(),
        note: this.state.note,
      })
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.onSubmit}>
           <input 
             type="text"
             placeholder="Description"
             autoFocus
             value={this.state.description}
             onChange={this.onDescriptionChange}
           />
           <input
             type="text"
             placeholder="Amount"
             value={this.state.amount}
             onChange={this.onAmountChange}
           />
           <SingleDatePicker
            date={this.state.createdAt}
            onDateChange={this.onDateChange}
            focused={this.state.calendarFocused}
            onFocusChange={this.onFocusedChange}
            numberOfMonths={1}
            isOutsideRange={() => false}
           />
           <textarea
            placeholder="Add a note to your Expense (optional)"
            value={this.state.note}
            onChange={this.onNoteChange}
           >
           </textarea>
           <button>
            Add Expense
           </button>
        </form>
      </div>
    )
  }
}