import React, { Component } from 'react';
import Mousetrap from 'mousetrap';
import todoItems from '../data';
import EditTodoItem from './EditTodoItem';
import styles from '../App.module.css';

class TodoItem extends Component {

    constructor(props) {
        super(props);
        this.state = {
            inEditMode: false,
            clickedItem: "", 
            items: todoItems,
            isDone: [],
            isNotDone: []
        }
        this.editTodo = this.editTodo.bind(this);
        this.createTodo = this.createTodo.bind(this);
        this.handleCheckbox = this.handleCheckbox.bind(this);
    }
    componentDidMount() {
        Mousetrap.bind('space', this.createTodo); 
    }
    componentWillUnmount() {
        Mousetrap.unbind('space', this.createTodo);
    }

    createTodo() {
        todoItems[this.props.date].push("Click here to edit"); 
        return this.updateData(todoItems);
    }

    updateData(data) {
        this.setState({
            items: data
        })
    }

    editTodo(index) {
        this.setState(state => ({ 
            inEditMode: !state.inEditMode, 
            clickedItem: index
        }));
    }

    handleCheckbox(todo) {
        if (this.state.isDone.indexOf(todo) !== -1) {
            this.setState(()=> ({
                isDone: this.state.isDone.filter( item => item !== todo),
                isNotDone: this.state.isNotDone.concat(todo)
            }))
        } else {
            this.setState(() => ({
                isDone: this.state.isDone.concat(todo),
                isNotDone: this.state.isNotDone.filter( item => item !== todo),
            }))
        }
    }

    handleDelete(index) {
        var array = this.state.items[this.props.date];
        array.splice(index,1);
        this.setState({array});
    }      

    render() {
        return(
            <div>
                <ul className="todoItems">
                    {this.state.items[this.props.date] &&
                    this.state.items[this.props.date].map((item, index) => {
                        if(this.state.inEditMode && this.state.clickedItem === index) {
                            return (
                                <EditTodoItem 
                                    id={index} 
                                    todo={item} 
                                    date={this.props.date} 
                                    key={index} 
                                    editTodo={this.editTodo.bind(this)}
                                />
                            )
                        }
                        else {
                            return (
                                <div className={styles.item}>
                                    <li 
                                        key={index} 
                                        className={this.state.isDone.indexOf(index) !== -1 ? styles.doneItem : styles.todoItem}
                                        tabIndex = "0"
                                        onClick={() => this.editTodo(index)}>
                                        {item}
                                    </li>
                                    <button 
                                        className={this.state.isDone.indexOf(index) !== -1 ? styles.done : styles.notDone} 
                                        onClick={() => this.handleCheckbox(index)}>    
                                    </button>
                                    <button 
                                        className={styles.delete}
                                        onClick={() => this.handleDelete(index)}>
                                        <span class="glyphicon glyphicon-remove" aria-hidden="false"></span>
                                    </button>
                                </div>
                            )
                        }
                    })}              
                </ul>
                <button onClick={this.createTodo} className={styles.newItem}>What needs to be done?</button>
            </div>
        )
    }
}

export default TodoItem;