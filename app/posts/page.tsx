import { Metadata } from "next"
import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"

export const metadata: Metadata = {
  title: "rocketburst · blog",
  description: "home of my personal website",
  creator: "rocketburst",
  robots: "index, follow",
  viewport: { width: "device-width", initialScale: 1 },
}

export default function BlogPage() {
  const sortedPosts = allPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  return (
    <div className="prose dark:prose-invert">
      <h1>The Blog</h1>
      <p>Where I write about cool things 😊</p>

      {sortedPosts.map((post) => (
        <article key={post._id}>
          <Link href={post.slug}>
            <h2>{post.title}</h2>
          </Link>
          {post.description && <p>{post.description}</p>}
        </article>
      ))}
    </div>
  )
}
