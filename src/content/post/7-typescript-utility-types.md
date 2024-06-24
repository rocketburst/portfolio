---
title: 7 TypeScript Utility Types That Will Make Your Life Easier
description: Learn how to and when to use 7 built in and powerful TypeScript utility types with all kinds of examples and implementations.
publishDate: '30 June 2022'
tags: ['typescript', 'tutorial']
---

TypeScript has arguably been the greatest thing that I have ever come across as a developer because of the way it revolutionized my experience as a developer. I want to help make using TypeScript even better for you by showing you how to use 7 built in utility types that will make your life much easier.

I will be using the following interface throughout the article to demonstrate the various types:

```ts
export interface Book {
	name: string
	author: string
	datePublished: Date
	price: number
	numSales?: number
	seriesName?: string
}
```

## Omit and Pick

The `Omit` type allows you to "omit" (i.e. remove) certain properties from an interface and construct a new type out of it. The first argument it takes is the interface you want to remove properties from, and the second argument is a list of parameters.

For example, if you want to make a `BookProfile` type, which just has all the properties of the book needed to identify itself, you would use the `Omit` as follows:

```ts
type BookInfo = Omit<Book, 'price' | 'numSales'>
```

This type would be equivalent to our `Book` interface except it wouldn't have the `price` or `numSales` properties. You can also create it with the interface keyword as follows:

```ts
interface IBookInfo extends Omit<Book, 'price' | 'numSales'> {}
```

The `IBookInfo` interface would work the same way the `BookInfo` type would, but I personally prefer using the type version due to its cleaner implementation.

The `Pick` type has quite literally the opposite function of the `Omit` type; the `Pick` type allows you to "pick" certain properties of the interface that is passed in and construct a new type out of that.

If we were to make the `BookInfo` type using the `Pick` type, here is how it would look:

```ts
type BookInfo = Pick<Book, 'name' | 'author' | 'datePublished' | 'seriesName'>
```

Because these 2 types are so similar, an important question arises. "In which cases should I use `Omit` or `Pick`?" I think it actually comes down to personal preference.

If you were to add new properties to the `Book` type, it would automatically be added to the `BookInfo` type using `Omit` and cut off from the type using `Pick`, so it really depends on the scenario.

Generally, if you have a bunch of properties you need to remove, or if you need to remove more properties than you need to use, I'd use the `Pick` type; otherwise, I'd use `Omit`.

## Partial and Required

Just like `Omit` and `Pick`, `Partial`, and `Required` are also related in terms of functionality.

In our `Book` interface, there are 4 required properties and 2 optional properties.

The `Partial` type will make all the properties on the interface passed in optional; this means that all 6 properties on the `Book` interface would become required.

```ts
type BookPartial = Partial<Book>
```

The `Required` type does the exact opposite of what `Partial` does; it makes all the properties on the interface passed in required. This would make all 6 properties on `Book` required.

```ts
type BookRequired = Required<Book>
```

These types are usually extended to include some exceptions. For example, we could make the `name` property required on the `BookPartial` type by extending it as follows:

```ts
type BookPartial = Partial<Book> & { name: string }
```

## Record

The `Record` type allows you to create an object where you can define the key and the type. Lets say we had the following object below:

```ts
const myObj = {
	a: 1,
	b: 2
}
```

This object follows a strict pattern where every key is a string and every value is a number. We can type this object using the `Record` type as follows:

```ts
const myObj: Record<string, number> = {
	a: 1,
	b: 2
}
```

All the `Record` type does is say what the types are for the key-value pair of an object. If you want to represent a shelf with different books (with the `Book` interface), you can now easily do that with `Record` as follows:

```ts
const shelf: Record<number, Book> = {
	0: {
		name: 'Into Thin Air',
		author: 'Jon Krakauer',
		datePublished: new Date(1997, 1),
		price: 14
	},
	1: {
		name: '1984',
		author: 'George Orwell',
		datePublished: new Date(1949, 6),
		price: 12
	}
}
```

## Parameters and ReturnType

The `Parameters` type creates an array type based on a function's arguments. For example, let's say we had the following function:

```ts
function createPost(caption: string, image?: string) {
	return { caption, image }
}
```

If you wanted to create a type that contained all the arguments of `createPost`, you would do it as follows:

```ts
type CreatePostInput = Parameters<typeof createPost>
```

Here is how the type would be used in action:

```ts
const post: CreatePostInput = ['Nice', 'https://bit.ly/3OOiIaC']
createPost(...post)
```

The reason why you have to use the spread operator with the `post` array is because the elements of the array correspond to the various arguments of the function; the array itself isn't a function argument.

The `ReturnType` creates a type based on what a function returns. The syntax is very similar to that of `Parameters`:

```ts
type CreatePostReturn = ReturnType<typeof createPost>
```

This is equivalent to:

```ts
type CreatePostReturn = {
	caption: string
	image: string | undefined
}
```

If a function returns a promise, you can wrap the `ReturnType` around the `Awaited` utility type, which will effectively do the same thing the `await` keyword does. It will allow you to have access to the object's (that is wrapped in the Promise) properties again.

```ts
type CreatePostReturn = Awaited<ReturnType<typeof createPost>>
```

## Next Steps

Now that you have learned just how powerful some of these types are, I highly reccomend refactoring some of your old code to use these types or even implement these types in a new app your building!

**Thank you for reading!**

Signing off 👋

### Useful Links

- [TypeScript Docs](https://www.typescriptlang.org/docs/handbook/utility-types.html)
- [Github Repo](https://github.com/rkazi103/ts-utility-types)
