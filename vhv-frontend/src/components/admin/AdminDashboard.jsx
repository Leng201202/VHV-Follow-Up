import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
         PieChart, Pie, Cell } from 'recharts';
import './AdminDashboard.css';

const AdminDashboard = () => {
  // Static data for patients and users (you can modify these as needed)
  const patientsData = [
    { id: 1, status: 'Completed' },
    { id: 2, status: 'Completed' },
    { id: 3, status: 'Pending' },
    { id: 4, status: 'Upcoming' },
    { id: 5, status: 'Completed' },
    { id: 6, status: 'Pending' },
    { id: 7, status: 'Completed' },
  ];

  const usersData = [
    { id: 1, role: 'Admin', lastLogin: '2024-11-18' },
    { id: 2, role: 'VHV', lastLogin: '2024-11-19' },
    { id: 3, role: 'VHV', lastLogin: '2024-11-10' },
    { id: 4, role: 'Admin', lastLogin: '2024-11-05' },
  ];

  // Calculate totals based on static data
  const totalPatients = patientsData.length;
  const completedFollowUps = patientsData.filter(p => p.status === 'Completed').length;
  const pendingFollowUps = patientsData.filter(p => p.status === 'Pending').length;
  const upcomingFollowUps = patientsData.filter(p => p.status === 'Upcoming').length;

  const totalUsers = usersData.length;
  const activeUsers = usersData.filter(user => new Date(user.lastLogin) > new Date('2024-11-15')).length;
  const inactiveUsers = totalUsers - activeUsers;

  // Prepare data for the charts
  const barData = [
    { name: 'Completed', value: completedFollowUps },
    { name: 'Pending', value: pendingFollowUps },
    { name: 'Upcoming', value: upcomingFollowUps },
  ];

  const pieData = [
    { name: 'Completed', value: completedFollowUps },
    { name: 'Pending', value: pendingFollowUps },
    { name: 'Upcoming', value: upcomingFollowUps },
  ];

  const COLORS = ['#4CAF50', '#FF9800', '#2196F3'];

  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      
      <div className="overview">
        <h3>Key Metrics</h3>
        <p>Total Patients Monitored: <span>{totalPatients}</span></p>
        <p>Follow-ups Completed: <span>{completedFollowUps}</span></p>
        <p>Pending Follow-ups: <span>{pendingFollowUps}</span></p>
        <p>Upcoming Follow-ups: <span>{upcomingFollowUps}</span></p>
        <p>Total Registered Users: <span>{totalUsers}</span></p>
        <p>Active Users: <span>{activeUsers}</span></p>
        <p>Inactive Users: <span>{inactiveUsers}</span></p>
      </div>

      <div className="charts">
        <div className="pie-chart">
          <h3>Follow-up Status Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bar-chart">
          <h3>Follow-ups Completed (Bar Chart)</h3>
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
      </div>
    </div>
  );
};

export default AdminDashboard;
