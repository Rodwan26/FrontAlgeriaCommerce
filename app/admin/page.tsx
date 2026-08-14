"use client";

export default function AdminPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        Admin Dashboard
      </h1>

      <button
        type="button"
        onClick={() => alert("Hello")}
        className="mt-5 rounded-xl bg-black px-5 py-3 text-white"
      >
        Test
      </button>
    </div>
  );
}