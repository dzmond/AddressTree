import { getSession } from 'next-auth/client';
import db from '../../../utils/db';

export default async (req, res) => {
    const session = await getSession({ req })

    if (session) {
        // Signed in
        const { id } = session.user
        var user =  db.get("users").get(id).value();
        var following = [];

        user.following.forEach((followId)=>{
           var follow =  db.get("users").get(followId).value();
           following.push(follow);
        });

        res.status(200).json({following})

      } else {
        // Not Signed in
        res.status(401).json({})
      }
}