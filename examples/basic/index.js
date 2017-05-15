import './main.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { convertDate } from '../../lib/time.js';
import DateTimePicker from '../../lib/index';

// import DateTimePicker from '../../dist/react-mobile-datetimepicker';


window.Perf = require('react-addons-perf');

(function main() {
    class App extends React.Component {
        state = {
            startTime: new Date(),
            endTime: new Date(),
            isOpen: false,
            theme: 'default',
        }

        handleToggle = (isOpen) => () => {
            this.setState({ isOpen });
        }

        handleThemeToggle = (theme) => () => {
            console.log(theme);
            this.setState({ theme, isOpen: true });
        }

        handleSelect = (stime, etime) => {
            this.setState({ startTime: stime, endTime: etime, isOpen: false });
        }

        render() {
            return (
                <div className="App">
                    <p className="select-time ">
                        {convertDate(this.state.startTime, 'hh:mm')}
                    </p>
                    <p className="select-time ">
                        {convertDate(this.state.endTime, 'hh:mm')}
                    </p>
                    <div>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('default')}>
                            default
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('dark')}>
                            dark
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('ios')}>
                            ios
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('android')}>
                            android
                        </a>
                        <a
                            className="select-btn sm"
                            onClick={this.handleThemeToggle('android-dark')}>
                            android-dark
                        </a>
                    </div>
                    <DateTimePicker
                        confirmTxt={'确定'}
                        cancelTxt={'放弃'}
                        startValue={this.state.startTime}
                        endValue={this.state.endTime}
                        theme={this.state.theme}
                        isOpen={this.state.isOpen}
                        onSelect={this.handleSelect}
                        onCancel={this.handleToggle(false)} />
                </div>
            );
        }
    }


    ReactDOM.render(<App />, document.getElementById('react-box'));
}());
