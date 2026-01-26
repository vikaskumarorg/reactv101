import AddProfession from "./AddProfession";

function Professions({users, heading}){
var index = 1;
    function profession(){
        index++;
        users.push({
            id: (index) +"_"+ heading,
            name: 'Almanss  Katherine Johnson',
            profession: heading,
        })

        
    }
    return (
        <>
        <h2>{heading}</h2>
        <ul>
        {users.map(u => <li key="{u.id}">{u.name}</li>)}
        </ul>
        <AddProfession onClickProfession={profession} heading={heading}></AddProfession>
        </>
    )

}
export default Professions;

