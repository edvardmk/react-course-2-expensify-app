import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => (
  <header>
    <h1>
      Expensify
    </h1>
    <NavLink activeClassName="is-active" to="/" exact>Dashboard</NavLink>
    <NavLink activeClassName="is-active" to="/create">Add Expense</NavLink>
  </header>
)

export default Header