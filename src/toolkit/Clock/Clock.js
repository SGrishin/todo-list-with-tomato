import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getHourFromUTC, getMinutesFormUTC, getSecondsFromUTC } from '../../utils';
import theme from './Clock.module.css';

export default class Clock extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        startAfterMount: PropTypes.bool,
        timerTime: PropTypes.number,
        onTimerEnd: PropTypes.func
    };

    static defaultProps = {
        className: '',
        startAfterMount: false,
        timerTime: 0,
        onTimerEnd: null
    };

    constructor(props) {
        super(props);

        this.timer = null;
        this.timerEnd = null;
    }

    componentDidMount() {
        const { startAfterMount } = this.props;

        if (startAfterMount) {
            this.handleStartClock();
        }
    }

    componentDidUpdate(prevProps) {
        const { startTimer, timerTime } = this.props;

        if (startTimer && !this.timerEnd) {
            this.handleStartTimer(timerTime);

            return;
        }

        if (prevProps.startTimer && !this.props.startTimer) {
            this.handleStopTimer();
        }
    }

    render () {
        const { className } = this.props;

        return(
            <div
                ref={(clock) => {this.clock = clock;}}
                className={cx(theme.clock, className)}
            >
                <span className={cx(theme.hours)}>
                    00
                </span>
                :
                <span className={cx(theme.minutes)}>
                    00
                </span>
                :
                <span className={cx(theme.seconds)}>
                    00
                </span>
            </div>
        );
    };

    setHours = (hours) => {
        this.clock.children[0].innerHTML = hours;
    };

    setMinutes = (minutes) => {
        this.clock.children[1].innerHTML = minutes;
    };

    setSeconds = (seconds) => {
        this.clock.children[2].innerHTML = seconds;
    };
    
    handleUpdateClock = () => {
        let date = new Date();
        let hours = date.getHours();

        if (hours < 10) {
            hours = '0' + hours;
        }

        this.setHours(hours);
      
        let minutes = date.getMinutes();

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        this.setMinutes(minutes);
      
        let seconds = date.getSeconds();

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        this.setSeconds(seconds);
    };

    handleStartClock = () => {
        this.handleStopTimer();
        this.timer = setInterval(this.handleUpdateClock, 1000);
        this.handleUpdateClock();
    };

    handleStopClock = (withClearClock = false) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }

        if (withClearClock) {
            this.handleClearClock();
        }
    };

    handleClearClock = () => {
        this.setHours('00');
        this.setMinutes('00');
        this.setSeconds('00');
    };

    handleStartTimer = (time = 0) => {
        this.timerEnd = (new Date()).getTime() + time;

        this.handleStopClock();

        this.timer = setInterval(this.handleUpdateTimer, 1000);
        this.handleUpdateTimer();
    };

    handleStopTimer = (withClearClock = true) => {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
            this.timerEnd = null;
        }

        if (withClearClock) {
            this.handleClearClock();
        }
    };

    handleUpdateTimer = () => {
        const { onTimerEnd } = this.props;
        const delta = this.timerEnd - new Date();

        if (delta <= 0) {
            this.handleStopTimer();

            if (onTimerEnd) {
                onTimerEnd();
            }

            return;
        }

        let hours = getHourFromUTC(delta);

        if (hours < 10) {
            hours = '0' + hours;
        }

        this.setHours(hours);
      
        let minutes = getMinutesFormUTC(delta);

        if (minutes < 10) {
            minutes = '0' + minutes;
        }

        this.setMinutes(minutes);
      
        let seconds = getSecondsFromUTC(delta);

        if (seconds < 10) {
            seconds = '0' + seconds;
        }

        this.setSeconds(seconds);
    };
};
