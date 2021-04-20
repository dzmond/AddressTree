import { getSession } from 'next-auth/client';
import db from '../../../utils/db';

export default async (req, res) => {
    const session = await getSession({ req })
    const {id, username} = req.body;

    if (session) {
        // Signed in
        const { id:loggedInUser } = session.user
        var user =  db.get("users").get(loggedInUser).value();

        // if its already there remove it
        if(JSON.stringify(user.following).includes(JSON.stringify({id, username}))){
            // comparing objects can get quite finicky so the best thing to do is 
            // stringify them and compare that instead
            var index = user.following.indexOf({id, username})
            user.following.splice(index, 1)
        } else {
            // if not, add it
            user.following.push({id, username}); 
        }
        
        db.get("users")
        .get(loggedInUser)
        .get("following")
        .set(user.following)
        .save();
        
        res.status(200).end()
    
      } else {
        // Not Signed in
        res.status(401).json({})
      }
}