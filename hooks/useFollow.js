// a hook for following users

const useFollow = () => {
    const follow = (id, username, callback) => {
      fetch(
        `/api/user/follow`,
        {
          body: JSON.stringify({
            id,
            username
          }),
          headers: {
            'Content-Type': 'application/json'
          },
          method: 'POST'
        }
      ).then(()=>{
        callback();
      })
    }
 
     return {follow}
}

export default useFollow;