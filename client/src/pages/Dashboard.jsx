import DashboardLayout from "../components/DashboardLayout";
import AIWidget from "../components/widgets/AIWidget";
import FocusTimer from "../components/widgets/FocusTimer";
import TasksWidget from "../components/widgets/TasksWidget";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl dark:text-white font-bold mb-4">Welcome back! 👋</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <FocusTimer />
    <TasksWidget />
    <AIWidget />
  </div>
    </DashboardLayout>
  );
};

export default Dashboard;
