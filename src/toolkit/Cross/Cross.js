import React, { PureComponent } from 'react';
import cx from 'classnames';
import theme from './Cross.module.css';

export default class Cross extends PureComponent {
    render() {
        const { className, onClick } = this.props;

        return (
            <div className={cx(theme.wrap, className)} onClick={onClick}>
                <div className={cx(theme.bar, theme.main)}></div>
                <div className={cx(theme.bar, theme.side)}></div>
            </div>
        );
    }
};