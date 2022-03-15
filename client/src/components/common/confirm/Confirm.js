import React, {useEffect} from 'react';
import styles from './index.module.scss'
import classNames from 'classnames'

const Confirm = ({confirmStatus, flagConfirm, setFlagConfirm}) => {

    useEffect(() => {
        setTimeout(() => {
            setFlagConfirm()
        }, 1500)
    }, [confirmStatus, flagConfirm, setFlagConfirm])

    return (
        <>
          <span className={
              classNames(styles.confirm, confirmStatus ? styles.success : styles.failed,
                  {[styles.confirmActive]: flagConfirm})}>
              {confirmStatus ? 'Success' : 'Failed'}
          </span>
        </>
    );
};

export default Confirm;