import React from 'react'

const useApi = () => {
    const url = process.env.REACT_APP_BASEURL || "http://localhost:3500";
  return url
}

export default useApi
