import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

import db from '../../../utils/db';

var jose = require('node-jose');

const generateSigningKey = () => {
    var keystore = jose.JWK.createKeyStore();
    var props = {
        alg: 'HS512'
      };
      keystore.generate("oct", 512, props).
              then(function(result) {
                // {result} is a jose.JWK.Key
                var {kty, kid, alg} = result;
                return {kty, kid, alg}
              });
}


const options = {
    providers: [
        Providers.Google({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        })
    ],
    jwt: {
        signingKey: JSON.stringify(generateSigningKey()),
        //JSON.stringify({"kty":"oct","kid":"m_-n4znOUeUm5pR_q1k2fVIJNccDSV-f7y7VrFTX_Dw","alg":"HS512","k":"vnqNm_cukhMFYkFqEeMmL3JUGOLAuBAyCh3XEIAuw-4"}),

      
        // You can also specify a public key for verification if using public/private key (but private only is fine)
        // verificationKey: process.env.JWT_SIGNING_PUBLIC_KEY,
      
        // If you want to use some key format other than HS512 you can specify custom options to use
        // when verifying (note: verificationOptions should include a value for maxTokenAge as well).
         verificationOptions :{
        //   maxTokenAge: `${maxAge}s`, // e.g. `${30 * 24 * 60 * 60}s` = 30 days
           algorithms: ['HS512']
         },
      },
    callbacks: {
        signIn: async (profile, account, metadata) => {
            var currentNumOfUsers = db.get("numOfUsers").value();
            var users = db.get("users").value();
            var user =  users.find(user =>  user.email === profile.email);

            // if user doesnt exist
            if(!user){
                // add it
                var username = profile.email.substring(0,profile.email.indexOf('@'));
                db.get("users").push({ username, email: profile.email, userID: currentNumOfUsers, crypto:[], following:[] });
                // increment num of users
                db.get("numOfUsers").set((currentNumOfUsers + 1));
                db.save();
            } 
        },
        session: async (session, token) =>{
            var users = db.get("users").value();
            var user =  users.find(user =>  user.email === session.user.email);
            session.user.id = user.userID;
            session.userData = user;
            return session;
        },
    },
};


export default (req, res) => NextAuth(req, res, options);