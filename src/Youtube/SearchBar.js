import React from 'react'
import styled from 'styled-components'

/* <----------- styled components -----------> */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2em;
  padding-bottom: 2em;
`
const Input = styled.input `
  background-color: transparent;
  font-size: 16px;
  box-shadow: none;
  width: 40%;
  line-height: 24px;
  border: 1px solid white;
  box-shadow: inset 0 1px 2px white;
  padding: 2px 6px;
  border-radius: 2px 0 0 2px;
  color: white;
`
/* <------- end of styled components --------> */

class SearchBar extends React.Component {
  state = {
    term: ''
  }
  onInputChange = (event) => {
    this.setState({ term: event.target.value })
  }
  onFormSubmit = (event) => {
    event.preventDefault()
    this.props.onTermSubmit( this.state.term )
  }
  render() {
    return (
      <div>
        <Form onSubmit={this.onFormSubmit}>
          <Input
            placeholder="Search"
            type="text"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </Form>
      </div>
    )
  }
}
export default SearchBar