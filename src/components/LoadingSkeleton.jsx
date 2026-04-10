export default function LoadingSkeleton() {
  return (
    <div className="w-full px-6 sm:px-10 lg:px-16 pt-8 pb-16">

      {/* Podium skeleton */}
      <div className="flex items-end justify-center mb-10" style={{ gap: 'clamp(8px,2vw,32px)' }}>
        {[
          { flex: '0 0 24%', h: 'clamp(136px,20vw,280px)', av: 'clamp(42px,5.5vw,80px)' },
          { flex: '0 0 28%', h: 'clamp(180px,26vw,360px)', av: 'clamp(52px,7vw,100px)', crown: true },
          { flex: '0 0 22%', h: 'clamp(100px,15vw,210px)', av: 'clamp(38px,5vw,72px)' },
        ].map((s, i) => (
          <div key={i} className="flex flex-col items-center gap-2" style={{ flex: s.flex }}>
            {s.crown && <div className="shimmer rounded-full mb-1" style={{ width: 24, height: 24 }} />}
            <div className="shimmer rounded-full" style={{ width: s.av, height: s.av }} />
            <div className="shimmer h-3 w-3/4 rounded" />
            <div className="shimmer h-5 w-1/2 rounded" />
            <div className="shimmer w-full rounded-t-2xl" style={{ height: s.h }} />
          </div>
        ))}
      </div>

      {/* List skeleton */}
      <div className="rounded-2xl overflow-hidden border border-gray-100">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className={`flex items-center gap-4 px-6 py-4 bg-white${i < 7 ? ' border-b border-gray-100' : ''}`}>
            <div className="shimmer w-8 h-8 rounded-full shrink-0" />
            <div className="shimmer w-10 h-10 rounded-full shrink-0" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="shimmer h-3.5 w-48 rounded" />
              <div className="shimmer h-2.5 w-32 rounded" />
            </div>
            <div className="shimmer h-3 w-8 rounded shrink-0 hidden sm:block" />
            <div className="shimmer h-4 w-14 rounded shrink-0" />
            <div className="shimmer w-9 h-9 rounded-full shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
}
