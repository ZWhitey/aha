This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Swagger api document

Open [http://localhost:3000/api/doc](http://localhost:3000/api/doc) to use api doc

## Assessment

Create a simple app where users can sign up and sign in from a landing page into a simple dashboard. The landing page can be blank with only two separate links to **“Sign Up”** and **“Sign In”**. The simple dashboard can only be accessed after the user signs up or signs in.

### Part 1: API

- [x] **Sign Up [50 points]**
      The Sign Up page should allow users 2 options to create an account:

  1. Email and user defined password
  2. Google OAuth

  You can use any third party tool, library, or API for this. In fact, to save time, it is highly recommended that you use a third party auth API. Create your own guest or trial accounts with third party tools. We only need a live demo app to test for 1 or 2 weeks.

- [x] **User Defined Password [20 points]**
      The user defined password must be entered twice and match. In addition, the password must be validated by the following conditions.
  - contains at least one lower character
  - contains at least one upper character
  - contains at least one digit character
  - contains at least one special character
  - contains at least 8 characters
- [x] **Email Verification [40 points]**
      For the user defined password, after the validated password is entered, your back-end app must send an verification email to the email address provided. The email must contain a link, that if the user clicks the link, their email will be verified in the back-end and the user will be directed to a simple dashboard in a new browser.

  Only accounts that have email verified can access the simple dashboard. Users that have not verified email will only see a button or link that says “Resend Email Verification”, and clicking on this link will resend the same email verification.

  Only accounts created via email and password must be verified with email verification. Google OAuth sign up account does not need to send email verification, and can immediately access the simple dashboard.

  Like with authentication, you can use any third party email sending tool, library, or API. Create your own guest or trial accounts. We only need a live demo app to test for 1 or 2 weeks.

- [x] **Login [10 points]**
      We will allow users to login through the 2 methods that users can sign up with:

  1. email and user defined password
  2. Google OAuth

  You can use any third party tool, library, or API for this feature.

- [x] **User Profile [20 points]**
      The user profile will display the user’s email and name (from Google OAuth). In addition, the user can reset their name. Everytime the user goes to user profile, the user should see the name they have chosen.
- [?] **Reset Password [30 points]**
  In the simple dashboard, add the ability to reset password. The password must meet the same criterias as defined previously. In addition, the user must enter 3 text input boxes:

  1. Old passwordS
  2. New password
  3. Re-enter new password

  ```
  Note: Auth0 API cannot verify whether the user-entered password is correct. I believe directly utilizing Auth0's 'Forgot Password' functionality is the best solution, not only because it is easy to implement but also because it provides a higher level of security.
  ```

- [x] **Cookies and Logout [50 points]**
      Store cookies in the browser so that next time a logged in user returns to your site, the user will be automatically logged in. Add a logout feature in the user profile so that cookies can be cleared.
- [x] **User Database Dashboard [50 points]**
      Create a dashboard with a list of all users that have signed up to your app. For each user, show the following information:
  1. Timestamp of user sign up.
  2. Number of times logged in.
  3. Timestamp of the last user session. For users with cookies, session and login may be different, since the user may not need to log in to start a new session.
- [x] **User Statistics [30 points]**
      At the top of the user database dashboard, show the following statistics:
  1. Total number of users who have signed up.
  2. Total number of users with active sessions today.
  3. Average number of active session users in the last 7 days rolling.
  ```
  Note: Auth0 API provides daily statistical results, and real-time data is not available. Therefore, Total number of users with active sessions today will always be zero.
  ```
