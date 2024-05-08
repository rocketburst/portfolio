---
title: How to Send Emails with React Using Resend
description: Learn how to send emails with React Email and Resend by building a typical portfolio contact form.
publishDate: '01 August 2023'
tags: ['typescript', 'tutorial', 'react']
---

> Read the article on SitePoint [here](https://www.sitepoint.com/react-email-resend/)!

## Sending Emails with React Using Resend

Up until now, creating and sending emails in React was extremely difficult, as there was no proper documentation on how to create email templates with hacky `table` tag tricks or send emails.

Much of the difficulty with using emails was alleviated with the creation of [React Email](https://react.email/) and [Resend](https://resend.com/). Using both of these products, which were developed by the same team, created an amazing developer experience for interacting with emails.

Today, I will show you how to send emails with React Email and Resend by building a contact form you're likely to see on many people's portfolio websites using Next JS.

### Setting Up the Next App

Clone the starter branch of [this repo](https://github.com/rocketburst/react-email-example/tree/starter) to get the starter code. You should see the following form when you run the development server:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689470384754/75ca72be-9669-46df-af8b-e2167fc4f53f.png align="center")

The starter code consists of a simple Next JS 13 app (with the app router) that has a contact form component with proper validation using [Zod](https://zod.dev/) and [React Hook Form](https://www.react-hook-form.com/).

We will be implementing the `onSubmit` function in the contact form component.

```typescript
function onSubmit(values: z.infer<typeof formSchema>) {
	// TODO: implement
	console.log(values)
}
```

> I won't be going over how to build the form or how to style the email itself, as that can be done with Tailwind or regular CSS; it's up to you!

### Setting Up Resend

#### Getting the API Key

To send the email with the Resend SDK, we first need to retrieve an API key. Head over to [Resend's website](https://resend.com/) and log in or create an account with your email or GitHub.

After you've logged in, you should see the following dashboard:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689646604778/e8cc3db5-8f57-4998-aea4-f2f846ee60e6.png align="center")

Press the "Add API Key" button to get the API key. Once you have your API key, go to the root of the project and create a .env.local file and paste the API key as follows:

```xml
RESEND_API_KEY=************
```

This will allow us, later on, to use Resend services within our app.

#### Verifying a Domain

Resend requires that you verify a domain from which you want to send unlimited emails by adding a DNS record on their website.

To do this, head over to the Resend dashboard and go to the "Domains" tab and press the "Add Domain" button:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689647924061/7581942d-b907-4bcc-b749-0c9b51ece47f.png align="center")

From there you can verify the domain and use that specific email address. For this simple tutorial, I won't be verifying any email addresses.

### Creating the Email Component

It is now time to create the email component. In the components folder, create a file called `Email.tsx` and import the following components from React Email:

```typescript
import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Tailwind,
	Text
} from '@react-email/components'
import * as React from 'react'
```

For the email, the only things that will change will be the form data values (i.e. the name, message, email address, and phone number of the person). These values can be used as props for the email, so let's create an interface for that:

```typescript
interface ContactMeEmailProps {
	name: string
	emailAddress: string
	phoneNumber: string
	content: string
}
```

The actual email component would look like this:

```typescript
const VercelInviteUserEmail = ({
	name,
	content,
	emailAddress,
	phoneNumber
}: ContactMeEmailProps) => {}
```

For the preview text of the email, we could just say that "so and so has a message." It would be implemented like this:

```typescript
const previewText = `${name} has a message`
```

Now for the actual JSX: We would first need to wrap our email in an `Html` tag and render the `Head` and `Preview` tags (for the preview text). Then we need to wrap the content in a `Tailwind` tag to use tailwind styling and a `Body` tag:

```typescript
<Html>
  <Head />
  <Preview>{previewText}</Preview>
  <Tailwind>
    <Body className="bg-white my-auto mx-auto font-sans">
      {...}
    </Body>
  </Tailwind>
</Html>
```

We can then add a Container component with some general styling to make the container the email is rendered in look nicer:

```xml
<Container className="border border-solid border-[#eaeaea] rounded
my-[40px] mx-auto p-[20px] w-[465px]">
</Container>
```

Then inside the container, we can add a simple heading with some styles labeled "Someone would like to contact you about something!"

```xml
<Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
  <strong>{name}</strong> would like to contact you about something!
</Heading>
```

Then we can render out the actual content of the email with the built-in `Text` component:

```xml
<Text className="text-black text-[14px] leading-[24px]">
  Here is the message:
</Text>

<Text className="text-black text-[14px] leading-[24px]">
  {content}
</Text>
```

Finally, we can add a `Hr` component and another `Text` component with the sender's contact information for future conversations!

```xml
<Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
<Text className="text-[#666666] text-[12px] leading-[24px]">
  This message was sent by ${name}. You can contact him through his
  email {emailAddress} or his phone number {phoneNumber}
</Text>
```

And with that, our email is done. As you've probably noticed, React Email makes it simple to make emails because their built-in components are practically identical to regular HTML tags.

The email should look like this:

![](https://cdn.hashnode.com/res/hashnode/image/upload/v1689879283307/01871d1b-1246-4177-a1a3-19c2c993b8ff.png align="center")

Now we are ready to send the email with Resend!

### Sending the Email with Resend

To send the email, we first need to implement the API endpoint. In the file `api/send/route.ts` (already created in starter files), make sure the following imports are present:

```typescript
import ContactMeEmail from '@/components/Email'
import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import * as z from 'zod'
```

Then, create an instance of the Resend SDK as follows:

```typescript
const resend = new Resend(process.env.RESEND_API_KEY)
```

> If you used a different environment variable name for your API key, make sure to replace it properly.

Then paste the following Zod schema:

```typescript
const sendRouteSchema = z.object({
	name: z.string().min(2),
	emailAddress: z.string().email(),
	phoneNumber: z.string().min(2),
	content: z.string().min(2)
})
```

This schema represents the request body that was sent from the client. Now let's destructure the request body to get these fields in the `POST` function:

```typescript
const { name, emailAddress, phoneNumber, content } = await req
	.json()
	.then((body) => sendRouteSchema.parse(body))
```

Now to send the email, we use the `send` function from our Resend instance like this:

```typescript
const data = await resend.emails.send({
	from: 'from email',
	to: ['delivery email'],
	subject: `${name} has a message!`,
	react: ContactMeEmail({ name, emailAddress, phoneNumber, content })
})
```

If you verified your domain on Vercel, you can use an email address with that domain on the `from` field, and the `to` field should be your email. If you want to be extra secure with the email addresses, you can set them as environment variables.

Now we need to implement the actual fetch action on the client. In the contact form component (`components/ContactForm.tsx`), we need to fetch the API endpoint like this inside of the `onSubmit` function:

```typescript
await fetch('/api/send', {
	method: 'POST',
	body: JSON.stringify({
		name: values.name,
		emailAddress: values.email,
		phoneNumber: values.phone,
		content: values.content
	})
})
```

Make sure to mark the function as `async` due to the await statement. It's up to you to decide how you want to implement loading and error-handling states.

And with that, we have successfully sent the email with Resend!

### Conclusion

Much of the headache with creating and sending emails in React was solved with React Email and Resend. It's a 2-hit combo that provides an amazing developer experience and gets the job done extremely quickly.

Consult the docs for [React Email](https://react.email/docs/introduction) and [Resend](https://resend.com/docs/introduction) if you want to learn more about these frameworks. React Email also provides many [example templates](https://demo.react.email/preview/vercel-invite-user) for you to base your emails off. You can find the finished source code [here](https://github.com/rocketburst/react-email-example).
