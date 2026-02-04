import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {CaptainDataContext} from '../context/CaptainContext'

const CaptainProtectWrapper =({ children }) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [isLoading, setisLoading] = useState(true);
  const { captainData, setCaptainData } = useContext(CaptainDataContext);
  
  useEffect(() => {
    // This runs AFTER the component mounts
    if (!token) {
      console.log("No token found, redirecting to login...");
      navigate("/captain-login");
      return;
    }
    axios.get(`${import.meta.env.VITE_BASE_URL}/captains/profile`, {
      headers: {
        Authorization: `bearer ${token}`,
      },
    })
    .then((response) => {
      if (response.status === 200) {
        setCaptainData(response.data.captain);
        setisLoading(false);
      }
    })
    .catch((error) => {
      console.error("Error fetching captain profile:", error);
      localStorage.removeItem("token");
      navigate("/captain-login");
    });
  }, []);
  // Re-run if loading changes
  

  if (isLoading) {
    return <div>Loading...</div>; // Or a loading spinner
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
