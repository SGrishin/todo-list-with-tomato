import React, { PureComponent } from 'react';
import cx from 'classnames';
import theme from './Input.module.css';

export default class Input extends PureComponent {
    defaultProps = {
        label: '',
        value: '',
        onChange: null
    };

    render() {
        const { className, label, value } = this.props;

        return (
            <input className={cx(className)} placeholder={label} value={value} onChange={this.handleChange}/>
        );
    }

    handleChange = (event) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event.target.value);
        }
    };
};
