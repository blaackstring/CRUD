import UsersUI from "./UsersUi";
import  api  from "@/lib/axios";

export default async function Users(){




 
        const result= await api.get(`/users`);
        console.log(result.data);
        
    return <UsersUI data={result.data}/>
}