const Overview = () => {
  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
        📊 Overview
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Total Tasks */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Total Tasks</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">24</h3>
          </div>
          <div className="text-blue-500 dark:text-blue-400 text-3xl">📋</div>
        </div>

        {/* Focus Time */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Focus Time Today</p>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">90 mins</h3>
          </div>
          <div className="text-green-500 dark:text-green-400 text-3xl">⏱️</div>
        </div>

        {/* AI Suggestion */}
        <div className="bg-white dark:bg-gray-800 shadow rounded-xl p-4 flex items-start justify-between">
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">AI Suggestion</p>
            <h3 className="text-md font-medium text-gray-900 dark:text-white mt-1">
              "Take a 5-minute break after every 25 minutes of work."
            </h3>
          </div>
          <div className="text-purple-500 dark:text-purple-400 text-3xl">🤖</div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
