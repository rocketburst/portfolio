---
title: 'Type Checking your Next JS App'
description: 'Learn how to use Next JS and Typescript togethere to improve your DX'
publishDate: '22 Jan 2022'
tag: ['nextjs', 'typescript', 'tutorial']
---

## Type Checking your Next JS App

Next JS has proven to be an awesome React framework that many developers now use. Combining this technology with TypeScript allows for a more robust developer experience. I'll show how to add TypeScript to your Next.js project and how to use it to add type-checking to your app.

## Setting Up the App

The best way to get started with Next JS and TypeScript is by using the `ts` flag when creating the project.

```bash
npx create-next-app nextjs-typescript-demo --ts
```

## Using Next JS's types

### Pages and Server Side Rendering

When you open up the `index.tsx` file, one of the things that has changed is that the pages are typed using the `NextPage` type that is imported from Next JS. You should do this whenever you create a new page.

If you want to do server side rendering or static generation, Next JS has built in types for those as well:

```ts
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next'

export const getStaticProps: GetStaticProps = async (context) => {
	return {
		props: {}
	}
}

export const getStaticPaths: GetStaticPaths = async () => {
	return {
		paths: [
			{
				params: {}
			}
		],
		fallback: true
	}
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	return {
		props: {}
	}
}
```

Click [here](https://nextjs.org/docs/api-reference/data-fetching/get-initial-props#typescript) if you want to learn about how to use `getInitalProps` with TypeScript.

For the props or paths being returned, you can use angle brackets in the `NextPage` type (because the type is generic) to specify the prop/path types.

```ts
interface Props {
  // ...
}

const Home: NextPage<Props> = () => {
  return <div>Hello World</div>
}
```

### Components

To build components that will be used inside of your app, you should use the `NextComponent` type. By default the component will be typed as `NextComponent<NextPageContext, {}, {}>` The third argument can be extended to type check your props:

```ts
import { NextComponentType, NextPageContext } from "next"

interface Props {
  // ...
}

const Dummy: NextComponentType<NextPageContext, {}, Props> = () => {
  return <div></div>
}
```

### API Routes

You can also type check your API routes by using Next.js's built in types.

```ts
import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	res.status(200).json({ response: 'Type checked API response' })
}
```

You can type the repsonse data and pass it into `NextApiResponse`:

```ts
type Data = {
	response: string
}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	res.status(200).json({ response: 'Type checked API response' })
}
```

### Custom App and Next Config

The `_app.js` and `next.config.js` files are also typed using the built in types. The `_app.js` is typed using the `AppProps` type and the `next.config.js` is typed using the `NextConfig` type.

## Example: Fetching an API

Lets fetch the JSON Placeholder API to get some posts and test our type checking skills. First in the `index.tsx` file, we will need to use the `getStaticProps` (because the API data doesnt't change) to get the data.

```ts
export const getStaticProps: GetStaticProps = async () => {}
```

Now we will need query the API and return the results:

```ts
export const getStaticProps: GetStaticProps = async () => {
	const res = await fetch('https://jsonplaceholder.typicode.com/posts')
	const posts = await res.json()

	return {
		props: {
			posts
		}
	}
}
```

Now we have a problem. When you hover over the posts variable (in VSCode), it will say that the type is `any`. That is not what we want; the purpose of TypeScript is to make sure everything is statically typed.

One way to type the API results is go to thw API documentation and figure it out from there. The better way is to fetch the API and paste the results into [Quicktype](https://app.quicktype.io/). Quicktype will automatically generate types and interfaces for the data. I have already done that, and the API response will be in the following format:

```ts
export default interface PostType {
	userId: number
	id: number
	title: string
	body: string
}
```

Usually, we would create a types folder, create a new file (maybe called `PostType.ts`) and export the interface.

Now we will receive an array of posts. We can now type check the posts variable:

```ts
const posts: PostType[] = await res.json()
```

Now to receive the posts in the actual page, we need to extend the `NextPage` type to include our props. Then we can use the posts.

```ts
type HomeProps = {
	posts: PostType[]
}

const Home: NextPage<HomeProps> = ({ posts }) => {}
```

Now we can map through the posts and display them on the page using a `Post` component.

```jsx
posts.map((post) => (
	<Post key={post.id} userId={post.userId} id={post.id} title={post.title} body={post.body} />
))
```

Now when we create the `Post` component, we have to keep in mind the props we have to pass in. You can use the `PostType` interface for the props, but I will create a separate type for the `Post` props. Then we can use the `NextComponentType` type to type check the props.

```ts
type PostProps = {
	userId: number
	id: number
	title: string
	body: string
}

const Post: NextComponentType<NextPageContext, {}, PostProps> = ({ userId, id, title, body }) => {}
```

Now we can just display all the information:

```html
<div>
	<p>User ID: {userId}</p>
	<p>ID: {id}</p>
	<p>Title: {title}</p>
	<p>Body: {body}</p>
	<br />
</div>
```

## Conclusion

Using TypeScript in any app allows for a more robust developer experience. Next JS makes no exception. i hope you learned a lot from this tutorial!

[Here](https://github.com/rkazi103/nextjs-typescript-demo) is the code for this tutorial.

Signing off 👋
