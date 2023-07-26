import React, {useState, useEffect} from 'react';
import { useParams } from 'react-router';
import { ProfileCard } from '../../components';


const ProfilePage = () => {
const {id} = useParams();
const [profile, setProfile] = useState([]);


useEffect(() => {

  async function displayUser() {
    const resp = await fetch(`https://pokrastemon-api.onrender.com/users/${id}`);
    const data = await resp.json();
    setProfile(data)
}

displayUser();

}, []);

  return (
    <div>
      <ProfileCard profile={profile}/>
    </div>
  );
};

export default ProfilePage;
