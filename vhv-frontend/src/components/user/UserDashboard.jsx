import React from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';


const OverviewPanel = () => {
  // Static data: Array of patient records
  const patients = [
    { id: 1, name: 'John Doe', followUpStatus: 'Completed' },
    { id: 2, name: 'Jane Smith', followUpStatus: 'Completed' },
    { id: 3, name: 'Alice Brown', followUpStatus: 'Pending' },
    { id: 4, name: 'Bob White', followUpStatus: 'Upcoming' },
    { id: 5, name: 'Charlie Green', followUpStatus: 'Completed' },
    // Add more patient data as needed
  ];

  // Calculate the total number of patients and completed follow-ups
  const totalPatients = patients.length;
  const completedFollowUps = patients.filter(patient => patient.followUpStatus === 'Completed').length;
  const pendingFollowUps = patients.filter(patient => patient.followUpStatus === 'Pending').length;
  const upcomingFollowUps = patients.filter(patient => patient.followUpStatus === 'Upcoming').length;

  // Data for Bar Chart
  const barData = [
    { name: 'Completed', value: completedFollowUps },
    { name: 'Pending', value: pendingFollowUps },
    { name: 'Upcoming', value: upcomingFollowUps },
  ];

  // Data for Pie Chart
  const pieData = [
    { name: 'Completed', value: completedFollowUps },
    { name: 'Pending', value: pendingFollowUps },
    { name: 'Upcoming', value: upcomingFollowUps },
  ];

  // Pie chart colors
  const COLORS = ['#FF9800', '#2196F3', '#4CAF50']; // Adjust green color position here

  return (
    <div className="overview-panel">
      <h2>Overview</h2>
      <div className="overview-stats">
        <p>Total Patients Monitored: <span>{totalPatients}</span></p>
        <p>Follow-ups Completed: <span>{completedFollowUps}</span></p>
        <p>Pending Follow-ups: <span>{pendingFollowUps}</span></p>
        <p>Upcoming Follow-ups: <span>{upcomingFollowUps}</span></p>
      </div>

      <div className="charts">
        <div className="bar-chart">
          <h3>Follow-up Status (Bar Chart)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4CAF50" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-chart">
          <h3>Follow-up Distribution (Pie Chart)</h3>
          <ResponsiveContainer width="100%" height={400}> {/* Increased height for larger pie */}
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120} // Increased outer radius for a larger pie
                innerRadius={60}  // Optional: Can adjust this to create a donut chart
                fill="#8884d8"
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default OverviewPanel;
