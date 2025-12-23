'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {

  const router=useRouter()

  useEffect(()=>{

  router.push('/users');
  },[])
  const handleRoute=()=>{
    router.push('/users')
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center   justify-around p-2   font-sans ">
   
    </div>
  );
}
