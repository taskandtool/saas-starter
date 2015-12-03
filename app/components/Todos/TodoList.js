import React, { PropTypes } from 'react';
import TodoCard from './TodoCard.js';

export default class TodoList extends React.Component {
  static propTypes = {
    todos: PropTypes.array.isRequired
  }

  render() {
    let todos = this.props.todos.map((todo) => {
      return (
        <div key={todo._id} className={this.props.cardStyle} >
          <TodoCard
            todo={todo}
            canEdit={this.props.canEdit}
            showToast={this.props.showToast} />
        </div>
      );
    })

    return (
      <div>
        {todos}
      </div>
    );
  }
}
