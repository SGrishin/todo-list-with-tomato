import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './Button.module.css';

export default class Button extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        label: PropTypes.string,
        onClick: PropTypes.func
    };

    static defaultProps = {
        className: '',
        label: 'Add',
        onClick: null
    }

    render() {
        const { className, label, onClick } = this.props;

        return (
            <div className={cx(theme.button, className)} onClick={onClick}>
                <div className={cx(theme.label)} >
                    {label}
                </div>
            </div>
        );
    }
};
