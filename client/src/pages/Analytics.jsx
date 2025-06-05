import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
  } from "recharts";
  import { usePomodoroAnalytics } from "../hooks/usePomodoroAnalytics";
  
  const Analytics = () => {
    const data = usePomodoroAnalytics();
  
    return (
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">📊 Pomodoro Analytics</h2>
  
        {data.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-300">No sessions logged yet.</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Bar Chart for Sessions */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Focus Sessions (Per Day)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="sessions" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
  
            {/* Line Chart for Time */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
              <h3 className="text-lg font-semibold mb-2">Focus Time (Minutes)</h3>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="minutes" stroke="#10b981" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    );
  };
  
  export default Analytics;
  