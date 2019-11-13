import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import styles from './modal.module.css';
import Widget from '../Widget';

const Modal = ({
    children,
    isOpened,
    onClosed,
}) => {
    function handleBlackAreaClick(event) {
        const isModalTag = event.target.classList.contains(styles.modal);
        if (isModalTag) onClosed && onClosed();
    }
    return (
        <div
            onClick={handleBlackAreaClick}
            className={classNames(styles.modal, {
                [styles.modalActive]: isOpened,
            })}
        >
            <div>
                <Widget>{isOpened && children && children()}</Widget>
            </div>
        </div>
    );
};

Modal.propTypes = {
    isOpened: PropTypes.bool.isRequired,
    onClosed: PropTypes.func.isRequired,
    children: PropTypes.func.isRequired,
};

export default Modal;