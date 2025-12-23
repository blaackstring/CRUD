   export const dynamic = "force-dynamic";
   import axios from "axios";
import UsersUI from "./UsersUi";

export default async function Users(){




 
        const result= await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/users`);
        console.log(result.data);
        
    return <UsersUI data={result.data}/>
}