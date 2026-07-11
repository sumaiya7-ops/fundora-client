function App() {
  return (
    <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center">
      <div className="text-center px-5">
        <span className="inline-block mb-4 rounded-full bg-emerald-100 px-4 py-2 text-sm font-semibold text-emerald-700">
          Fund ideas that matter
        </span>

        <h1 className="text-5xl md:text-7xl font-extrabold text-slate-900">
          Welcome to{" "}
          <span className="text-emerald-600">Fundora</span>
        </h1>

        <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-600">
          A friendly crowdfunding platform where bold ideas meet people who
          believe in making them real.
        </p>
      </div>
    </main>
  );
}

export default App;