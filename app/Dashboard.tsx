'use client';
import { useEffect, useState } from 'react';
import { DashboardGetResponse } from './api/user/dashboard/route';
import { StatisticGetResponse } from './api/user/statistic/route';

export default function Dashboard() {
  const [table, setTable] = useState<DashboardGetResponse>();
  const [statistic, setStatistic] = useState<StatisticGetResponse>();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const [tableData, statisticData] = await Promise.all([
        fetch(`/api/user/dashboard`).then((res) => res.json()),
        fetch(`/api/user/statistic`).then((res) => res.json()),
      ]);

      setTable(tableData);
      setStatistic(statisticData);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  return (
    <>
      <h2>Statistic</h2>
      {statistic && (
        <div className="flex gap-2">
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">
              {statistic.totalUsers}
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">Total Users</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">
              {statistic.activeUsers}
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">
              Active Sessions
            </dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">
              {statistic.averageActiveUsers?.toFixed(2)}
            </dt>
            <dd className="text-gray-500 dark:text-gray-400">
              Average Active Sessions
            </dd>
          </div>
        </div>
      )}
      <br />
      <h1>Dashboard</h1>

      {table && (
        <table>
          <tr>
            <th>Email</th>
            <th>Name</th>
            <th>Sign up date</th>
            <th>Logins</th>
            <th>Latest Login</th>
          </tr>
          {table.map((row, index) => (
            <tr key={index}>
              <td>{row.email}</td>
              <td>{row.name}</td>
              <td>{row.signupDate}</td>
              <td>{row.loginCount}</td>
              <td>{row.lastLogin}</td>
            </tr>
          ))}
        </table>
      )}
    </>
  );
}
