
  import  api  from "@/lib/axios";
  import SingleUser from "./SingleUser";






  export default async  function User({params}:{params:{id:string}}) {

  const id=  (await params)?.id

      const User_res=await api.get(`/users/${id}`);


      


    return (
  <SingleUser user={User_res.data} />
    );
  };

