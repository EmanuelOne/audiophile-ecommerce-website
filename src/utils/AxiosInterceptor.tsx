import React from 'react'
import axios, { AxiosRequestConfig } from 'axios'
// import { GetStorage } from 'components/session/Storage';
// import AxiosConfig from "@types/axios";
const AxiosProvider = ({ children }: { children: React.ReactNode }) => {
  // Add a request interceptor
  // console.log(history);
  // const path = location.pathname;
  axios.interceptors.request.use(
    function (config: AxiosRequestConfig) {
      // console.log('AxiosProvider');
      // Do something before request is sent

      //   const header = config.headers.Authorization;

      console.log(config)
      //   const token = GetStorage('access_token');
      //   // console.log("token", token);
      //   config.headers = {
      //     ...header,
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${token}`,
      //     'Access-Control-Allow-Origin': '*',
      //   };
      // console.log(config, "config");
      // console.log(config.headers);

      //   console.log(config);
      return config
    },
    function (error) {
      // Do something with request error
      // console.info(error.response, "request");
      return Promise.reject(error)
    }
  )

  // Add a response interceptor
  axios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data

      //   console.log(response, "response");
      return response
    },
    function (error) {
      // console.log(error.message);
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      if (error && error.response !== undefined) {
        if (error.response.status === 401) {
          console.log(error.response)
          //   toast.error('Session Expired');
          // history.push(`/login?redirect=${path}`);
          //   navigate('/login');
        }
      }
      // console.log("token expired");
      // console.log(error.response);
      return Promise.reject(error)
    }
  )
  return <>{children}</>
}

export default AxiosProvider
