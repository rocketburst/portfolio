import { allPosts } from "contentlayer/generated"
import Rss from "rss"

export function GET() {
  const feed = new Rss({
    title: "Rayan Kazi",
    description: "My personal website and blog",
    feed_url: "https://portfolio-rocketburst.vercel.app/rss.xml",
    site_url: "https://portfolio-rocketburst.vercel.app",
    language: "en",
  })

  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description as string,
      date: post.date,
      url: `https://portfolio-rocketburst.vercel.app/posts${post.slug}`,
      guid: `https://portfolio-rocketburst.vercel.app/posts${post._id}`,
    })
  })

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
