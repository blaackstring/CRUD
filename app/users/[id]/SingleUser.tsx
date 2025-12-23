'use client';

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/context/UserContext";
import { useUser } from "@/context/UserContext";
import { useParams } from "next/navigation";

type SingleProp={
  user: User;
};

export default function SingleUser() {
  const {all_users,setall_users} = useUser();
  const router = useRouter();
  const params=useParams();
  const [isEdited,setIsEdited]=useState(false)
  const id=params?.id

  useEffect(()=>{
    all_users.map((u:User,idx)=>{
      if(u.id==Number(id))
      {
        setFormData(u);
      }
    })
  },[id])


  const [formData, setFormData] = useState<User |null >(null);
  const handleSave=(id:number| undefined)=>{
    setIsEdited((p)=>!p)  
     if (!formData) return;
    setall_users(all_users.map((u)=>u.id===id?u=formData:u))
    
  }
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData(prev => prev?{ ...prev,
      [name]: value,
    }:prev);
  };

  const handleBack=()=>{
    router.back();
  }
  const handleDelete = (id: number | undefined) => {

    setall_users(prev => prev.filter(u => u.id !== id));

    router.back();
  };
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white/15 text-white">
      <div className="p-4 rounded-lg">

        <Image src={`${process.env.NEXT_PUBLIC_IMAGE_URL}/${id}.jpg`}   alt={`/users/${formData?.id}`}
          width={150}
          height={150}
          className="rounded-full mx-auto"
        />
        {isEdited &&<span className="bg-green-500 text-black p-2 rounded-md">Editing mode on 🖋️  </span>}
        <div className="space-y-3 mt-4">
       
       <input  name="name"  value={formData?.name}
       
        onChange={handleChange} readOnly={!isEdited}  className={`w-full p-2 rounded bg-black/40 ${isEdited?'bg-white text-black':''}`}
       placeholder="Name"
          />

    <input name="username"
           value={formData?.username}  readOnly={!isEdited}  onChange={handleChange}  className={`w-full p-2 rounded bg-black/40 ${isEdited?'bg-white text-black':''}`}
            placeholder="Username"
          />
          <input
            name="email" readOnly={!isEdited}  value={formData?.email}onChange={handleChange} className={`w-full p-2 rounded bg-black/40 ${isEdited?'bg-white text-black':''}`}
   placeholder="Email"
          />

        </div>

 <div className="grid grid-cols-2 gap-2 mt-4">
  <button className="bg-green-500 p-2 rounded" onClick={()=>handleSave(formData?.id)}>
           {isEdited ? 'Save' : 'Edit'}
          </button>
              <button className="bg-red-600 p-2 rounded"   onClick={() => handleDelete(formData?.id)} >
            Delete
          </button>
          <button className="bg-white/20  p-2 rounded"   onClick={() => handleBack()} >
            Back
          </button>

        </div>
      </div>
    </div>
  );
}
