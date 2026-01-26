function Professions({users, heading}){
    
    return (
        <>
        <h2>{heading}</h2>
        <ul>
        {users.map(u => <li key="{u.id}">{u.name}</li>)}
        </ul>
        </>
    )

}
export default Professions;