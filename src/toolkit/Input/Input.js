import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import theme from './Input.module.css';

export default class Input extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        inputRef: PropTypes.node,
        label: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    };
    static defaultProps = {
        className: '',
        inputRef: null,
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
                className={cx(theme.input, className)}
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
