import { Instagram, Youtube, Linkedin } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 px-4 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Logo and Social */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-black">DesignBetter</h2>
            <div className="flex gap-3">
              <a href="#" className="text-gray-600 hover:text-black">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Youtube className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-600 hover:text-black">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Use cases */}
          <div>
            <h3 className="mb-4 font-semibold text-black">Use cases</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black">
                  UI design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  UX design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Wireframing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Diagramming
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Brainstorming
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Online whiteboard
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Team collaboration
                </a>
              </li>
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h3 className="mb-4 font-semibold text-black">Explore</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black">
                  Design
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Prototyping
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Development features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Design systems
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Collaboration features
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Design process
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  FigJam
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 font-semibold text-black">Resources</h3>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <a href="#" className="hover:text-black">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Best practices
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Colors
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Color wheel
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Support
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Developers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-black">
                  Resource library
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}