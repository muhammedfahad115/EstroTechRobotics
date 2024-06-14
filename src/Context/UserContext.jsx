import React, {createContext, useState } from 'react'

const MyContext = createContext();

function UserContext({children}) {
    const [text, setText] = useState('');

  return (
    <>
    <MyContext.Provider value={{text, setText}}>
        {children}
    </MyContext.Provider>
    </>
  )
}
export {MyContext};
export default UserContext