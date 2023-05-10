import React from "react";

class MyForm extends React.Component {
  constructor() {
    super();
    this.state = { person: { name: "", comments: "", animal: "" } };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.value);
    // If something is done to data...
    //this.setState({ value: "" });
  };

  onChange = (e) => {
    e.preventDefault();
    const value = e.target.value;
    const name = e.target.name;
    // Using prevState is necessary here so that other values in the person object are not erased when one changes
    // [name] is accessing the name attribute of the input field in question
    this.setState((prevState) => ({
      person: { ...prevState.person, [name]: value },
    }));
    console.log(e.target.value);
  };

  render() {
    console.log(this.state);
    return (
      <form onSubmit={this.onSubmit}>
        <label>
          Name:
          <input
            onChange={this.onChange}
            type="text"
            name="name"
            value={this.state.value}
          />
        </label>
        <br />
        <label htmlFor="">Comments: </label>
        <textarea
          onChange={this.onChange}
          name="comments"
          value={this.state.value}
        ></textarea>
        <br />
        <label htmlFor="">Choose Animal: </label>
        <select onChange={this.onChange} name="animal" id="">
          <option value="dog">dog</option>
          <option value="cat">cat</option>
          <option value="lizard">lizard</option>
        </select>
        <input type="submit" value="submit" />
      </form>
    );
  }
}

export default MyForm;
