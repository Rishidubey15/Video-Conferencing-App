import axios from "axios";
import httpStatus from "http-status";
import { useNavigate } from "react-router-dom";
import { createContext, useContext, useState } from "react";
import { server } from "../environment";
import PropTypes from "prop-types";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: `${server}/api/v1/users`
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    const[userData, setUserData] = useState(authContext);

    // const router = useNavigate();


    const handleRegister = async(name, username, password) => 
        {
        try {
            let request = await client.post("/register", {
                name: name,
                username: username,
                password: password
            })
            console.log(request);

            if(request.status == httpStatus.CREATED){
                await handleLogin(username, password);
                return request.data.message;
            }
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
    }

    const handleLogin = async(username, password) => 
        {
        try {
            let request = await client.post("/login", {
                username: username,
                password: password
            })

            console.log("Login response:", request.data)

            if(request.status == httpStatus.OK){
                localStorage.setItem("token", request.data.token)
                localStorage.setItem("username", request.data.name)
                console.log("Stored username:", request.data.name)

                return request.data;
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw error;   
        }
    }
    
    const getHistoryOfUser = async () => {
        try {
          const token = localStorage.getItem("token");
          if (!token) {
            throw new Error("No token found");
          }
      
          const response = await client.get(`/get_all_activity?token=${token}`);
          console.log("History API response:", response.data);
          return response.data;
        } catch (error) {
          console.error("Error fetching user history:", error);
          throw error;
        }
      };

    const addToUserHistory = async (meetingCode) => {
        try {
            let request = await client.post("/add_to_activity", {
                token: localStorage.getItem("token"),
                meeting_code: meetingCode
            });
            return request
        } catch (error) {
            console.error("Error adding to user history:", error);
            throw error;
        }
    }
    
    const data = {
        userData, setUserData,addToUserHistory, getHistoryOfUser, handleRegister, handleLogin
    }

    return(
        <AuthContext.Provider value = {data}>{children}</AuthContext.Provider>
    )
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
