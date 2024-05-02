import {useState, useEffect} from 'react';
import apiClient from './services/api-client';
import RouteList from './RouteList';
import { BrowserRouter } from 'react-router-dom';
import NavBar from './NavBar';
import useLocalStorage from './hooks/useLocalStorage';
import JoblyApi from './services/api';
import jwt from 'jsonwebtoken';
import React from "react";
import LoadingSpinner from './common/LoadingSpinner';
import UserContext from "./auth/UserContext";
export const TOKEN_STORAGE_ID = "jobly-token"

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  useEffect(function loadUserInfo(){

    async function getCurrentUser(){
      if(token){
        try {
          let {username} = jwt.decode(token);
          JoblyApi.token = token;
          let currentUser = await JoblyApi.getCurrentUser(username);
          setCurrentUser(currentUser);
          setApplicationIds(new Set(currentUser.applications));
        } catch (err){
          setCurrentUser(null)
        }
      }
      setInfoLoaded(true)
    }

    setInfoLoaded(false);
    getCurrentUser();
  }, [token])

  function logout(){
    setCurrentUser(null);
    setToken(null);
  }

  async function signup (signupData){
    try{
      let token = await JoblyApi.signup(signupData);
      setToken(token);
      return {success: true}
    } catch (err) {
      console.error("Signup Failed", err);
      return {sucess: false, err}
    }
  }

  async function login(loginData){
    try{
      let token = await JoblyApi.login(loginData);
      setToken(token);
      return {success : true}
    } catch (err) {
      console.error("signup failed", err);
      return {success : false, err}
    }
  }

  function hasAppliedToJob(id){
    return applicationIds.has(id);
  }

  async function applyToJob(id){
    if(hasAppliedToJob(id)) return;
    const jobAp = await JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!infoLoaded) return <LoadingSpinner/>;

  return (
    <div className="App">
      <BrowserRouter>
        <UserContext.Provider
          value = {
            {currentUser, 
            setCurrentUser, 
            hasAppliedToJob, 
            applyToJob}}
        >
          <NavBar logout = {logout}/>
          <RouteList login={login} signup={signup}/> 

        </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
