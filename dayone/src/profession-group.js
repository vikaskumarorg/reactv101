import AddProfession from "./AddProfession";
import { useState } from "react";

function Professions({users: initialUsers, heading}){
const [users, setUsers] = useState(initialUsers);
var i = 1;
    function fnProfession(){
        i = i+6;
        setUsers([...users, {
            id: i +"_"+ heading,
            name: 'Almanss  Katherine Johnson',
            profession: heading,
        }])
    }
    return (
        <>
        <h2>{heading}</h2>
        <ul>
        {users.map((u)=> <li key={u.id}>{u.name}</li>)}
        </ul>
        <AddProfession onClickProfession={fnProfession} heading={heading}></AddProfession>
        </>
    )

}
export default Professions;

