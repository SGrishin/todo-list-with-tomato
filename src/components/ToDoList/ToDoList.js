import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Input, CircleWithPlus } from '../../toolkit';
import { uniqId, sessionStorageManager } from '../../utils';
import ToDoItem from '../ToDoItem';
import theme from './ToDoList.module.css';

export default class ToDoList extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            value: sessionStorageManager.getItem('value') || '',
            toDoItems: sessionStorageManager.getItem('toDoItems') || []
        };
    }

    componentDidMount() {
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillMount() {
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    render() {
        const { value, toDoItems } = this.state;

        return (
                <div className={cx(theme['to-do-list'])} >
                    <div className={cx(theme['input-with-plus'])}>
                        <Input
                            className={cx(theme.input)}
                            label={'enter todo description'}
                            value={value}
                            onChange={this.handleValueChange}
                        />
                        <CircleWithPlus
                            className={cx(theme['circle-with-plus'])}
                            onClick={this.handleAddToDo}
                        />
                    </div>
                    {toDoItems.map((toDoItem, index) => (
                        <ToDoItem
                            className={cx(theme['to-do-item'])}
                            key={toDoItem._id}
                            onDelete={this.handleDeleteToDo(index)}
                            {...toDoItem}
                        />
                    ))}
                    <Button label={'Clear ToDoList'} onClick={this.handleClearToDoList} />
                </div>
            );
    };

    handleValueChange = (nextvalue) => {
        this.setState({
            value: nextvalue
        });
    };
    
    handleAddToDo = () => {
        const { value, toDoItems} = this.state;

        if (!value.length) {
            return;
        }

        this.setState({
            value: '',
            toDoItems: [{_id: uniqId('toDoItem'), description: value}].concat(toDoItems)
        });
    }

    handleDeleteToDo = (index) => () => {
        this.setState({
            toDoItems: this.state.toDoItems.slice(0, index).concat(this.state.toDoItems.slice(index + 1))
        });
    };

    handleClearToDoList = () => {
        this.setState({
            value: '',
            toDoItems: []
        });
    };

    handleBeforeUnload = () => {
        const { value, toDoItems } = this.state;

        sessionStorageManager.setItem('value', value);
        sessionStorageManager.setItem('toDoItems', toDoItems);
    };
}; 