import React, { Component } from "react";
import "./App.css";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      doWhat: "Wash up the dishes",
      doHow: "I need to wash up dishes & sweep the floor.",
      characters: [
        {
          id: 1,
          what: "Learn to code",
          how: "Get better everyday at coding in JS and React. ",
          priority: 12,
        },
        {
          id: 2,
          what: "Wash the car",
          how: "Wash inside and outside of the car. ",
          priority: 42,
        },
      ],
    };
  }

  listOfToDos = () => {
    return this.state.characters.map((todo) => (
      <div>
        <li key={todo.id} className="todo">
          <a className="ctrl" onClick={() => this.removeDude(todo)}>
            x
          </a>
          <div className="whole-todo">
            <article
              id="article"
              className={
                todo.priority < 10 ? "faded" : todo.priority > 50 ? "gold" : ""
              }
            >
              <strong className="todo-what">{todo.what} </strong>
              <span className="todo-how">{todo.how}</span>
            </article>
          </div>
          <input
            className="alt "
            type="number"
            value={todo.priority}
            onChange={this.handlePriority(todo)}
          />
        </li>
      </div>
    ));
  };

  // save new what

  handleWhat = (event) => {
    this.setState({
      doWhat: event.target.value,
    });
  };
  // save new What
  handleHow = (event) => {
    this.setState({
      doHow: event.target.value,
    });
  };
  // Update priority

  handlePriority = (todo) => (event) => {
    const priority = +event.target.value;

    this.setState((state) => {
      return {
        characters: state.characters.map((item) =>
          item === todo ? { ...todo, priority } : item
        ),
      };
    });
  };

  // Add new todo
  handleSubmit = (event) => {
    if (event.key === "Enter" && this.state.doWhat && this.state.doHow) {
      this.setState((state) => {
        const newTodo = {
          id: Math.max(...state.characters.map((d) => d.id)) + 1,
          what: this.state.doWhat,
          how: this.state.doHow,
          priority: 15,
        };

        return {
          characters: [...state.characters, newTodo],
        };
      });
    }
  };

  removeTodo = (todo) => {
    this.setState((state) => {
      return {
        characters: state.characters.filter((item) => item !== todo),
      };
    });
  };

  render() {
    const { doWhat, doHow } = this.state;

    return (
      <div className="App">
        <h1>Todo App</h1>
        <ul className="zoznam-todos">{this.listOfToDos()}</ul>
        <form className="add-new" onKeyPress={this.handleSubmit}>
          <input
            type="text"
            className="input-name"
            onChange={this.handleWhat}
            value={doWhat}
          />

          <input
            type="text"
            className="input-title"
            onChange={this.handleHow}
            value={doHow}
          />
        </form>
        <form className="add-preview">
          <p className="preview">
            <strong className="name-preview"> {doWhat}</strong>

            <br />

            <small>
              <strong className="title-preview">{doHow}</strong>
            </small>
          </p>
        </form>
      </div>
    );
  }
}

export default App;
