export default function SocialAnalysisLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* We use a specific dark theme layout for the dashboard to make charts pop */}
      <nav className="border-b border-neutral-800 bg-neutral-900/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center font-bold text-white">
                SI
              </div>
              <span className="font-bold text-xl tracking-tight text-white">Social Intel</span>
            </div>
            <div className="text-sm font-medium text-neutral-400">
              Political Communication Dashboard
            </div>
          </div>
        </div>
      </nav>
      <main>
        {children}
      </main>
    </div>
  )
}
