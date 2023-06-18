import { allPosts } from "contentlayer/generated"
import Rss from "rss"

import { siteConfig } from "@/config/site"

export function GET() {
  const feed = new Rss({
    title: "Rayan Kazi",
    description: "My personal website and blog",
    feed_url: `${siteConfig.url}/rss.xml`,
    site_url: `${siteConfig.url}`,
    language: "en",
  })

  allPosts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.description as string,
      date: post.date,
      url: `${siteConfig.url}/posts${post.slug}`,
      guid: `${siteConfig.url}/posts${post._id}`,
    })
  })

  return new Response(feed.xml(), {
    headers: {
      "Content-Type": "application/xml",
    },
  })
}
