import { getSession } from '@auth0/nextjs-auth0';
import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export type DashboardGetResponse = {
  email: string;
  name: string;
  signupDate: string;
  loginCount: number;
  lastLogin: string;
}[];

/**
 * @swagger
 * /api/user/dashboard:
 *   get:
 *     summary: Get dashboard details
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/DashboardGetResponse'
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
 *     DashboardGetResponse:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         name:
 *           type: string
 *         signupDate:
 *           type: string
 *           description: Date of user signup
 *         loginCount:
 *           type: number
 *           description: Number of logins
 *         lastLogin:
 *           type: string
 *           description: Last login date
 */
export async function GET(req: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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
