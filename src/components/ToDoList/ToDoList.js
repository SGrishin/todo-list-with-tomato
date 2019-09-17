import React, { PureComponent } from 'react';
import cx from 'classnames';
import { SPECIAL_KEYS } from '../../constants';
import { Button, Input, CircleWithPlus, Clock } from '../../toolkit';
import { uniqId, sessionStorageManager, testTomato } from '../../utils';
import ToDoItem from '../ToDoItem';
import theme from './ToDoList.module.css';

export default class ToDoList extends PureComponent {
    constructor(props) {
        super(props);

        this.inputRef = React.createRef();

        this.state = {
            value: sessionStorageManager.getItem('value') || '',
            toDoItems: sessionStorageManager.getItem('toDoItems') || [],
            startingToDoIndex: null
        };
    }

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeysDown);
        window.addEventListener('beforeunload', this.handleBeforeUnload);
    }

    componentWillMount() {
        window.removeEventListener('keydown', this.handleKeysDown);
        window.removeEventListener('beforeunload', this.handleBeforeUnload);
    }

    render() {
        const { value, toDoItems, startTimer, timerTime } = this.state;

        return (
                <div className={cx(theme['to-do-list'], { [theme.green]: testTomato.isTimeout() })} >
                    <Clock
                        className={cx(theme.clock)}
                        startTimer={startTimer}
                        timerTime={timerTime}
                        onTimerEnd={this.handleTimerEnd}
                    />
                    <div className={cx(theme['input-with-plus'])}>
                        <Input
                            inputRef={this.inputRef}
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
                            onStart={this.handleStart(index)}
                            onStop={this.handleStopTimer}
                            onDelete={this.handleDeleteToDo(index)}
                            {...toDoItem}
                        />
                    ))}
                    <Button className={cx(theme['clear-todo-list'])} label={'Clear ToDoList'} onClick={this.handleClearToDoList} />
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

    handleStart = (index) => () => {
        const { startingToDoIndex } = this.state;

        if (startingToDoIndex !== null) {
            return;
        }

        this.setState({ startingToDoIndex: index, startTimer: true, timerTime: testTomato.next() });        
    };

    handleTimerEnd = () => {
        this.setState({ timerTime: testTomato.next() });
    };

    handleStopTimer = () => {
        testTomato.clear();

        this.setState({ startingToDoIndex: null, startTimer: false });
    };

    handleDeleteToDo = (index) => () => {
        const { startingToDoIndex } = this.state;

        if (startingToDoIndex === index) {
            this.handleStopTimer();
        }

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

    handleKeysDown = (event) => {
        if (event.which === SPECIAL_KEYS.ENTER) {
            this.handleAddToDo();
        }

        if (this.inputRef.current) {
            this.inputRef.current.focus();
        }
    };

    handleBeforeUnload = () => {
        const { value, toDoItems } = this.state;

        sessionStorageManager.setItem('value', value);
        sessionStorageManager.setItem('toDoItems', toDoItems);
    };
}; 