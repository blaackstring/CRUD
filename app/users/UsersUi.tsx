'use client'

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User,useUser } from "@/context/UserContext";
//  it is a servr side compoennt not CS(client side)



export default  function UsersUI(data:{data:[User]}){
   const {all_users,setall_users}=useUser();
   const router=useRouter();

 useEffect(() => {
  if (all_users.length === 0) {
    setall_users(data.data);
  }
}, [data, all_users.length]);

useEffect(() => {
  console.log(all_users);
}, [all_users]);


 const handleView=(id:number)=>{
       router.push(`/users/${id}`) ;        
 }


   
    return <div className="w-full h-max  p-10">

     <div className="w-full h-full grid  grid-cols-1  lg:grid-cols-4 gap-4 lg:grid-rows-3 text-white ">
          {all_users?.map((user:User,idx:number)=>{
         return <div key={idx} className="w-75 h-80 rounded-xl bg-white/15 flex flex-col items-center justify-center p-2">
            <div>
                <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${idx+1}.jpg`} alt={`/users/${user.id}`} width={150} height={150} className="rounded-full"/>
            </div>
            <div className="grid grid-rows-3 gap-1 mb-2 mt-2 bg-black/40 p-2 rounded-md">
                 <span>Name:{' '}{user.name}</span>
             <span>Username:{' '} {user.username}</span>
             <span>Email:{' '}{user.email}</span>
            </div>
          <div className="w-full  grid  grid-rows-1   gap-2">
               <button className="bg-green-500 rounded-xl p-1 " onClick={()=>handleView(user.id)}>View</button>
               
          </div>
         </div>
       })}
     </div>
    </div>
}