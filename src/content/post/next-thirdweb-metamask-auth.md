---
title: 'Authentication using Metamask Wallets in Next JS'
description: 'Learn how to implement authentication in your Web 3.0 app with your Metamask wallet using Next JS and Moralis'
publishDate: '18 Jan 2022'
tags: ['web 3', 'nextjs']
---

## Authentication using Metamask Wallets in Next JS

If you don't know, Web 3 is a new technology that is being used by the Ethereum community to build decentralized applications (aka Dapps). One of the most important things about any app (including dapps) is authentication. We are going to learn how to authorize users using their Metamask wallets.

If you don't know what metamask is or you want to set up a wallet, check out their website [here](https://metamask.io/).

## Setup

1 - Create a new Next JS app

```bash
npx create-next-app next-metamask-auth
```

2 - Change into app directory

```bash
cd next-metamask-auth
```

3 - Install depenedencies (we will use moralis)

```bash
npm i @walletconnect/web3-provider moralis react-moralis # npm

yarn add @walletconnect/web3-provider moralis react-moralis # yarn
```

4 - Run the development server

```bash
npm run dev # npm

yarn dev # yarn
```

## Setting up Moralis

Head to the [Moralis](https://moralis.io/) website and create an account or login. Go to the servers section on the sidebar and press the "Create a new Server button". In the drop down, select the test net server option.

![metamask-auth-1.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642558401709/ZFIpMqugT.png)

A Testnet server is basically for testing purposes. The Mainnet server is for live transactions on the blockchain.

Once you select the testnet server, you will see a popup. Fill in the details (for the specific chain, we will use Ropsten) and press the "Add Instance" button.

![metamask-auth-2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642558387080/57i12ePKX.png)

Once the server is created, click the down arrow, and then click view details. You need the Server URL and the App ID.

![metamask-auth-3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642558368077/p4e5lx_99.png)

<br />

## Building the App

### Adding the Environment Variables

The Server URL and App ID need to be kept private, so create an `.env.local` file to store these variables in.

```env
NEXT_NEXT_PUBLIC_APP_ID=app_id
NEXT_PUBLIC_SERVER_URL=server_url
```

Replace these default values with the values you got from the server details on Moralis.

There is a `NEXT_PUBLIC` before the `APP_ID` and `SERVER_URL` because we need to access these variables on the client and the server.

### Adding The MoralisProvider

Go to the `pages/_app.js` file and wrap the `<Component {...pageProps} />` with the `<MoralisProvider />` component as follows:

```jsx
<MoralisProvider
	appId={process.env.NEXT_PUBLIC_APP_ID}
	serverUrl={process.env.NEXT_PUBLIC_SERVER_URL}
>
	<Component {...pageProps} />
</MoralisProvider>
```

Be sure to import the `MoralisProvider` from react moralis.

```jsx
import { MoralisProvider } from 'react-moralis'
```

### Creating the Sign In Button

For this demonstration, I will be doing everything on the home page, but you can do it wherever it will suit your needs.

First, we need to input the `useMoralis` hook from react moralis.

```jsx
import { useMoralis } from 'react-moralis'
```

There are many things that are provided with the useMoralis hook; we will use the authenticate function to authenticate the user. Get the authentication function by using the `useMoralis` hook:

```js
const { authenticate } = useMoralis()
```

Now we can just create a button that has an onClick event that will trigger this function.

```tsx
<button onClick={() => authenticate()}>Login</button>
```

Now when we click the button, a popup will appear from the Metamask extension asking us to sign this request for our website to use the wallet. Once you sign the request, the popup will close and the you are know considered as authenticated in this app.

![metamask-auth-4.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642558340831/aK_2PyjYv.png)

### Creating the Sign Out Button

There are some other things we need to use from the `useMoralis` hook.

```js
const { authenticate, isAuthenticated, logout } = useMoralis()
```

We can use a ternary operator so that if the user is authenticated, a sign out button will show, and if the user isn't authenticated, a log in button will show.

```jsx
{
	isAuthenticated ? (
		<button onClick={logout}>Sign Out</button>
	) : (
		<button onClick={() => authenticate()}>Login with Metamask</button>
	)
}
```

Now the registration is functional; now, lets look at how we can get some of the user's data.

### Getting the User's Data

First, we need the `user` from the `useMoralis` hook:

```js
const { authenticate, isAuthenticated, logout, user } = useMoralis()
```

You can use something like VSCode's IntelliSense or the Moralis documentation to see what you can get from the user object. For example, to get the user's username and wallet address, you can do:

```jsx
<div>
	<button onClick={logout}>Logout</button>
	<p>Username: {user?.getUsername()}</p>
	<p>Wallet Address: {user?.get('ethAddress')}</p>
</div>
```

![metamask-auth-5.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1642558312541/CHTGf21VH.png)

We have to use a question mark for null safety. The username is indeed a random sequence of characters, but you can easily change it using another Moralis function.

## Conclusion

As you can see, it was that easy to implement authentication using Web 3.0 techonologies. I hope you found this tutorial useful, and please share with this people that might find this useful!

[Here](https://github.com/rkazi103/metamask-nextjs-auth) is the source code for this tutorial.

Sigining off 👋
