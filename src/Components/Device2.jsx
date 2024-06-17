import React, { useContext, useEffect } from 'react'
import { MyContext } from '../Context/UserContext'

function Device2() {
    const {subText, setSubText} = useContext(MyContext);
    useEffect(() => {
        setSubText('Device 02');
        return () => {
            setSubText('');
        }
    })
  return (
    <div>Device2</div>
  )
}

export default Device2