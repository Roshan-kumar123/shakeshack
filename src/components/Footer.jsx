export default function Footer() {
  return (
    <footer
      className="w-full mt-auto py-10 text-center"
      style={{ background: '#1a4428', borderTop: '1px solid rgba(255,255,255,0.06)' }}
    >
      <p className="text-white font-black text-sm tracking-widest uppercase mb-1">🍔 Shake Shack</p>
      <p className="text-white/40 text-xs">The Big Shack Shout Challenge · Limited time campaign</p>
      <p className="text-white/25 text-[10px] mt-3">Results update in real-time · Top 10 winners contacted via WhatsApp</p>
    </footer>
  );
}
