export default function LoadingSkeleton() {
  return (
    <div className="space-y-8">
      <div>
        <div className="h-8 w-56 animate-pulse rounded-lg bg-gray-200" />
        <div className="mt-3 h-4 w-80 animate-pulse rounded bg-gray-200" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-36 animate-pulse rounded-2xl bg-gray-200"
          />
        ))}
      </div>

      <div className="h-96 animate-pulse rounded-2xl bg-gray-200" />
    </div>
  );
}
