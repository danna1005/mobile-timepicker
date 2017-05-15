/**
 * @module DatePicker Component
 */

import React, { Component, PropTypes } from 'react';
import DatePickerItem from './DatePickerItem.js';
import PureRender from './pureRender.js';
import { convertDate, nextDate } from './time.js';

/**
 * Class DatePicker Component Class
 * @extends Component
 */
class IntervalTimePicker extends Component {
    constructor(props) {
        super(props);
        this.state = {
            startValue: nextDate(this.props.startValue),
            endValue: nextDate(this.props.endValue),
        };

        this.handleFinishBtnClick = this.handleFinishBtnClick.bind(this);
        this.handleStartDateSelect = this.handleStartDateSelect.bind(this);
        this.handleEndDateSelect = this.handleEndDateSelect.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        // update value of state
        const startDate = nextDate(nextProps.startValue);
        const endDate = nextDate(nextProps.endValue);
        if (startDate.getTime() !== this.state.startValue.getTime()) {
            this.setState({ startValue: startDate });
        }
        if (endDate.getTime() !== this.state.endValue.getTime()) {
            this.setState({ endDate: endDate });
        }
    }

    /**
     * Optimization component, Prevents unnecessary rendering
     * Only props or state change or value before re-rendering
     *
     * @param  {Object} nextProps next props
     * @param  {Object} nextState next state
     * @return {Boolean}          Whether re-rendering
     */
    shouldComponentUpdate(nextProps, nextState) {
        const startDate = nextDate(nextProps.startValue);
        const endDate = nextDate(nextProps.endValue);
        return startDate.getTime() !== this.state.startValue.getTime() || endDate.getTime() !== this.state.endValue.getTime() ||
                PureRender.shouldComponentUpdate(nextProps, nextState, this.props, this.state);
    }

    /**
     * 点击完成按钮事件
     * @return {undefined}
     */
    handleFinishBtnClick() {
        this.props.onSelect(this.state.startValue, this.state.endValue);
    }

    /**
     * 选择下一个日期
     * @return {undefined}
     */
    handleStartDateSelect(value) {
        this.setState({ startValue: value });
    }

    handleEndDateSelect(value) {
        this.setState({ endValue: value });
    }
    /**
     * render函数
     * @return {Object} JSX对象
     */
    render() {
        const { min, max, theme, dateFormat, confirmTxt, cancelTxt } = this.props;
        const {startValue, endValue} = this.state;
        const themeClassName =
            ['default', 'dark', 'ios', 'android', 'android-dark'].indexOf(theme) === -1 ?
            'default' : theme;
        return (
            <div
                className={`datepicker ${themeClassName}`}>
                <div style={{display: 'flex'}}>
                <div className="datepicker-content">
                    <DatePickerItem
                        value={startValue}
                        min={min}
                        max={max}
                        typeName="Hour"
                        format={dateFormat[3]}
                        onSelect={this.handleStartDateSelect} />
                    <div className="symbol-item">:</div>
                    <DatePickerItem
                        value={startValue}
                        min={min}
                        max={max}
                        typeName="Minute"
                        format={dateFormat[4]}
                        onSelect={this.handleStartDateSelect} />
                </div>
                <div className={`symbol-item ${themeClassName}-symbol-item`}>-</div>
                <div className="datepicker-content">
                    <DatePickerItem
                        value={endValue}
                        min={min}
                        max={max}
                        typeName="Hour"
                        format={dateFormat[3]}
                        onSelect={this.handleEndDateSelect} />
                    <div className="symbol-item">:</div>
                    <DatePickerItem
                        value={endValue}
                        min={min}
                        max={max}
                        typeName="Minute"
                        format={dateFormat[4]}
                        onSelect={this.handleEndDateSelect} />
                </div>
                </div>
                <div className="datepicker-navbar">
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.handleFinishBtnClick}>{ confirmTxt ? confirmTxt : '完成'}</a>
                    <a
                        className="datepicker-navbar-btn"
                        onClick={this.props.onCancel}>{ cancelTxt ? cancelTxt : '取消'}</a>
                </div>
            </div>
        );
    }
 }

IntervalTimePicker.propTypes = {
    theme: PropTypes.string,
    startValue: PropTypes.object,
    endValue: PropTypes.object,
    min: PropTypes.object,
    max: PropTypes.object,
    dateFormat: PropTypes.array,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};

export default IntervalTimePicker;
