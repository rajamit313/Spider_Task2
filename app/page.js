import Link from "next/link";

export default function Home() {
  return (
    <main className="relative text-white font-sans overflow-hidden">

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center min-h-110 text-center px-6">
        <h1 className="text-5xl font-extrabold mb-4 text-white drop-shadow-lg">
          Make Memories, Not Math
        </h1>
        <p className="text-lg max-w-2xl text-indigo-200 mb-8">
          Track group expenses, split bills instantly, and stay friends without fighting over money.
        </p>
        <Link
          href="/signup"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-3 rounded-full font-semibold transition shadow-lg">
          Get Started
        </Link>
      </section>
      <section className="px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h3 className="text-3xl font-semibold text-blue-700 mb-8">Key Features</h3>

          <div className="flex flex-wrap justify-center gap-6 text-left text-gray-700 text-lg">
            <div className="w-full sm:w-[45%]">✅ Create & manage bill groups</div>
            <div className="w-full sm:w-[45%]">✅ Add friends and build your travel crew</div>
            <div className="w-full sm:w-[45%]">✅ Add expenses with categories</div>
            <div className="w-full sm:w-[45%]">✅ See who owes what in real time</div>
            <div className="w-full sm:w-[45%]">✅ Delete or update your expenses anytime</div>
            <div className="w-full sm:w-[45%]">✅ Visual stats with pie & circular charts</div>
          </div>
        </div>
      </section>
    </main>
  );
}