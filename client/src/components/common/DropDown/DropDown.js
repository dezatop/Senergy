import React from 'react';
import styles from './index.module.scss'

const DropDown = (
    {
        onOpen,
        open,
        arrayGroup,
        handleClickLi,
        usersGroup = false,
        selectedGroup,
        delSelectGroup
    }) => {

    return (
        <>
            <div>
                <p className={styles.titleGroup}>{!usersGroup ? 'Group' : 'Users'}</p>
                <div
                    onClick={() => onOpen()}
                    className={styles.groupName}>
                    {!usersGroup ?
                        <p>
                            {arrayGroup?.length !== 0 ? arrayGroup[0].title : 'empty'}
                        </p>
                        :
                        <p>
                            {arrayGroup?.length !== 0 ?
                                `${arrayGroup[0].name} ${arrayGroup[0].surname}`
                                : 'empty'
                            }
                        </p>
                    }
                    <svg width="5" height="8" viewBox="0 0 5 8" fill="none"
                         xmlns="http://www.w3.org/2000/svg" className="rotate-arrow">
                        <path d="M0.5 0.25L5 4L0.5 7.75L0.5 0.25Z" fill="#4F4F4F"></path>
                    </svg>
                    {(open && arrayGroup?.length !== 0)
                    && <div className={styles.groupNameDrop}>
                        <ul>
                            {!usersGroup ?
                                arrayGroup.map((el, ind) => (
                                    <li key={ind} onClick={() => handleClickLi(el)}>
                                        {el.title}
                                    </li>
                                ))
                                :
                                arrayGroup.map((el, ind) => (
                                    <li key={ind * 2} onClick={() => handleClickLi(el)}>
                                        {el.name} {el.surname}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>}
                </div>
            </div>
            {selectedGroup.length !== 0 &&
            <div className={styles.selectGroup}>
                {selectedGroup.map((el, ind) => (
                    <div key={ind}>
                        {!usersGroup ?
                            <span>{el.title}</span>
                            :
                            <span>{el.name} {el.surname}</span>
                        }
                        <svg onClick={() => delSelectGroup(el)} width="16" height="16"
                             viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M24 9.4L22.6 8L16 14.6L9.4 8L8 9.4L14.6 16L8 22.6L9.4 24L16 17.4L22.6 24L24 22.6L17.4 16L24 9.4Z"
                                fill="#A1A1A1"/>
                        </svg>
                    </div>
                ))}
            </div>
            }
        </>
    );
};

export default DropDown;