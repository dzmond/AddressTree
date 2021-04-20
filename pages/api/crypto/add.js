import db from '../../../utils/db';


export default (req, res) => {
    const {id, ticker, address} = req.body;
    console.log(id, ticker, address);

    var crypto =  db.get("users")
                    .get(id)
                    .get("crypto")
                    .value();

    crypto.push({
        ticker, address
    });

    db.get("users")
        .get(id)
        .get("crypto")
        .set(crypto)
        .save;

    db.save();
    res.status(200).send({});
}
  