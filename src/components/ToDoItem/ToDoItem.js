import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Button, Cross } from '../../toolkit';
import theme from './ToDoItem.module.css';

export default class ToDoItem extends PureComponent {
    static defaultProps = {
        description: '',
        onStart: null,
        onDelete: null
    }

    render() {
        const { className, description, onStart, onDelete } = this.props;

        return (
            <div className={cx(theme['to-do-item'], className)} >
                <Button className={cx(theme.start)} label={'Start'} onClick={onStart} />
                <div className={cx(theme.description)}>
                    {description}
                </div>
                <Cross className={cx(theme['delete-button'])} onClick={onDelete} />
            </div>
        );
    }
}