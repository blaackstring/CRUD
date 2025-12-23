'use client';

import api from "@/lib/axios";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useUser } from "@/context/UserContext";
import type { User } from "@/context/UserContext";
import Image from "next/image";

export default function SingleUser({ user }: { user: User }) {
  const { all_users, setall_users } = useUser();
  const router = useRouter();
  const params = useParams();
  const id = Number(params.id);
const [isEdited,setIsEdited]=useState(false)
  const [formData, setFormData] = useState<User | null>(user);

  useEffect(() => {
    const found = all_users.find(u => u.id === id);
    if (found) setFormData(found);
  }, [id, all_users]);

  const handleSave = async (id:number) => {
    if (!formData) return;

    setall_users(prev =>prev.map(u => (u.id === id ? formData : u)));

    setIsEdited(false);

    try {
      
      await api.put(`/users/${id}`, formData);
    } catch (e) {
      console.error("Update failed");
    }
  };

  const handleChange = (e:React.ChangeEvent<HTMLInputElement> ) => { 
    const { name, value } = e.target;
   setFormData(prev => prev?{ ...prev, [name]: value, }:prev); 
  
  };
  const handleDelete = async (id:number) => {
    setall_users(prev => prev.filter(u => u.id !== id));

    try {
      await api.delete(`/users/${id}`);
    } catch (e) {
      console.error("Delete failed");
    }

    router.back();
  };
  const handleBack=()=>{ router.back(); }

  if (!formData) return <div>Loading...</div>;
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
  {isEdited?<button className="bg-green-500 p-2 rounded" onClick={()=>handleSave(formData?.id)}>
           Save
          </button>:
          <button className="bg-green-500 p-2 rounded" onClick={()=>setIsEdited((p)=>!p)}>
           Edit
          </button>
          }

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
