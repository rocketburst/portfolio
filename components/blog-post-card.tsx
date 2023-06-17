import Link from "next/link"
import { Post } from "@/.contentlayer/generated"
import { format } from "date-fns"

interface BlogPostCardProps {
  post: Post
}

export function BlogPostCard({ post }: BlogPostCardProps) {
  const date = format(new Date(post.date), "PPPP")

  return (
    <div className="not-prose flex items-center justify-between">
      <Link href={post.slug}>
        <p className="cursor-pointer link">{post.title}</p>
      </Link>
      <p>{date.substring(date.indexOf(" "))}</p>
    </div>
  )
}
