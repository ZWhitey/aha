'use client';
import { useEffect, useState } from 'react';
import { DashboardGetResponse } from './api/user/dashboard/route';

export default function Dashboard() {
  const [table, setTable] = useState<DashboardGetResponse>();

  useEffect(() => {
    getTable();
  });

  function getTable() {
    if (table) {
      return;
    }
    fetch(`/api/user/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        setTable(data);
      });
  }

  return (
    <>
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
