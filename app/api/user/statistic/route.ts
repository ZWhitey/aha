import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextResponse } from 'next/server';
import dayjs from 'dayjs';

export const dynamic = 'force-dynamic';
export type StatisticGetResponse = {
  totalUsers: number;
  activeUsers: number;
  averageActiveUsers: number;
};

/**
 * @swagger
 * /api/user/statistic:
 *   get:
 *     summary: Get statistics
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/StatisticGetResponse'
 *       '401':
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             example:
 *               error: Unauthorized
 *       '500':
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               error: Something went wrong
 * components:
 *   schemas:
 *     StatisticGetResponse:
 *       type: object
 *       properties:
 *         totalUsers:
 *           type: number
 *           description: Total number of users
 *         activeUsers:
 *           type: number
 *           description: Number of active users
 *         averageActiveUsers:
 *           type: number
 *           description: Average number of active users
 */
export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const totalUsers = await getTotalUsers();
    const { activeUsers, averageActiveUsers } = await getActiveUsers();

    const data = {
      totalUsers,
      activeUsers,
      averageActiveUsers,
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

async function getTotalUsers() {
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/users?per_page=0&include_totals=true&fields=user_id`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  return res.data.total ?? 0;
}

async function getActiveUsers() {
  const TODAY = dayjs()
    .set('hour', 0)
    .set('minute', 0)
    .set('second', 0)
    .set('millisecond', 0)
    .toISOString();
  const LASTWEEK = dayjs().subtract(7, 'day').format('YYYYMMDD');
  const url = `${process.env.AUTH0_ISSUER_BASE_URL}/api/v2/stats/daily?from=${LASTWEEK}`;
  const res = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.AUTH0_MANAGEMENT_API_TOKEN}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
  const averageActiveUsers =
    res.data.reduce(
      (acc: number, cur: any) => acc + parseInt(cur.logins, 10),
      0
    ) / 7;

  const activeUsers =
    res.data.find((data: any) => data.date === TODAY)?.logins ?? 0;

  return { activeUsers, averageActiveUsers };
}
