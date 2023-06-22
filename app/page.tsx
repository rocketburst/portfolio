import { Metadata } from "next"
import Link from "next/link"
import { allPosts } from "@/.contentlayer/generated"

import { projects } from "@/lib/projects"
import { BlogPostCard } from "@/components/blog-post-card"
import { ProjectCard } from "@/components/project-card"

export const metadata: Metadata = {
  title: "rocketburst · home",
  description: "home of my personal website",
  creator: "rocketburst",
  robots: "index, follow",
  viewport: { width: "device-width", initialScale: 1 },
}

export default function IndexPage() {
  const recentPosts = allPosts
    .sort((a, b) => Number(new Date(b.date)) - Number(new Date(a.date)))
    .slice(0, 4)

  return (
    <div className="prose dark:prose-invert">
      <h1>Rayan Kazi</h1>
      <p className="leading-loose text-sm md:text-base md:leading-loose">
        Hello there 👋 My name is Rayan Kazi aka rocketburst. I&apos;m a 16 y/o
        that claims to be a full stack web dev. I like building cool things with
        cool tech and writing about it.
      </p>

      <p className="leading-loose text-sm md:text-base md:leading-loose">
        Right now, I&apos;m working on an AI side project, blogging, doing a
        bunch of reading, and preparing for the next school year.
      </p>

      <h2>Projects</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {projects.map((project) => (
          <ProjectCard key={project.name} project={project} />
        ))}
      </div>

      <h2>Blog</h2>

      <div className="space-y-3">
        {recentPosts.map((post) => (
          <BlogPostCard key={post._id} post={post} />
        ))}
      </div>

      <p className="not-prose flex items-center space-x-2">
        <Link href="/posts" className="link">
          <span>All Posts --&gt;</span>
        </Link>
      </p>
    </div>
  )
}
