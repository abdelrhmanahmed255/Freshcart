import { createContext, useEffect, useState } from "react";



export let UserContext  = createContext(null)


export default function UserContextProvider(props){
    const [userLogin, setUserLogin] = useState(null);
    const [userName, setUserName] = useState(null);
    useEffect(()=>{
        if(localStorage.getItem('userToken') !== null){
            setUserLogin(localStorage.getItem('userToken'))
            setUserName(localStorage.getItem('userName'))
        }
    },[])
    return <UserContext.Provider value={{userLogin,setUserLogin  ,userName, setUserName}}>
        {props.children}
        </UserContext.Provider>
        
}