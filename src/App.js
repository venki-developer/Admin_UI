import './App.css';
import UserList from './components/UserList';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';


function App() {
  const dispatch = useDispatch();
const API_URL =
"https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

//   const processUsersResponse = (users)=> {
//     return users.map(user => ({
//         ...user,
//         selected:false,
//         edit:false,
//         show:true
//     }))
// } 
const  getUsers =async()=>{
  const res = await axios.get(API_URL);
  dispatch({type: 'GET_USERS',payload:res.data});
}
  useEffect(() => {
    getUsers();
  }, []);



  return (
    <div className='container w-75'>
        <UserList/>
      </div>
  );
}

export default App;
