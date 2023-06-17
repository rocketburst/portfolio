"use client"

import Link from "next/link"
import { Project } from "@/types"

import { Icons } from "@/components/icons"

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="not-prose border p-2 space-y-2 rounded-md border-gray-400 dark:text-gray-50">
      <Link href={project.link} target="_blank" rel="noreferrer">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">{project.name}</h3>
          <Icons.link className="h-4 w-4" />
        </div>

        <p className="text-sm">{project.description}</p>
      </Link>
    </div>
  )
}
