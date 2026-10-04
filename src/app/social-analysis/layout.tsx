export default function SocialAnalysisLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50">
      {/* We use a specific dark theme layout for the dashboard to make charts pop */}
      <main>{children}</main>
    </div>
  );
}
