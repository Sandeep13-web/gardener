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

7. **Emotion**

As for writing custom css we have used Emotion which is a library designed for writing CSS Javascript.We suggest you to go once through the documentation of [emotion.sh/](https://emotion.sh/docs/introduction)

- ## Folder Structure

Below is an example for the conventions and folder and file naming conventions which should be followed.

The following folder tree is basically an example of how a scalable Nextjs application architecture might look and can be customized according to the developers' wish or to any project as required.

As the pages directory is solely for routing purposes as stated by Nextjs; another folder named features can be created to store the necessary files needed for each module such as the home module which can contain its own components, utilities and its own layout. Please check and go through the documentation on the pages directory and the layouts provided by the official NextJs team [NextJs/pages](https://nextjs.org/docs/basic-features/pages) & [NextJs/layouts](https://nextjs.org/docs/basic-features/layouts).

### _The \_app.tsx is the entry point and index.tsx file is the / route which are found inside the pages directory for every Nextjs application._

The document structure of the DOM can be altered from the \_document.js file inside the pages directory. [NextJs/\_document](https://nextjs.org/docs/advanced-features/custom-document)

Any file which has [] around its name inside the pages directory will be treated as a dynamic page by Next automatically.

```
├─ features
│  ├─ dashboard
│  │  └─ components
│  │     ├─ chart
│  │     │  └─ index.tsx
│  │     ├─ stats-card
│  │     │  └─ index.tsx
│  │     └─ table
│  │        └─ index.tsx
│  └─ users
│     └─ components
│        └─ user-list
│           └─ index.tsx
├─ next.config.js
├─ package.json
├─ pages # entry point and all the routes index.tsx is the / route.
│  ├─ _app.tsx
│  ├─ auth
│  │  └─ login
│  │     ├─ index.tsx
│  │     └─ login.styles.ts
│  ├─ index.tsx
│  ├─ customers
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
│  ├─ hooks
│  │  └─ store.hook.ts
│  ├─ interfaces
│  │  └─ shared.interface.ts
│  ├─ layouts
│  │  └─ main
│  │     ├─ header
│  │     │  └─ index.tsx
│  │     ├─ index.tsx
│  │     ├─ main-layout.styles.ts
│  │     └─ side-bar
│  │        └─ index.tsx
│  └─ utils
│     └─ toast.util.ts
├─ store
│  ├─ index.ts
│  └─ slices
│     └─ user-slice
│        └─ index.ts
├─ styles
│  └─ main-layout.styles.ts
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

#### Step 3: Import it in your folder and use it in className

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

#### Step 3: Import it in your folder and use it as JSX tag

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
   Important note: Multi-line comments must not begin with /** (double asterisk). Use /* (single asterisk) instead.

  ## Documentation comment
  These types of comments are signified by using double asterisk after single forward slash i.e /** .The double asterisk is used to 
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
