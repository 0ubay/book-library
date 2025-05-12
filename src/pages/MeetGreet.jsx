import { useState } from "react";

function MeetGreet() {
  const [form, setForm] = useState({ name: "", topic: "", date: "", time: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("https://your-render-backend-url/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to book");

      setSubmitted(true);
      setForm({ name: "", topic: "", date: "", time: "" });
    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🤝 Book Meet & Greet</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded shadow space-y-4"
      >
        {["name", "topic", "date", "time"].map((field) => (
          <input
            key={field}
            type={field === "date" || field === "time" ? field : "text"}
            name={field}
            placeholder={field === "topic" ? "Book Topic" : `Your ${field}`}
            value={form[field]}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        ))}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Booking..." : "Book Now"}
        </button>
      </form>

      {submitted && (
        <div className="mt-6 bg-green-100 text-green-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">✅ Booking Confirmed</h2>
          <p><strong>Topic:</strong> {form.topic}</p>
        </div>
      )}

      {error && <p className="text-red-500 mt-4">{error}</p>}
    </div>
  );
}

export default MeetGreet;
