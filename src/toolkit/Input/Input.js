import React, { PureComponent } from 'react';
import cx from 'classnames';
import theme from './Input.module.css';

export default class Input extends PureComponent {
    static defaultProps = {
        label: '',
        value: '',
        onChange: null
    };

    constructor(props) {
        super(props);

        this.inputRef = props.inputRef || React.createRef();
    }

    render() {
        const { className, label, value } = this.props;

        return (
            <input
                ref={this.inputRef}
                className={cx(className)}
                placeholder={label}
                value={value}
                autoFocus
                onChange={this.handleChange}
            />
        );
    }

    handleChange = (event) => {
        const { onChange } = this.props;

        if (onChange) {
            onChange(event.target.value);
        }
    };
};
