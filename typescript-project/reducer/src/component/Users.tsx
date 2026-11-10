import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "../store/hooks";
import { fetchUsers,  addUser } from "../features/users/userslice";
import { sampleUser } from "../features/users/usersTypes";

function Users() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users.users);
  const loading = useAppSelector((state) => state.users.loading);
  const error = useAppSelector((state) => state.users.error);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div style={{ textAlign: "left" }}>
      <h5>Redux Toolkit Users</h5>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}  

<div><button onClick={() => dispatch(addUser(sampleUser))}>Add User</button></div>
        <ul style={{ listStyleType: "none", margin: 0, padding: 0 }}>    
        {users.map((user) => (  
            <li key={user.id}>
                <p>Name : <img src={user.imageUrl} alt={user.name} style={{width:'30px'}} /> {user.name}</p>
                <p>Tenant : {user.tenantShortName}</p>
            </li>
        ))}
        </ul>
    </div>
  );
}

export { Users };