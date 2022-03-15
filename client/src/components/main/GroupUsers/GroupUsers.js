import React from 'react';
import Button from "../../common/Button/Button";
import moment from "moment";
import Preloader from "../../common/preloader/Preloader";

const GroupUsers = ({groups, edit, preloader}) => {

    return (
        <table>
            <thead>
            <tr>
                <th>id</th>
                <th>Title Group</th>
                <th>Users</th>
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
                groups?.map(({_id, title, users, date}) => (
                    <tr key={_id}>
                        <td>
                            {_id.substr(-3, 3)}
                        </td>
                        <td>
                            {title}</td>
                        <td>
                            {users.length === 0 ? 'empty'
                                :
                                users.map(el => `${el.name} ${el.surname}/`)
                            }
                        </td>
                        <td>
                            {moment(date).format("ll")}
                        </td>
                        <td>
                            <div onClick={() => edit({title, _id}, users)}>
                                <Button text='Edit Group'/>
                            </div>
                        </td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    );
};

export default GroupUsers;