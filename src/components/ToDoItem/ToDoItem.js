import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Button, Cross } from '../../toolkit';
import theme from './ToDoItem.module.css';

export default class ToDoItem extends PureComponent {
    static propTypes = {
        description: PropTypes.string,
        onStart: PropTypes.func,
        onStop: PropTypes.func,
        onDelete: PropTypes.func
    };

    static defaultProps = {
        description: '',
        onStart: null,
        onStop: null,
        onDelete: null
    }

    render() {
        const { className, description, onStart, onStop, onDelete } = this.props;

        return (
            <div className={cx(theme['to-do-item'], className)} >
                <Button className={cx(theme.button, theme.start)} label={'Start'} onClick={onStart} />
                <Button className={cx(theme.button, theme.stop)} label={'Stop'} onClick={onStop} />
                <div className={cx(theme.description)}>
                    {description}
                </div>
                <Cross className={cx(theme['delete-button'])} onClick={onDelete} />
            </div>
        );
    }
}