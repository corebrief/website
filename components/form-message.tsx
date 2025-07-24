export type Message =
  | { success: string }
  | { error: string }
  | { message: string };

export function FormMessage({ message }: { message: Message | Record<string, never> }) {
  // Don't render anything if message is empty
  if (!message || Object.keys(message).length === 0) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2 w-full max-w-md text-sm">
      {"success" in message && (
        <div className="text-green-600 bg-green-50 border border-green-200 rounded-md px-4 py-3 mt-2">
          ✓ {message.success}
        </div>
      )}
      {"error" in message && (
        <div className="text-red-600 bg-red-50 border border-red-200 rounded-md px-4 py-3 mt-2">
          ⚠ {message.error}
        </div>
      )}
      {"message" in message && (
        <div className="text-blue-600 bg-blue-50 border border-blue-200 rounded-md px-4 py-3 mt-2">
          ℹ {message.message}
        </div>
      )}
    </div>
  );
}
