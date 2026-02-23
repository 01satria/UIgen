export default function Footer() {
  return (
    <footer className="border-t border-[#1e1e1e] py-6 mt-4">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-[0.7rem] text-[#555]">◈ GlassForge v2.0 — Zero dependencies</span>
        <div className="flex items-center gap-4 sm:gap-6">
          {['Docs', 'GitHub', 'Changelog', 'MIT License'].map(link => (
            <a key={link} href="#" className="font-mono text-[0.7rem] text-[#555] hover:text-[#e4ff3c] transition-colors">
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
