import React, { useContext, useEffect } from 'react'
import { MyContext } from '../Context/UserContext';


function Device1() {
    const {subText, setSubText} = useContext(MyContext);
    useEffect(() => {
        setSubText('Device 01');
        return () => {
            setSubText('');
        }
    }, [])
  return (
    <>
    <h1>Device1</h1>
    </>
  )
}

export default Device1