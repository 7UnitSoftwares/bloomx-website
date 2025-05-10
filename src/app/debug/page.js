export default function Debug() {
    return (
      <div className="container mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md mt-10">
        <h1>Environment Variables</h1>
        <pre>
          {JSON.stringify({
            NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL,
            NEXT_PUBLIC_DEBUG: process.env.NEXT_PUBLIC_DEBUG,
          }, null, 2)}
        </pre>
        </div>
      </div>
    );
  }