import { MetadataRoute } from "next"
import { allPosts } from "contentlayer/generated"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = allPosts.map((post) => ({
    url: `https://portfolio-rocketburst.vercel.app/posts${post.slug}`,
    lastModified: post.date,
  }))

  const routes = ["", "/posts"].map((route) => ({
    url: `https://portfolio-rocketburst.vercel.app${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...posts]
}
