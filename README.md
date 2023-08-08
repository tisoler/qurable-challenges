This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install all dependencies:

```bash
yarn install
```

Then, run the development server locally:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Other scripts:

You can run this one to generate the files to be deployed. Files will be placed in the folder .next
``` bash
yarn build
```

You can run theapp from the built files runnig:
``` bash
yarn start
```

This project includes EsLint so you can check for lint errors or warnings running:
``` bash
yarn lint
```

## Environment variables:

You have to include a file called ```.env``` that contains the env variables, they have to start with prefix ```NEXT_PUBLIC```
You can take the file content from ```.env.example```, the key ```NEXT_PUBLIC_BACKEND_URL``` is required.

## Exercise 5 - real-time updates

Regarding to the requirement: Implement some form of real-time updates (e.g., users see new events as soon as they're created without having to refresh the page).

The selected approach is Server-sent events. Since we need to send messages from the server to clients, a unidirectional channel is enough to reach the goal (instead of a web socket for example). Client side needs to be subscribed to the events of uri: NEXT_PUBLIC_BACKEND_URL/stream (src\app\exercise5\context\globalContext.tsx)

## Sandbox

The app is running in https://qurable.tisoler.net.ar/

## Test users - exercise 5

In order to test the app with authenticated users some credentials are provided:
```admin/12345```
```user/12121```

Exercise url: https://qurable.tisoler.net.ar/exercise5
