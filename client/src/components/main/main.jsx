import React, {useEffect, useState} from 'react';
import styles from './index.module.scss'
import Button from "../common/Button/Button";
import Navigation from "./navigation/Navigation";
import InfoUsers from "./InfoUsers/InfoUsers";
import GroupUsers from "./GroupUsers/GroupUsers";
import PopUp from "../common/PopUp/PopUp";
import Input from "../common/Input/Input";
import {useForm} from "react-hook-form";
import GroupService from '../../http/GroupService'
import UserService from '../../http/UserService'
import DropDown from "../common/DropDown/DropDown";
import Confirm from "../common/confirm/Confirm";

const Main = () => {
    const [delButton, setDelButton] = useState(false)
    const [flagDel, setFlagDel] = useState(false)
    const [flagEdit, setFlagEdit] = useState(false)
    const [arrayGroup, setArrayGroup] = useState([])
    const [selectedGroup, setSelectedGroup] = useState([])
    const [users, setUsers] = useState([])
    const [groups, setGroups] = useState([])

    const [openModal, setOpenModal] = useState(false)
    const [confirm, setConfirm] = useState(false)
    const [flagConfirm, setFlagConfirm] = useState(false)
    const [preloader, setPreloader] = useState(false)
    const [viewTab, setViewTab] = useState(true)
    const [drop, setDrop] = useState(false)

    const {register, handleSubmit, formState: {errors}, reset} = useForm();

    const onSubmitUser = async (data) => {
        if (flagDel) {
            const response = await UserService.delUser(data._id)
            checkError(response?.status, () => setUsers(users.filter(el => el._id !== data._id)))
        } else {
            data.groups = []
            selectedGroup.forEach(({_id}) => data.groups.push(_id))
            if (viewTab && !flagEdit) {
                const {name, surname, groups} = data
                const response = await UserService.createUser({name, surname, groups})
                checkError(response?.status, () => setUsers([...users, ...response.data]))
            } else {
                const response = await UserService.upUser(data)
                checkError(response?.status,
                    () => setUsers(filterArray(users, data, {groups: selectedGroup})))
            }
        }
    };

    const onSubmitGroup = async data => {
        if (flagDel) {
            const response = await GroupService.delGroup(data._id)
            checkError(response?.status, () => setGroups(groups.filter(el => el._id !== data._id)))
            setFlagDel(false)
        } else {
            data.users = []
            selectedGroup.forEach(({_id}) => data.users.push(_id))

            if (!viewTab && !flagEdit) {
                const response = await GroupService.createGroup({title: data.title, users: data.users})
                checkError(response?.status, () => setGroups([...groups, ...response.data]))
            } else if (!viewTab && flagEdit) {
                const response = await GroupService.putGroup(data)
                data.users = selectedGroup
                checkError(response?.status,
                    () => setGroups([...groups.filter(elem => elem._id !== data._id), data]))
            }
        }
    };

    const handleClickModal = async () => {
        resetSettings()
        setArrayGroup(viewTab ? groups : users)
    }

    const handleClickDropLi = (target) => {
        setArrayGroup(arrayGroup.filter(el => el._id !== target._id))
        setSelectedGroup([...selectedGroup, target])
    }

    const editElement = (res, arraySelectValue, flag = false) => {
        reset(res)
        setDelButton(true)
        setSelectedGroup(arraySelectValue)
        setOpenModal(!openModal)
        let filtersUsers = !flag ? users : groups
        for (let value of arraySelectValue) {
            filtersUsers = filtersUsers.filter(el => el._id !== value._id)
        }
        setArrayGroup(filtersUsers)
        setFlagEdit(true)
    }

    const delSelectGroup = (target) => {
        setSelectedGroup(selectedGroup.filter(el => el._id !== target._id))
        setArrayGroup([...arrayGroup, target])
    }

    const titleButton = () => {
        if (viewTab && !flagEdit) return 'Create Users'
        if (viewTab && flagEdit) return 'Edit User'
        if (!viewTab && !flagEdit) return 'Create Group'
        if (!viewTab && flagEdit) return 'Edit Group'
    }

    function filterArray(array, data, childArray) {
        let filterArray = []
        for (let value of array) {
            if (value._id === data._id) {
                filterArray.push({...data, ...childArray, date: value?.date})
            } else filterArray.push(value)
        }
        return filterArray
    }

    function checkError(status, action) {
        if (status < 230) {
            resetSettings()
            setFlagConfirm(true)
            setConfirm(true)
            action && action()
        } else {
            setFlagConfirm(true)
            setConfirm(false)
        }
    }

    function resetSettings() {
        reset({name: '', surname: '', title: ''})
        setSelectedGroup([])
        setDelButton(false)
        setFlagEdit(false)
        setFlagDel(false)
        setDrop(false)
        setOpenModal(!openModal)
    }

    async function updateTable() {
        if (viewTab) {
            setPreloader(true)
            const responseGroup = await GroupService.getGroup()
            setGroups(responseGroup?.data)
            setPreloader(false)
        } else {
            setPreloader(true)
            const response = await UserService.getUser()
            setUsers(response?.data)
            setPreloader(false)
        }
    }

    useEffect( () => {
        async function getParam () {
            setPreloader(true)
            const response = await UserService.getUser()
            const responseGroup = await GroupService.getGroup()
            setUsers(response?.data)
            setGroups(responseGroup?.data)
            setPreloader(false)
        }
        getParam()
    }, [])

    return (
        <section>
            <Navigation
                upTable={updateTable}
                valueTab={viewTab}
                switchTab={setViewTab}
            />
            <div className={styles.addUser}>
                <Button
                    OnClick={() => handleClickModal()}
                    text={viewTab ? 'Add user' : 'Create Group'}
                />
            </div>
            <div className={styles.wpTable}>
                {viewTab &&
                <InfoUsers
                    preloader={preloader}
                    edit={editElement}
                    users={users}
                />
                }
                {!viewTab &&
                <GroupUsers
                    preloader={preloader}
                    edit={editElement}
                    groups={groups}
                />}
            </div>

            {/*-----------------------------------------PopUP---------------------------------------------*/}
            <PopUp open={openModal} onClose={() => setOpenModal(!openModal)}>
                <div className={styles.wrapUsInfo}>
                    <form onSubmit={handleSubmit(viewTab ? onSubmitUser : onSubmitGroup)}>
                        <Input
                            textLabel={viewTab ? 'User Name' : 'Group name'}
                            register={register}
                            name={viewTab ? 'name' : 'title'}
                            err={viewTab ? errors.name : errors.title}
                            validation={{required: true, min: 3, max: 10}}
                        />
                        {viewTab &&
                        <Input
                            textLabel='Surname'
                            register={register}
                            name='surname'
                            err={errors.surname}
                            validation={{required: true, min: 3, max: 10}}
                        />
                        }
                        <Input
                            typeInput='hidden'
                            register={register}
                            name='_id'
                        />
                        <DropDown
                            handleClickLi={handleClickDropLi}
                            arrayGroup={arrayGroup}
                            onOpen={() => setDrop(!drop)}
                            open={drop}
                            selectedGroup={selectedGroup}
                            delSelectGroup={delSelectGroup}
                            usersGroup={viewTab ? false : true}
                        />

                        <Button
                            externalClass={styles.buttonAddUser}
                            type='submit'
                            text={titleButton()}
                        />
                        {delButton &&
                        <Button
                            OnClick={() => setFlagDel(true)}
                            externalClass={styles.delButton}
                            type='submit'
                            text='Delete'
                        />}
                    </form>
                </div>
            </PopUp>
            <Confirm
                flagConfirm={flagConfirm}
                setFlagConfirm={() => setFlagConfirm(false)}
                confirmStatus={confirm}/>
        </section>
    );
};

export default Main;