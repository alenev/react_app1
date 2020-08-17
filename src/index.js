import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import AppHeader from './Components/app-header';
import SearchPanel from './Components/search-panel';
import TodoList from './Components/todo-list';
import ItemStatusFilter from './Components/item-status-filter';
import ItemAddForm from './Components/item-add-form';
import './index.css';

export default class App extends Component {

  maxID = 1000;
  
  state = {
	todoData: [
	this.createTodoItem('Todo item 1'),
	this.createTodoItem('Todo item 2'),
	this.createTodoItem('Todo item 3')
  ]
  };
  
  createTodoItem(label){
	  return {
		  label,
		  important: false,
		  done: false,
		  id: this.maxID++
	  };
  }
  
  deleteItem = (id) => {
	  this.setState(({todoData}) => {	   
       const idx = todoData.findIndex((el) => el.id === id);	   
	   const newArray = [... todoData.slice(0, idx), ... todoData.slice(idx + 1)];
	   return {
	   todoData: newArray
	   };
	  }  
	  );
  }
  
  addItem = (text) => {
	 const newItem = this.createTodoItem(text);
	 
	 this.setState( ( { todoData} ) => {
	 const newArr = [ ... todoData, newItem ];
	 
	 return {
		todoData: newArr 
	 };
	 });
  };
  
  toggleProperty(arr, id, propName){
		  const idx = arr.findIndex((el) => el.id === id);
		  const oldItem = arr[idx];
		  const newItem = {... oldItem, [propName]: !oldItem[propName]};	 
		  return [... arr.slice(0, idx),
          newItem,
		  ... arr.slice(idx + 1)];     
  };
  
  onToggleImportant = (id) => {
	  this.setState(({ todoData}) => {
	      return {
			  todoData: this.toggleProperty(todoData, id, 'important')
		  };
	  });
  };
  
  onToggleDone = (id) => {
	  this.setState(({ todoData}) => {
	      return {
			  todoData: this.toggleProperty(todoData, id, 'done')
		  };
	  });
  };
 
  render() {
	  const { todoData } = this.state;
	  const doneCount = todoData.filter(
	  (el) => el.done).length;
	  const todoCount = todoData.length - doneCount;
	  
  return (
    <div className="todo-app">
      <AppHeader toDo={todoCount} done={doneCount} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={todoData} 
      onToggleImportant = {this.onToggleImportant}
	  onToggleDone = {this.onToggleDone}
      onDeleted= { this.deleteItem }
	  />
	  
	  <ItemAddForm onItemAdded={this.addItem} />
    </div>
  );
  }
};

ReactDOM.render(<App />, document.getElementById('root'));