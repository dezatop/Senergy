import React from 'react';
import styles from './styles.module.scss'
import classnames from "classnames";

const Input = (
    {
        register,
        name, complete = 'off',
        textLabel,
        err,
        classNames,
        typeInput = 'text',
        validation = {}
    }) => {
    return (
        <div className={classnames(styles.wrapper, classNames, {[styles.wrapperErr]: err})}>
            {textLabel && <label>{textLabel}</label>}
            <input autoComplete={complete} {...register(name, validation)} type={typeInput}/>
            <p className={styles.wrapperError}>{err && 'Min characters 3 max 10'}</p>
        </div>
    );
};

export default Input;