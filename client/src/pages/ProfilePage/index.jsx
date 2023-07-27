import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { ProfileCard, PokeGarden } from '../../components';



const ProfilePage = () => {
const {user_id} = useParams();
const [profile, setProfile] = useState({});
const token = localStorage.getItem('token')
const loggedIn = token ? true : false


 
  async function displayUser() {
    const options ={
      method: 'GET',
      headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token
      },
  }
    const resp = await fetch(`https://pokrastemon-api.onrender.com/users/${user_id}`, options);
    const data = await resp.json();
    setProfile(data)
}   

useEffect(() => {
  if (loggedIn) {
      displayUser()
  }
},[])


  return (
    <div>
      <ProfileCard profile={profile}/>
      <PokeGarden />
    </div>
  );
};

export default ProfilePage;
