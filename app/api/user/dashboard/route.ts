import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextResponse } from 'next/server';

export type DashboardGetResponse = {
  email: string;
  name: string;
  signupDate: string;
  loginCount: number;
  lastLogin: string;
}[];

export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { user } = session;

    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });

    const users = res.data || [];
    const responseData: DashboardGetResponse = users.map((user: any) => {
      return {
        email: user.email,
        name: user.name,
        signupDate: user.created_at,
        loginCount: user.logins_count,
        lastLogin: user.last_login,
      };
    });

    return NextResponse.json(responseData);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
