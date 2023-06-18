"use client"

import Link from "next/link"

import { Icons } from "@/components/icons"

export function Footer() {
  return (
    <div className="mt-24">
      <hr />

      <footer className="flex justify-between mt-6">
        <p>
          <Link href="/">Rayan Kazi</Link>
        </p>

        <div className="flex items-center space-x-4">
          <Link href="/rss.xml">
            <Icons.rss strokeWidth={2} className="h-4 w-4" />
          </Link>

          <Link href="/sitemap.xml">
            <Icons.sitemap strokeWidth={2} className="h-4 w-4" />
          </Link>

          <Link href="mailto:rayankazi7515@gmail.com">
            <Icons.mail strokeWidth={2} className="h-4 w-4" />
          </Link>

          <Link href="https://github.com/rocketburst/" target="_blank">
            <Icons.github strokeWidth={2} className="h-4 w-4" />
          </Link>
        </div>
      </footer>
    </div>
  )
}
