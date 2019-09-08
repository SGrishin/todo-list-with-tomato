import React, { PureComponent } from 'react';
import cx from 'classnames';
import theme from './CircleWithPlus.module.css';

export default class CircleWithPlus extends PureComponent {
    render() {
        const { className, onClick } = this.props;

        return (
            <div className={cx(theme.circle, className)} onClick={onClick}>
                <div className={cx(theme.bar, theme.horizontal)}></div>
                <div className={cx(theme.bar, theme.vertical)}></div>
            </div>
        );
    }
};
