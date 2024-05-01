---
title: 'A Primer on the Different ERC Standards'
description: This is an in depth look at the different ERC standards on the Ethereum Blockchain.
publishDate: '17 Sept 2022'
tags: ['web 3']
---

## A Primer on the Different ERC Standards

As web3 applications scale in size and complexity, the chain that supports these apps must scale as well. The early years of Ethereum were mostly dominated by ERC-20 contracts, but the new rise in popularity of NFTs drew in a good amount of attention from the market. Because of this, new standards like the ERC-721 and the recent ERC-1155 developed, each with different properties.

Today, I will show you the differences between each ERC standard and the benefits to using a specific one.

## What actually are ERCs?

ERC officially stands for "Ethereum Request for Comment." They are guidelines that all Ethereum based tokens (built through smart contracts) must follow if using a specific standard. We will be talking an in depth look into the ERC-20, ERC-721, and the ERC-1155 standards.

## The ERC-20 Token

The ERC-20 standard was first originally proposed by developers Fabian Vogelsteller and Vitalik Buterin as an EIP (Ethereum Improvement Proposal) in 2015 and was eventually implemented into the Ethereum blockchain in 2017. Some popular tokens that follow the ERC-20 standard are Chainlink (LINK), Enjin Coin (ENJ), and Aave (AAVE).

ERC-20 smart contracts can hold upwards to millions of tokens that can be created and distributed to owners. An owner can have multiple tokens and each token have the same value, making them interchangeable. Usually, there is a fixed number of tokens in supply to avoid inflating the value of the token.

ERC-20 tokens are **fungible** tokens; fungibility is the idea that 2 different ERC-20 tokens can be of the same value or worth. These tokens allow users to interact with each other (by trading them) run various decentralized applications (dApps), decentralized finance (DeFi), decentralized autonomous organizations (DAOs), and much more.

## The ERC-721 Token

Just like its cousin ERC-20, ERC-721 was also introduced as an EIP in 2017 by Dieter Shirley and was implemented into the chain in 2018. Some popular NFT collections that follow the ERC-721 standard are the [Bored Ape Yacht Club](https://opensea.io/collection/boredapeyachtclub), [CryptoPunks](https://opensea.io/collection/cryptopunks), and [Crypto Kitties](https://opensea.io/collection/cryptokitties).

> If you want to buy an NFT, I highly recommend going to [OpenSea](https://opensea.io/) or [Rarible](https://rarible.com/); they are 2 of the most popular NFT Marketplaces to date

The main difference between an ERC-721 token and an ERC-20 token is that ERC-721 tokens are **unique**; each token has its own specific metadata. One ERC-721 token can't replace another because they have different properties. This uniqueness also shows the rarity of each token, which is factor in determining its worth and how much the token will sell for.

The individuality of each token is why ERC-721 became the golden standard for NFTs (Non-Fungible Tokens); the whole reason why NFTs are non-fungible is because one NFT can't be replaced with another.

## The ERC-1155 Token

The ERC-1155 standard was actually developed by Enjin Games in 2019, and it's basically a middle ground between the ERC-20 and ERC-721 tokens.

ERC-1155 tokens can be both fungible and non-fungible; a contract that uses this standard has tokens that you can think of as their own contracts, and each one of those contracts has a supply that is distributed. This new idea of having fungible and non-fungible items has become extremely popular in the blockchain gaming industry.

ERC-1155s can also do something called **batch transfers**, which is sending multiple assets (fungible or non-fungible) in one transaction. These types of transactions significantly reduce traffic on the Ethereum network, which helps decrease gas prices on chain.

For example, if a player in a game wanted to sell all their leather armor to another player, they can use the ERC-1155's batch transfer feature to send all the assets they want to sell in one transaction.

**Safe transaction rules** are another new addition to the ERC-1155 standard. If that player accidentally sold their diamond armor instead of their leather armor, the transaction can be reverted, and the assets can be returned back to the sender. This and other safety features help prevent exploiting any potential bugs in an ERC-1155 contract.

## Making These Contracts

Now that we have talked about the different types of contracts, you are probably wondering how to make these types of contracts. My answer to that is [Thirdweb](https://thirdweb.com/). They have amazing SDKs (TypeScript, React, Python), pre-built contracts, documentation, and guides that will help build you build amazing smart contracts for your web3 dApps.

Thank you so much for reading! Signing off 👋
