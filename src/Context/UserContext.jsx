import React, {createContext, useEffect, useState } from 'react'

const MyContext = createContext();

function UserContext({children}) {
    const [text, setText] = useState('');
    const [showSideBar, setShowSideBar] = useState(true);

    useEffect(() => {
        localStorage.setItem('text', text);
    }, [text]);


  return (
    <>
    <MyContext.Provider value={{text, setText, showSideBar, setShowSideBar}}>
        {children}
    </MyContext.Provider>
    </>
  )
}
export {MyContext};
export default UserContext