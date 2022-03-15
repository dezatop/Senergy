import React from 'react';
import Button from "../../common/Button/Button";
import moment from 'moment';
import Preloader from "../../common/preloader/Preloader";


const InfoUsers = ({users, edit, preloader}) => {

    return (
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Name</th>
                <th>Group</th>
                <th>Created</th>
                <th>Actions</th>
            </tr>
            </thead>
            <tbody>
            {preloader ?
                <tr>
                    <td style={{border: 'none'}}><Preloader/></td>
                </tr>
                :
                users?.map(({_id, name, surname, groups, date}) => (
                    <tr key={_id}>
                        <td>
                            {_id.substr(-3, 3)}
                        </td>
                        <td>
                            {name} {surname}
                        </td>
                        <td>
                            {groups.length === 0 ? 'empty'
                                :
                                groups.map(el => `${el.title}/`)
                            }
                        </td>
                        <td>
                            {moment(date).format("ll")}
                        </td>
                        <td>
                            <div onClick={() => edit({name, surname, _id}, groups, true)}>
                                <Button text='Edit User'/>
                            </div>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default InfoUsers;