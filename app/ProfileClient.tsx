'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserGetResponse } from './api/user/[id]/route';
import UpdateProfile from './UpdateProfile';
import Dashboard from './Dashboard';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  useEffect(() => {
    getProfile();
  });

  const [profile, setProfile] = useState<UserGetResponse>();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  if (!user) return <span>Not logged in</span>;

  function getProfile() {
    if (!user?.sub || profile) {
      return;
    }
    fetch(`/api/user/${user?.sub}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
      });
  }

  return (
    profile && (
      <>
        <div className="flex gap-2 justify-center">
          <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="flex justify-end px-4 pt-4"></div>
            <div className="flex flex-col items-center pb-10">
              <Image
                className="w-24 h-24 mb-3 rounded-full shadow-lg"
                src={profile.picture ?? ''}
                alt={profile.name ?? 'user picture'}
                width={100}
                height={100}
              />
              <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                {profile.name}
              </h5>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {profile.email}
              </span>
            </div>
          </div>
          <UpdateProfile></UpdateProfile>
        </div>
        <br />
        <Dashboard></Dashboard>
      </>
    )
  );
}
