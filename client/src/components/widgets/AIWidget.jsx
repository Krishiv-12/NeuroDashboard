import { useState } from "react";
import api from "../../api";

const AIWidget = () => {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    try {
      const res = await api.post(
        "/api/openai/chat",
        { message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setResponse(res.data.message);
      setMessage("");
    } catch (err) {
      console.error("AI Error:", err.response?.data || err.message);
      setResponse("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-slate-300 p-6 rounded-xl shadow-md">
      <h3 className="text-2xl text-center font-bold mb-4">🤖 AI Assistant</h3>

      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Ask something..."
        className="w-full p-3 border rounded mb-4"
        rows={3}
      />

      <button
        onClick={handleSend}
        disabled={loading}
        className="bg-blue-500 text-white w-full py-2 rounded-xl hover:bg-blue-600"
      >
        {loading ? "Thinking..." : "Ask AI"}
      </button>

      {response && (
  <div className="mt-4 p-3 h-72 bg-slate-100 rounded-xl overflow-y-auto whitespace-pre-wrap">
    <strong>AI:</strong> {response}
  </div>
)}
    </div>
  );
};

export default AIWidget;
