"use client"
import { createContext, useContext, useState } from "react";
export interface User{
  id:number,
  name:string,
  username:string,
  
 email:string,

}
type UserContextType = {

  all_users: User[]; //array hoga all users ka


  setall_users: React.Dispatch<React.SetStateAction<User[]>>
};

const UserContext=createContext<UserContextType | undefined>(undefined);




export const UserProvider=({children}:{children:React.ReactNode})=>{


    const [all_users,setall_users]=useState<User[]>([])



    return <UserContext.Provider value={{all_users,setall_users}}> {children }
    </UserContext.Provider>
}

export const useUser=()=>{
    const context=useContext(UserContext)
if (!context) 
    throw new Error("useUser must be used inside UserProvider");

return context;
}