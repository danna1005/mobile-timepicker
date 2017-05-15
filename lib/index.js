import './index.css';
import React, { PropTypes } from 'react';
// import DateTimePicker from './DatePicker.js';
import DateTimePicker from './IntervalTimePicker.js';
import Modal from './Modal.js';


function EnhanceDateTimePicker({ isOpen, ...props }) {
    function onModalClose(event) {
        if (event.target === event.currentTarget) {
            props.onCancel();
        }
    }

    return (
        <div
            style={{ display: isOpen ? '' : 'none' }}
            onClick={onModalClose}
            className="datepicker-modal">
            <DateTimePicker {...props} />
        </div>
    );
}


function ModalDateTimePicker({ isPopup, ...props }) {
    if (!isPopup) {
        return <DateTimePicker {...props} />;
    }

    return (
        <Modal {...props}>
            <EnhanceDateTimePicker />
        </Modal>
    );
}

ModalDateTimePicker.propTypes = {
    isPopup: PropTypes.bool,
    isOpen: PropTypes.bool,
    theme: PropTypes.string,
    value: PropTypes.object,
    min: PropTypes.object,
    max: PropTypes.object,
    dateFormat: PropTypes.array,
    onSelect: PropTypes.func,
    onCancel: PropTypes.func,
};

ModalDateTimePicker.defaultProps = {
    isPopup: true,
    isOpen: false,
    theme: 'default',
    value: new Date(),
    min: new Date(1970, 0, 1),
    max: new Date(2050, 0, 1, 23, 59),
    dateFormat: ['YYYY', 'M', 'D', 'hh', 'mm'],
    onSelect: () => {},
    onCancel: () => {},
};

export default ModalDateTimePicker;
