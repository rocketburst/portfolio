---
title: 'Creating your own Crypto with Thirdweb + Next JS'
description: 'Learn how to create your own cryptocurrency using the power of Thirdweb and Next JS.'
publishDate: '6 February 2022'
tags: ['web 3', 'nextjs', 'tutorial']
---

Cryptocurrency and Web3 has been gaining a lot of traction recently. We're going to hop on that train today, and you will be building your very first cryptocurrency!

## Setting Up

Create a new Next JS project with Tailwind CSS:

```bash
npx create-next-app --example with-tailwindcss with-tailwindcss-app # npm
yarn create next-app --example with-tailwindcss with-tailwindcss-app # yarn
```

I am using TypeScript in my app, but using JavaScript won't be an issue.

Install the following dependencies:

```bash
npm i @3rdweb/hooks @3rdweb/sdk @3rdweb/react ethers # npm
yarn add @3rdweb/hooks @3rdweb/sdk @3rdweb/react ethers # yarn
```

> You need a Metamask Wallet to continue with this tutorial. Create one by clicking [here](https://metamask.io/).

## Initialize Thirdweb Project

Head over to [Thirdweb](https://thirdweb.com/dashboard) and create a new project. You will need to connect your wallet using Metamask if you haven't. Press the create project button.

![Thirdweb Dashboard](https://cdn.hashnode.com/res/hashnode/image/upload/v1644172204984/NA7MN7GB4.png)

Once you press that button, create a new project on the **Rinkeby** test network under the Testnet section. This makes sure we are using a test blockchain and fake ether for transactions. Enter in the name of your project after, and hit create.

You will be asked to authorize a transaction to create the project, which will cost some ether (mind you it is fake).

> If you don't have enough ether, click [here](https://faucets.chain.link/rinkeby) to get free test ether.

I named my project "Crypto Demo", but you can name it whatever you want. You should see this dashboard screen if you have done everything successfully.

![2.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1644172236596/NNKy7tK0y.png)

## Building the App

### Creating the Token

Now let's create our very own cryptocurrency token. Scroll down until you see the "Add Module" button. Click that. Select the NFTs and Token section, and select the token section.

![3.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1644172255533/xd2GQh9ZR.png)

Name your cryptocurrency, and add a symbol. You can also add an image if you want. I am going to name mine "Apples", and use the symbol "APL". Again, it will ask you to authorize a couple transactions to create the token.

Once you have authorized the transactions, scroll down and hit the "Confirm Configuration" button. Now you have create you own token without writing a single line of code!

Now let's mint (create) some of our new tokens. This can be done with code (which we will go over later), but this process can also be done without code as well. Click the "Mint" button, and add in how much you want to mint.
Then, press the "Mint Token" button to mint the tokens. This again will ask you to authorize a transaction to mint the tokens.

![4.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1644172269805/eE8yLh5aAs.png)

Now before we get to the coding side of things, let's import our new cryptocurrency into our MetaMask Wallet. Go to your wallet and click the assets section. Then, scroll down until you see the import tokens button.
It will then ask you to input the token's contract address. To get this, go to your token module in your thirdweb project and click the copy button with your token address.

![5.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1644172280736/6SRbnvrip.png)

Once you have pasted that address in, MetaMask should have fetched all the data relating to this cryptocurrency. Make sure all the information is correct, and then hit the add custom token button.

![6.png](https://cdn.hashnode.com/res/hashnode/image/upload/v1644172294537/MiFZIxo2r.png)

### Connecting Our Metamask Wallet

Now we can start working on our Next JS app! The first thing we need is to connect our Metamask wallet to our Next JS app. Before we do that, we need to connect thirdweb to our app.

Go to the `pages/_app.tsx` file and add the following code:

```jsx title="pages/_app.tsx"
import '../styles/globals.css'

import { ThirdwebWeb3Provider } from '@3rdweb/hooks'

const supportedChainIds = [4]
const connectors = {
	injected: {}
}

function MyApp({ Component, pageProps }) {
	return (
		<ThirdwebWeb3Provider supportedChainIds={supportedChainIds} connectors={connectors}>
			<Component {...pageProps} />
		</ThirdwebWeb3Provider>
	)
}

export default MyApp
```

This basically added the Thirdweb provider to our app. The supported chain IDs are an array of IDS for different networks an app can use. 4 is the ID for the Rinkeby test network. The connectors object is used to connect to the different networks. These are the required props for the `ThirdwebWeb3Provider` component.

Now let's go to `index.tsx` page and use the `useWeb3` hook from thirdweb to connect our wallet. We will extract the `address` property and the `connectWallet` function.

```ts title="index.tsx"
const { address, connectWallet } = useWeb3()
```

Now we can say that if there is no address, we can display a connect wallet button; otherwise, we can display the user's wallet address.

```tsx title="index.tsx"
{
	address ? (
		<h1>Hello, {address}</h1>
	) : (
		<a className='inline-block cursor-pointer rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'>
			Connect Wallet
		</a>
	)
}
```

Now we can add an `onClick` to the button, saying that if you click on the button, call the `connectWallet` function.

```jsx
<a onClick={() => connectWallet('injected')}></a>
```

The injected basically means we are using a MetaMask wallet to connect to the app.

We can also extract the `disconnectWallet` function to disconnect our users
from the website.

```jsx
<a
	className='inline-block cursor-pointer rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75'
	onClick={() => disconnectWallet()}
>
	<span className='block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent'>
		Disconnect Wallet
	</span>
</a>
```

So as of right now, the component exported from the `index.tsx` file should look like this:

```tsx title="index.tsx"
<div className='p-5'>
	{address ? (
		<div>
			<h1>Hello, {address}</h1>

			<a
				className='mt-5 inline-block cursor-pointer rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75'
				onClick={disconnectWallet}
			>
				<span className='block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent'>
					Disconnect Wallet
				</span>
			</a>
		</div>
	) : (
		<a
			className='inline-block cursor-pointer rounded border border-indigo-600 bg-indigo-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-indigo-600 focus:outline-none focus:ring active:text-indigo-500'
			onClick={() => connectWallet('injected')}
		>
			Connect Wallet
		</a>
	)}
</div>
```

### Minting Token on the Frontend

Now let's mint some tokens! First lets create a new component called `MintToken` and render it when we have the wallet address.

```tsx title="MintToken.tsx"
const MintToken = () => {
	return <div>Mint token</div>
}

export default MintToken
```

<br />

```tsx title="index.tsx"
<div>
	<h1>Hello, {address}</h1>

	<a
		className='mt-5 inline-block cursor-pointer rounded bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 p-[2px] hover:text-white focus:outline-none focus:ring active:text-opacity-75'
		onClick={disconnectWallet}
	>
		<span className='block rounded-sm bg-white px-8 py-3 text-sm font-medium hover:bg-transparent'>
			Disconnect Wallet
		</span>
	</a>

	<MintToken />
</div>
```

Now inside of our Mint token component, lets create a button that when clicked will mint the user 5 apples (or your new crypto that you created).

```tsx title="MintToken.tsx"
<a className='group relative inline-block focus:outline-none focus:ring'>
	<span className='absolute inset-0 translate-x-0 translate-y-0 bg-red-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5'></span>

	<span className='relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest'>
		Mint 5 Apples
	</span>
</a>
```

Now this is where the magic happens. Lets extract the `provider` property from the `useWeb3` hook.

```ts title="MintToken.tsx"
const { provider } = useWeb3()
```

Now we can create the SDK and Token module using our provider and the `useMemo` hook (so that we can cache this data).

```ts title="MintToken.tsx"
const sdk = useMemo(() => {
	if (provider) return new ThirdwebSDK(provider.getSigner())
	return undefined
}, [provider])

const tokenModule = useMemo(() => {
	if (sdk) return sdk.getTokenModule('0x793DDF77487883b38c4E9BB0739Fdc89d3327472')
	return undefined
}, [sdk])
```

Notice that instead of using a private key when creating a new SDK, I use the providers getSigner function, which basically takes whoever is signed in to the app and creates the SDK with that. You can get the token module the same way you did when you imported the token onto Metamask.

Now lets create a function to mint the token. I will set a fixed amount of 5 apples, but you can use an input to capture how much of your currency you want to mint.

```ts title="MintToken.tsx"
const amount = ethers.utils.parseUnits('5', 18)
const mintToken = useCallback(() => {
	tokenModule?.mint(amount)
}, [tokenModule, amount])
```

The amount variable is used to set the amount of tokens to mint. 18 represents the number of decimal places. It is almost always 18.

> If you want other wallets to be able to mint tokens, go to the permissions tab on your token module and add the wallet address to the minter section.

The entire component should look like this:

```tsx title="MintToken.tsx"
import { useWeb3 } from '@3rdweb/hooks'
import { NextComponentType } from 'next'
import { useCallback, useMemo } from 'react'
import { ThirdwebSDK } from '@3rdweb/sdk'
import { ethers } from 'ethers'

const MintToken: NextComponentType = () => {
	const { provider } = useWeb3()

	const sdk = useMemo(() => {
		if (provider) return new ThirdwebSDK(provider.getSigner())
		return undefined
	}, [provider])

	const tokenModule = useMemo(() => {
		if (sdk) return sdk.getTokenModule('0x793DDF77487883b38c4E9BB0739Fdc89d3327472')
		return undefined
	}, [sdk])

	const amount = ethers.utils.parseUnits('8', 18)
	const mintToken = useCallback(() => {
		tokenModule?.mint(amount)
	}, [tokenModule, amount])

	return (
		<div className='mt-5'>
			<a
				className='group relative inline-block cursor-pointer focus:outline-none focus:ring'
				onClick={mintToken}
			>
				<span className='absolute inset-0 translate-x-0 translate-y-0 bg-red-300 transition-transform group-hover:translate-x-1.5 group-hover:translate-y-1.5'></span>

				<span className='relative inline-block border-2 border-current px-8 py-3 text-sm font-bold uppercase tracking-widest'>
					Mint 5 Apples
				</span>
			</a>
		</div>
	)
}

export default MintToken
```

## Conclusion

[Thirdweb](https://thirdweb.com/) has proven itself to be an awesome way to build Web3 apps. I hope you enjoyed using it to create your own crypto and that you found this article useful. [Here](https://github.com/rkazi103/thirdweb-crypto-demo) is the Github repo containing all the code for this.

Signing off 👋
