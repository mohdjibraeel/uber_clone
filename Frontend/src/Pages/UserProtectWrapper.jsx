import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserDataContext} from '../context/UserContext'

const UserProtectWrapper =({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const { userData, setUserData } = useContext(UserDataContext);

  useEffect(() => {
    // This runs AFTER the component mounts
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/login");
      return;
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setUserData(response.data.user);
        setisLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
      localStorage.removeItem("token");
      navigate("/login");
    });
  }, []);
  // Re-run if loading changes
  

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
