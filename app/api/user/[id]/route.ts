import { getSession, updateSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

type PatchForm = {
  name: string;
};

export type UserGetResponse = {
  email: string;
  name: string;
  picture: string;
};

export async function GET(req: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { user } = session;
    const userId = params.id;
    if (user?.sub !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`;
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log(res.data);
    const data = {
      name: res.data.name,
      email: res.data.email,
      picture: res.data.picture,
    };
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request, { params }: Params) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const { user } = session;
    const userId = params.id;
    if (user?.sub !== userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const data: PatchForm = await req.json();
    if (data.name.length <= 0 || data.name.length > 300) {
      return NextResponse.json(
        { error: 'Name must be between 1 and 300 characters' },
        { status: 400 }
      );
    }
    const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users/${userId}`;
    const res = await axios.patch(
      url,
      { name: data.name },
      {
        headers: {
          Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    return NextResponse.json({});
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
