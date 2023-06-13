Please follow the following steps to clone and setup all prerequisites:

- ## Prerequisites

1. **Nodejs**

Make sure to have the Node.js installed & running on your machine. If you already have installed Node on your computer, you can skip this step if your existing node version is greater than equal to 16.

2. **Yarn**

Followed by yarn which is necessary to install, update or delete the needed node packages for the specific projects.

3. **React/Nextjs**

As this codebase uses the Next Js framework, proper understanding and prior knowledge of _ **React** _ basics and fundamentals are required and also NextJs' routing and server components. For better understanding of React and NextJs we suggest you to once go through official documentation of React from [ReactJS.org](https://reactjs.org/docs/getting-started.html) along with NextJs from [NextJS.org](https://nextjs.org/).

4. **Ant Design 5**

For this codebase we chose Ant Design 5 to be its CSS framework. So prior knowledge of antd and its components followed by how the design and layouts pattern works is necessary.

5. **Redux Toolkit**

As for the global state management tool we have chosen the newly introduced redux toolkit which hugely decreases the boilerplate necessary to implement redux into a project. So prior knowledge of redux and its flow structure is necessary.

6. **Axios**

As for data fetching from backend we chose axios which is a package that helps you make HTTPRequests with ease. It also helps to intercept request and response and transform request and response data.For better understanding of how axios works you can go through the documentation of axios [axios-http.com/](https://axios-http.com/)

7. **Tailwind Css**

As for writing custom css we have used Tailwind CSS which provides a utility classes as well as we can customize classes. It focuses on providing a comprehensive set of utility classes that can be directly applied to HTML elements to style and layout the content..We suggest you to go once through the documentation of [tailwind.sh/](https://tailwindcss.com)

- ## Folder Structure

Below is an example for the conventions and folder and file naming conventions which should be followed.

The following folder tree is basically an example of how a scalable Nextjs application architecture might look and can be customized according to the developers' wish or to any project as required.

As the pages directory is solely for routing purposes as stated by Nextjs; another folder named features can be created to store the necessary files needed for each module such as the home module which can contain its own components, utilities and its own layout. Please check and go through the documentation on the pages directory and the layouts provided by the official NextJs team [NextJs/pages](https://nextjs.org/docs/basic-features/pages) & [NextJs/layouts](https://nextjs.org/docs/basic-features/layouts).

### _The \_app.tsx is the entry point and index.tsx file is the / route which are found inside the pages directory for every Nextjs application._

The document structure of the DOM can be altered from the \_document.js file inside the pages directory. [NextJs/\_document](https://nextjs.org/docs/advanced-features/custom-document)

Any file which has [] around its name inside the pages directory will be treated as a dynamic page by Next automatically.

```
📦
├─ .env.example
├─ .eslintrc.json
├─ .gitignore
├─ .husky
│  ├─ commit-msg
│  ├─ pre-commit
│  └─ pre-push
├─ .npmrc
├─ .prettierignore
├─ .prettierrc
├─ .vscode
│  └─ settings.json
├─ README.md
├─ commitlint.config.js
├─ features
│  ├─ auth
│  │  ├─ interfaces
│  │  │  └─ shared.interface.ts
│  │  ├─ layout
│  │  │  ├─ auth.styles.ts
│  │  │  └─ index.tsx
│  │  ├─ layouts
│  │  │  └─ main
│  │  │     └─ index.tsx
│  │  └─ login
│  │     └─ interface
│  │        └─ index.ts
│  ├─ home
│  │  └─ components
│  │     ├─ chart
│  │     │  └─ index.tsx
│  │     ├─ stats-card
│  │     │  └─ index.tsx
│  │     └─ user-table
│  │        └─ index.tsx
│  └─ users
│     └─ components
│        └─ user-list
│           └─ index.tsx
├─ middleware.ts
├─ next.config.js
├─ package.json
├─ pages
│  ├─ _app.tsx  # entry point and all the routes and index.tsx is the / route.
│  ├─ api
│  │  ├─ auth
│  │  │  └─ login
│  │  │     └─ index.ts
│  │  └─ hello.ts
│  ├─ auth
│  │  └─ login
│  │     ├─ index.tsx
│  │     └─ login.styles.ts
│  ├─ index.tsx
│  ├─ settings
│  │  └─ index.tsx
│  └─ users
│     ├─ [userId]
│     │  └─ index.tsx
│     ├─ create
│     │  └─ index.tsx
│     ├─ index.tsx
│     └─ users.styles.ts
├─ public
│  ├─ favicon.ico
│  └─ vercel.svg
├─ shared
│  ├─ axios
│  │  └─ index.ts
│  ├─ components
│  │  ├─ buttons
│  │  │  ├─ primary-button
│  │  │  │  └─ index.tsx
│  │  │  └─ secondary-button
│  │  │     └─ index.tsx
│  │  ├─ spinner
│  │  │  └─ index.tsx
│  │  └─ upload-file
│  │     └─ index.tsx
│  ├─ config
│  │  └─ index.ts
│  ├─ hooks
│  │  └─ store.hook.ts
│  ├─ layouts
│  │  └─ main
│  │     ├─ header
│  │     │  └─ index.tsx
│  │     ├─ index.tsx
│  │     ├─ main-layout.scss
│  │     └─ side-bar
│  │        └─ index.tsx
│  ├─ theme
│  │  └─ index.ts
│  └─ utils
│     └─ toast.util.ts
├─ store
│  ├─ index.ts
│  └─ slices
│     └─ user-slice
│        └─ index.ts
├─ styles
│  └─ globals.scss
├─ tsconfig.json
└─ yarn.lock
```

## Dev Setup

First, install the necessary packages:

```bash
yarn
```

or with

```bash
yarn install
```

run the development server:

```bash
yarn dev
```

## Deployment Setup

First, install the necessary packages:

```bash
yarn
```

then, generate build file:

```bash
yarn build
```

run the build file

```bash
yarn start
```

listen to 3000 port (default) through PM2 service:

```bash
PORT=3000 pm2 start --name project_name yarn -- start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

# CSS USAGE

There are basically two ways of using emotion:

a) @emotion/css <br/>
b) @emotion/styled <br/>

## Using @emotion/css

This method is mostly used if you have to override some CSS property and write your own custom CSS on existing CSS Framework or UI library such as: Bootstrap, ant design, material ui etc..

### _Example of using this method._

#### Step 1: Create .styles.ts file following the folder structure mentioned above

#### _Step 2: Write your CSS like:_

```js
import { css } from '@emotion/css';
```

```js
export const redButton = css`
  background-color: red;
`;
```

#### Step 3: Import it in your file and use it in className

```js
import { redButton } from './<name_of_your_file>';
```

```js
return <Button className={redButton}>Click me</Button>;
```

## Using @emotion/styled

This method is mostly useful when you have to add new html tags like div, aside or whatever you like and write a CSS in that tag

### _Example of using this method._

#### Step 1: Create .styles.ts file following the folder structure mentioned above

#### _Step 2: Write your CSS like:_

```js
import { styled } from '@emotion/styled';
```

```js
export const Button = styled.button`
  padding: 32px;
  background-color: hotpink;
  font-size: 24px;
  border-radius: 4px;
  color: black;
  font-weight: bold;
  &:hover {
    color: white;
  }
`;
```

#### Step 3: Import it in your file and use it as JSX tag

```js
import { Button } from './<name_of_your_file>';
```

```js
return <Button>Click me</Button>;
```

## Naming Convention

### For declaring variables we will be using camelCase variable names throughout the project like

```js
const handleLoginSubmit = () => {};
```

### And for creating a folder we use dash in between the words with all small letters like: <br/>user-profile

# Middleware

For middleware, next.js's own [middleware](https://nextjs.org/docs/advanced-features/middleware) feature is used.For this, a middleware.ts file is created in the root path of the project and since the code in this file runs before a request is completed,we can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.In the project, middleware is used to redirect to '/auth/login' if there is no token present.

```js
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('user');
  if (!token) return NextResponse.redirect(new URL('/auth/login', request.url));
  return NextResponse.next();
}

/**
 * Add all the protected routes here in the matcher.
 */
export const config = {
  matcher: ['/'],
};
```

There are two use cases for this in the project:

1. **With a valid API provided by backend.**

   In this case ,the file '/pages/auth/login/index.tsx' handles the login.

2. **With next.js own server-side code if there's no API ready yet.**

   In this case, a separate dummy file '/pages/auth/login/index.api.tsx' handles the login.(NOTE: remember to rename the file to login.tsx)

Similarly , cookies-next library is used for handling cookies here as shown in above code example. It provides a simple API for setting, getting, and deleting cookies in a Next.js application.

# Date formatting

[Day.js](https://day.js.org/) library is used to format dates.A single util file is present at '/shared/utils/dateAndTime-utils/dateAndTime.util.ts' for all the date manipulations.In the project it's used to export relative time.

```js
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

export const timeFromNow = (date: string) => {
  dayjs.extend(relativeTime);
  return dayjs().to(dayjs(date));
};
```

# utils

Any utilities should be made under shared/utils. If name of util is xyz:

- Make the folder name xyz-utils and file inside that folder should be named xyz.util.ts
  (**Note**: The folder name has a dash and file name has dot in the name with the folder name being plural(utils) and file name being singular(util))

# Security headers

All the security header options are set in 'next.config.js' file. The one's being used currently are:

### X-Frame-Options

This header indicates whether the site should be allowed to be displayed within an iframe. This can prevent against clickjacking  
 attacks.

### X-Content-Type-Options

This header prevents the browser from attempting to guess the type of content if the Content-Type header is not explicitly set. This
can prevent XSS exploits for websites that allow users to upload and share files.The only valid value for this header is nosniff.

### Referrer-Policy

This header controls how much information the browser includes when navigating from the current website (origin) to another. You can
read about the different options [here](https://scotthelme.co.uk/a-new-security-header-referrer-policy/). The options currently being
used is 'strict-origin'.

### Permissions-Policy

This header allows you to control which features and APIs can be used in the browser.For example, if your CMS web app does not need to
access the camera or microphone of the device, you can set the camera and microphone permissions to none. If your CMS web app requires
access to certain sensors or media content, you can set the corresponding permissions to self.

### Content-Security-Policy

This header helps prevent cross-site scripting (XSS), clickjacking and other code injection attacks. Content Security Policy (CSP) can
specify allowed origins for content including scripts, stylesheets, images, fonts, objects, media (audio, video), iframes, and more.

You can read about the many different CSP options [here](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

# Code commenting

Here are some simple rules that must be followed while writing comments on your codebase.For more detailed information, these links
can be followed:

- [JSDoc](https://www.section.io/engineering-education/jsdoc-documentation/)
- [Coding standards](https://developer.wordpress.org/coding-standards/inline-documentation-standards/javascript/#formatting-guidelines)

  Inline comments inside methods and functions should be formatted as follows:

  ## Single line comments

  They should begin with doule forward slashes

  ```js
  // Extract the array values.
  ```

  ## Multi-line comments

  ```js
  /*
   * This is a comment that is long enough to warrant being stretched over
   * the span of multiple lines. You'll notice this follows basically
   * the same format as the JSDoc wrapping and comment block style.
   */
  ```

  Important note: Multi-line comments must not begin with /\*_ (double asterisk). Use /_ (single asterisk) instead.

  ## Documentation comment

  These types of comments are signified by using double asterisk after single forward slash i.e /\*\* .The double asterisk is used to
  indicate that the comment contains special information, such as the types of parameters and return values of a function.

  ```js
  /**
   * This is a documentation comment
   *
   * This function takes in two parameters, a number and a callback function
   * The function will square the number, and then pass the result to the callback
   *
   * @param {number} num - The number to be squared
   * @param {function} callback - The function to be called with the squared result
   * @returns {number} - The result of the square operation
   */
  function squareAndCall(num, callback) {
    const squaredNum = num * num;
    callback(squaredNum);
    return squaredNum;
  }
  ```

  ## Aligning comments

  Related comments should be spaced so that they align to make them more easily readable.

  ```js
  /**
   * @param {very_long_type} name           Description.
   * @param {type}           very_long_name Description.
   */
  ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
