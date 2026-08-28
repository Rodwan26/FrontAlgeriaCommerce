export default function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-gray-100 bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-2">
          <div className="h-3.5 w-2/3 rounded bg-gray-200" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
        </div>
      </div>
    </div>
  );
}