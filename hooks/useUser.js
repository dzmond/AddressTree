import {useState, useEffect} from 'react'

const useUser = () => {
    const [user, setUser] = useState()

    const getUser = () => {
        fetch(
            `/api/user`,
            {
              headers: {
                'Content-Type': 'application/json'
              },
              method: 'GET'
            }
          ).then(response => {
            return response.json()
          })
          .then(data => { 
            // sometimes the data comes up undefined
            if(!data){
              throw new Error("User Data Came Back Empty")
            }
            setUser({...data});
          }).catch(e => {
            //console.log("useUser:",e);

          });
    }


    useEffect(()=>{ 
        getUser(setUser);
     },[])
    return {user, getUser};
}

export default useUser;