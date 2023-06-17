import Link from "next/link"

import { ModeToggle } from "@/components/mode-toggle"

export function Header() {
  return (
    <header>
      <div className="flex items-center justify-between">
        <ModeToggle />
        <nav className="ml-auto text-sm font-medium space-x-6">
          <Link href="/">Home</Link>
          <Link href="/posts">Blog</Link>
        </nav>
      </div>
    </header>
  )
}
