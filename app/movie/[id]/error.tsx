"use client"; // Error components must be Client Components

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-center gap-2">
      <h2 className="text-2xl font-bold">Something went wrong!</h2>
      {error && error.digest && (
        <div className="flex flex-col items-center">
          <span className="text-xs text-gray-600">Reason:</span>
          <span className="text-xs text-gray-600">{error.message}</span>
        </div>
      )}
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className="rounded-md bg-gray-800 text-gray-50 hover:bg-gray-900 w-fit py-2 px-4 mt-4"
      >
        Try again
      </button>
    </div>
  );
}
