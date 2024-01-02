import ProfileClient from './ProfileClient';
import UpdateProfile from './UpdateProfile';
import Dashboard from './Dashboard';

export default function Home() {
  return (
    <>
      <div className="flex flex-col">
        <a href="/api/auth/login">Login</a>
        <a href="/api/auth/logout">Logout</a>
      </div>
      <ProfileClient></ProfileClient>
      <UpdateProfile></UpdateProfile>
      <Dashboard></Dashboard>
    </>
  );
}
