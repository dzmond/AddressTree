import db from '../../../utils/db';


export default (req, res) => {
    const { name } = req.query

    var users =  db.get("users").value();

    var user =  users.find((user) => {
        return user.username === name
    });

    if(user) res.status(200).json(user);
    res.status(401).end()

    
    
}
  