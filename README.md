# AddressTree
Essentially a directory for crypto addresses. Users can create an account, add their crypto addresses and keep a contact list of other users addresses. Users addresses are also accessible via api endpoint `/api/[username goes here]` (for instance, `/api/elon` would yield a JSON object with all the addresses that user `elon` )

You can view a user at `/[username]` for instance `/elon` is for user `elon`

Once logged in, you can view/add addresses in the home page

This app requires you to log in with a Google account.

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

  

## Getting Started

  

First, run the setup script:

  

```bash

npm run setup

# or

yarn setup

```
Then, run the development server:

  

```bash

npm run dev

# or

yarn dev

```
Upon starting, you will be prompted to enter the "magic word", which decrypts the needed variables and places them into your `Process.env`

  

```bash

AddressTree
AddressTree
AddressTree
AddressTree
AddressTree
What's the magic word?: 

```
Note: the app will continue to compile successfully, however it will crash without typing in the magic word and pressing enter
  

Once the magic word is entered and the app compiles successfully, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
  

## Some Caveats

  - This version uses a local JSON-based db called StormDB. I did this so that whoever is reviewing the code can check the database to see the data, how it's managed, etc if need be. This also means all data is lost whenever the project is deleted. To view the database file, view `db.stormdb` located in the root of the project directory.

- There is currently a runtime error that occurs arbitrarily when loading `/[user]` pages.
	```
	# Unhandled Runtime Error

	TypeError: Cannot read property 'following' of undefined
	```
	If you're lucky enough to see this error, just refresh the page and keep doing so 		until it disappears. I left this in since it's a frontend react issue and thankfully the this challenge stresses the backend aspects of the full stack
- You may repeatedly see a warning stating `useUser: TypeError: Only absolute URLs are supported`. This was left in because the issue was hard to replicate and thus fix. All in all, it doesn't affect the apps functions at all and a fix will be done eventually.




  

## Your  .env

  In this repository is an encrypted .env (`.env.enc`) file containing important credentials needed for the app to function.

If for whatever reason you'd like to create a .env with your own credentials, copy and paste the following code into a file called `.env`
```
NEXTAUTH_URL=http://localhost:3000
REACT_APP_URL=http://localhost:3000
GOOGLE_CLIENT_ID= {YOUR CLIENT ID}
GOOGLE_CLIENT_SECRET= {YOUR CLIENT SECRET}

```
  Afterwards, you'll need to encrypt the file for the app to use these new credentials. To do so, run:
```

npm run encrypt-env

```
Upon running this script, it will ask you to pick a magic word to use when decrypting.
```
What's gonna be the magic word playa?:
```

 Enter any word of your choosing and hit enter.



## Any questions? comments? concerns?
The best ways to contact me are via [email](mailto:desmondadonle@gmail.com) or via discord (dzmnd#7155).

