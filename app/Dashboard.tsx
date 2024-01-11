'use client';
import { useEffect, useState } from 'react';
import { DashboardGetResponse } from './api/user/dashboard/route';
import { StatisticGetResponse } from './api/user/statistic/route';
import dayjs from 'dayjs';
import { useUser } from '@auth0/nextjs-auth0/client';

export default function Dashboard() {
  const { user, error, isLoading } = useUser();
  const [table, setTable] = useState<DashboardGetResponse>();
  const [statistic, setStatistic] = useState<StatisticGetResponse>();

  useEffect(() => {
    if (user?.email_verified) {
      fetchData();
    }
  }, [user?.email_verified]);

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
  if (isLoading) return <div className="text-center">Loading...</div>;

  if (!user?.email_verified) {
    return (
      <div className="text-center">
        You need to verify Email to access dashboard
      </div>
    );
  }

  return (
    <>
      <h1 className="text-2xl text-center">Statistic</h1>
      {statistic && (
        <div className="flex gap-2 justify-center">
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
      <h1 className="text-2xl text-center">Dashboard</h1>

      {table && (
        <div className="flex gap-2 justify-center">
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
                <td>{dayjs(row.signupDate).format('YYYY/MM/DD')}</td>
                <td>{row.loginCount}</td>
                <td>{dayjs(row.lastLogin).format('YYYY/MM/DD HH:mm:ss')}</td>
              </tr>
            ))}
          </table>
        </div>
      )}
    </>
  );
}
