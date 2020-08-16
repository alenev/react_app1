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
    { label: 'Drink Coffee', important: false, id: 1 },
    { label: 'Make Awesome App', important: true, id: 2 },
    { label: 'Have a lunch', important: false, id: 3 }
  ]
  };
  
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
	 const newItem = {
		 label: text,
		 important: false,
		 id: this.maxID++
	 }
	 
	 this.setState( ( { todoData} ) => {
	 const newArr = [
		 ... todoData,
		 newItem
	 ];
	 
	 return {
		todoData: newArr 
	 };
	 });
  };
  
  onToggleImportant = (id) => {
	  console.log('important: ', id);
  };
  
  onToggleDone = (id) => {
	  console.log('done: ',id);
  };
 
  render() {
  return (
    <div className="todo-app">
      <AppHeader toDo={1} done={3} />
      <div className="top-panel d-flex">
        <SearchPanel />
        <ItemStatusFilter />
      </div>

      <TodoList todos={this.state.todoData} 
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