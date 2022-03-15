import React, {useEffect} from 'react';
import styles from './index.module.scss'

const PopUp = ({children, onClose, open}) => {

    useEffect(() => {
        document.querySelector('body').style.overflowY = open ? 'hidden' : 'auto';
    }, [open])

    return (
        open && <div className={styles.modal} onClick={() => onClose()}>
            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                {children}
                <div onClick={() => onClose()} className={styles.modalClose}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4L14.6 16L8 22.6L9.4 24L16 17.4L22.6 24L24 22.6L17.4 16L24 9.4Z"
                            fill="#A1A1A1"/>
                    </svg>
                </div>
            </div>
        </div>
    );
};

export default PopUp;