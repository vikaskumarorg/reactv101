

function AddProfession({onClickProfession, heading}){
    return (
    <p>   
    <button className="btn btn-primary" onClick={onClickProfession}>Add a {heading}</button>
    </p>
    )
}
export default AddProfession;