import db from '../../utils/db';

/*
Totally did not steal this from 
https://dev.to/afewminutesofcode/how-to-convert-an-array-into-an-object-in-javascript-25a4#:~:text=To%20convert%20an%20array%20into%20an%20object%20we%20will%20create,key%20we%20have%20passed%20in.
*/
const convertArrayToObject = (array, key) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item[key]]: item,
      };
    }, initialValue);
  };


export default async (req, res) => {
    const { username } = req.query
    var users =  db.get("users").value();

    var user =  users.find((user) => {
        return user.username === username
    });

    if(user){
        res.status(200).json(convertArrayToObject(user.crypto, 'ticker'));
    } else {
        res.status(404).json({'error': 'user does not exist'})
    }


}