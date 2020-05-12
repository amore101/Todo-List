import React, { Component } from 'react';
import todoItems from '../data';
import styles from '../App.module.css';

class EditTodoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.todo
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSave = this.handleSave.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleSave(event) {
        todoItems[this.props.date][this.props.id] = this.state.value;
        this.props.editTodo(this.props.id);
    }
    handleCancel(event) {
        this.props.editTodo(this.props.id);
    }
    render() {
        return (
            <div key={this.props.id}>
                {this.props.todo ? 
                    <div>
                        <input type="text" value={this.state.value} onChange={this.handleChange} className={styles.input}></input> 
                        <button onClick={this.handleSave} className={styles.inputBtn}>Save</button>
                        <button onClick={this.handleCancel} className={styles.inputBtn}>Cancel</button>
                    </div>
                    : null
                }
            </div>
        )
    }
}

export default EditTodoItem;