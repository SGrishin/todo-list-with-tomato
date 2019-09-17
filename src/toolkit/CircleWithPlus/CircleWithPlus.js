import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './CircleWithPlus.module.css';

export default class CircleWithPlus extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        className: '',
        onClick: null
    }

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
