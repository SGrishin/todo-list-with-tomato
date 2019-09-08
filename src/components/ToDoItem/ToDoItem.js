import React, { PureComponent } from 'react';
import cx from 'classnames';
import { Cross } from '../../toolkit';
import theme from './ToDoItem.module.css';

export default class ToDoItem extends PureComponent {
    defaultProps = {
        description: '',
        onDelete: null
    }

    render() {
        const { className, description, onDelete } = this.props;

        return (
            <div className={cx(theme['to-do-item'], className)} >
                <div className={cx(theme.description)}>
                    {description}
                </div>
                <Cross className={cx(theme['delete-button'])} onClick={onDelete} />
            </div>
        );
    }
}