import React, { PureComponent } from 'react';
import cx from 'react';

export default class Icon extends PureComponent {
    render() {
        const { className, onClick } = this.props;

        return (
            <div className={cx(className)} onClick={onClick}>
                
            </div>
        );
    }
};