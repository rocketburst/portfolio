import { projects } from "@/lib/projects"
import { ProjectCard } from "@/components/project-card"

export default async function IndexPage() {
  return (
    <div className="pt-5 prose dark:prose-invert">
      <h1>Rayan Kazi</h1>
      <p className="leading-loose text-sm md:text-base md:leading-loose">
        Hello there 👋 My name is Rayan Kazi aka rocketburst. I&apos;m a 16 y/o
        that identifies as a full stack web dev. I like building cool things
        with cool tech and writing about it.
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
    </div>
  )
}
