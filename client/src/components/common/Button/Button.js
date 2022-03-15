import React from 'react';
import styles from './index.module.scss'
import classNames from 'classnames'

const Button = ({text, type = 'button', externalClass, OnClick}) => {
    return (
        <button
            onClick={() => OnClick && OnClick()}
            type={type}
            className={classNames(styles.customButton, externalClass)}>
            {text}
        </button>
    );
};

export default Button;