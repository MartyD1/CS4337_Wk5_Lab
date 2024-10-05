This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## How to set up your credentials to use the AWS-SDK

1. Log into AWS Mangement Console as root user -[here](https://aws.amazon.com/console/)
2. Navigate to your account options drop-down
   - click on your account name and then click 'Security Credentials'
3. Once in this menu, scroll down to where it says access keys, and create a new access key.
4. When creating the access key, ignore the root user warnings and continue.
   **NOTE** This is not the _best practice_ approach for enabling access to the resources on your AWS account. We should be using IAM Users/Groups and assigning certain permissions to them individually - but thought this would be easier for lab folks, and we can hopefully just make sure all access keys for the root user account are deleted at the end of the lab :D
5. Now you have your Access Key and your Secret Access Key.
   - DONT CLOSE THIS PAGE
6. Now open a powershell terminal and copy & paste the following.

```
$Env:AWS_ACCESS_KEY_ID="AKIAIOSFODNN7EXAMPLE"
$Env:AWS_SECRET_ACCESS_KEY="wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY"
$Env:AWS_DEFAULT_REGION="us-west-2"
```

- replace the _AWS_ACCESS_KEY_ID_ with your access key
- replace the _AWS_SECRET_ACCESS_KEY_ with your secret access key
- replace the _AWS_DEFAULT_REGION_ with your accounts region (should be **eu-west-1**)

Now you can use AWS resources in your project!
