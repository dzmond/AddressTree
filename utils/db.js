const StormDB = require("stormdb");
const engine = new StormDB.localFileEngine("./db.stormdb");
const db = new StormDB(engine);

// set default db value if db is empty
db.default({ users: [{
  "username": "des",
  "email": "des@example.com",
  "userID": 0,
  "crypto": [
    {
      "ticker": "BTC",
      "address": "0xaaaaaaaaaaaaaaaaaaa"
    },
    {
      "ticker": "ETH",
      "address": "0xbbbbbbbbbbbbbbbbbbb"
    },
    {
      "ticker": "LTC",
      "address": "0xccccccccccccccccccc"
    },
    {
      "ticker": "UNI",
      "address": "0xdddddddddddddddd"
    },
    {
      "ticker": "SOCKS",
      "address": "0xeeeeeeeeeeeeeeee"
    },
    {
      "ticker": "XRP",
      "address": "0x0000000000000000"
    }
  ],
  "following": []
},{
  "username": "ghili",
  "email": "ghili@example.com",
  "userID": 1,
  "crypto": [
    {
      "ticker": "BTC",
      "address": "0xccccccccccccccccccc"
    },
    {
      "ticker": "ETH",
      "address": "0xeeeeeeeeeeeeeeee"
    },
    {
      "ticker": "XRP",
      "address": "0x9999999999999999"
    }
  ],
  "following": []
},{
  "username": "jordan",
  "email": "jordan@example.com",
  "userID": 2,
  "crypto": [
    {
      "ticker": "ETH",
      "address": "0x1111222233334444"
    },
    {
      "ticker": "UNI",
      "address": "0x7777777777777777"
    }
  ],
  "following": []
},
{
  "username": "elon",
  "email": "elon@example.com",
  "userID": 3,
  "crypto": [
    {
      "ticker": "DOGE",
      "address": "0xffffffffffffffff"
    }
  ],
  "following": []
}], numOfUsers: 4 });


export default db;