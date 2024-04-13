# Prana Web

## Versions
1.0.0 - Authentication, biodiversity exploration.

## Tech Stack

##### Everywhere
🔥 [Next.js](https://nextjs.org) for the UI.
✅ [TypeScript](https://www.typescriptlang.org) for type checking and with strict mode enabled.
✏️ [ESLint](https://eslint.org) for linting.
🛠 [Prettier](https://prettier.io) for automatic code formatting.
🚀 [Vercel](https://vercel.com/) for quick deployments and geolocated hosting.
⚡ [Vitest](https://vitest.dev/) for unit testing components, hooks, and utilities.
🎭 [Playwright](https://playwright.dev/) for end-to-end testing.
💸 [Stripe](https://stripe.com/) for secure payments.

##### Client Specific
🐶 [SWR](https://swr.vercel.app/) for data fetching.
🏗️ [Shadcn](https://ui.shadcn.com/) for component building blocks.
📝 [React Hook Form](https://www.react-hook-form.com/) for performant, flexible forms.
🎨 [Tailwind CSS](https://tailwindcss.com) for utility-first responsive styling.
⚛️ [Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) for a modular UI built up of atoms, molecules, organisms, layouts, and pages.

##### Server Specific
🔥 [Next.js](https://nextjs.org) for the API Routes.
🚣‍♀️ [Nile](https://www.thenile.dev/) for serverless, tenant virtualized data storage, authentication, and authorization.


## Contribute

##### Getting Started

1. Email @cbarrett3 for the credentials
2. Place .env within `/nile-db`
3. Place .env.development.local within `/prana-next`
4. Install dependencies and run
   - `cd prana-next`
   - `rd /s /q node_modules` (windows) to remove node modules first
   - `npm install --save`
   - `npm run dev`
5. Navigate to http://localhost:3000/

##### How to test
```
npm run test
```
```
npm run coverage
```

##### How to build
```
npm run build
```

##### How to connect to vercel project
```
npm i -g vercel
vercel link
```

##### How to get environment variables from vercel
```
vercel env pull .env.development.local
```
