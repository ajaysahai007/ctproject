import React, { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import apiConfig from 'src/APIconfig/ApiConfig'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

export const AuthContext = createContext()

const setSession = (accessToken) => {
  if (accessToken) {
    localStorage.setItem('creatturAccessToken', accessToken)
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`
  } else {
    localStorage.removeItem('creatturAccessToken')
    delete axios.defaults.headers.common.Authorization
  }
}

function checkLogin() {
  const accessToken = window.sessionStorage.getItem('token')
  return accessToken ? true : false
}

export default function AuthProvider(props) {
  const [isLogin, setIsLogin] = useState(checkLogin())
  const history = useHistory()
  const [userData, setUserData] = useState({})
  const [searchToken, setSearchToken] = useState('')
  const [theme, setTheme] = useState(true)
  const token = window.sessionStorage.getItem('token')
  const getProfileHandler = async (accessToken) => {
    try {
      const res = await axios({
        method: 'GET',
        url: apiConfig.profile,
        headers: {
          token: accessToken,
        },
      })
      if (res.data.responseCode === 200) {
        setUserData(res.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (token) {
      getProfileHandler(token)
    }
  }, [window.sessionStorage.getItem('token')])

  const getPolygonContractDetailsHandler = async (searchKey) => {
    try {
      const res = await axios({
        method: 'GET',
        url: apiConfig.getPolygonContractDetails,
        headers: {
          token: token,
        },
        params: {
          contractAddress: searchKey,
        },
      })
      if (res.data.responseCode === 200) {
        console.log('finalDAta*****', res.data.result)
      }
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(() => {
    if (searchToken !== '') {
      if (token) {
        getPolygonContractDetailsHandler(searchToken)
      } else {
        toast.warn('Please login first!!')
      }
    }
  }, [searchToken, token])

  let data = {
    userLoggedIn: isLogin,
    userData,
    searchToken,
    theme,
    setTheme: (data) => setTheme(data),
    setSearchToken: (data) => setSearchToken(data),
    userLogIn: (type, data) => {
      setSession(data)
      setIsLogin(type)
    },
    getProfileHandler: (data) => getProfileHandler(data),
  }

  return (
    <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
  )
}
