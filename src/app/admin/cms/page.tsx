import Link from "next/link"
import { Globe, Briefcase, MessageSquare, Users, BarChart2, Settings, Layers, Info } from "lucide-react"

const sections = [
  { href: "/admin/cms/hero", label: "Hero", icon: Globe, description: "Main hero section content" },
  { href: "/admin/cms/about", label: "About", icon: Info, description: "About page hero & story content" },
  { href: "/admin/cms/services", label: "Services", icon: Layers, description: "Manage service offerings shown on the public site" },
  { href: "/admin/cms/portfolio", label: "Portfolio", icon: Briefcase, description: "Showcase projects displayed to visitors" },
  { href: "/admin/cms/testimonials", label: "Testimonials", icon: MessageSquare, description: "Client quotes and ratings" },
  { href: "/admin/cms/team", label: "Team", icon: Users, description: "Public team member profiles" },
  { href: "/admin/cms/values", label: "Values", icon: BarChart2, description: "Why Us section content" },
  { href: "/admin/cms/settings", label: "Global Settings", icon: Settings, description: "SEO, company info, and global content" },
]

export default function CmsDashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Content Management</h1>
        <p className="text-neutral-400 mt-1">Manage all public-facing content for the FASE website.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sections.map((section) => {
          const Icon = section.icon
          return (
            <Link
              key={section.href}
              href={section.href}
              prefetch={true}
              className="group block p-6 rounded-xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all duration-200 hover:bg-neutral-800/50"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-neutral-800 group-hover:bg-neutral-700 transition-colors">
                  <Icon className="w-5 h-5 text-[#B9fA3C]" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-white group-hover:text-[#B9fA3C] transition-colors">{section.label}</p>
                  <p className="text-sm text-neutral-500 mt-0.5">{section.description}</p>
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
