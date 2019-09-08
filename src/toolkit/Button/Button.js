import React, { PureComponent } from 'react';
import cx from 'classnames';
import theme from './Button.module.css';

export default class Button extends PureComponent {
    static defaultProps = {
        label: 'Add'
    }

    render() {
        const { label, onClick, className } = this.props;

        return (
            <div className={cx(theme.button, className)} onClick={onClick}>
                {label}
            </div>
        );
    }
};
