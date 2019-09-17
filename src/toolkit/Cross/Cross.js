import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './Cross.module.css';

export default class Cross extends PureComponent {
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
            <div className={cx(theme.wrap, className)} onClick={onClick}>
                <div className={cx(theme.bar, theme.main)}></div>
                <div className={cx(theme.bar, theme.side)}></div>
            </div>
        );
    }
};