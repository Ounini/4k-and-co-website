import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

function Profile() {
  const [currentUser, setCurrentUser] = useState({});
  const token = localStorage.getItem("token");
  const decodedToken = jwtDecode(token);
  const userId = decodedToken.userId;

  useEffect(() => {
    const getUser = async () => {
      const res = await axios.get(`/_/backend/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCurrentUser(res.data);
    };
    getUser();
  }, [token, userId]);

  return (
    <div>
      <h1>User Profile</h1>

      <ul>
        <li>Name: {currentUser.name}</li>
        <li>Age: {currentUser.age}</li>
        <li>Email: {currentUser.email}</li>
      </ul>
    </div>
  );
}

export default Profile;
