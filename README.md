# Workshop: Building a Minimum Viable Product (MVP) Web App

In this workshop, you'll learn how to create an MVP web app using Next.js, Prisma, and React. We'll cover setting up your environment, creating a web app, setting up a database, creating a new React component, saving and retrieving data, and adding some basic styling.

### Table of Contents

1. [Setup and Installation](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#setup-and-installation)
2. [Create the Web App](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#create-the-web-app)
3. [Database Setup](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#database-setup)
4. [Create a new React component](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#create-a-new-react-component)
5. [Save and Retrieve the Data](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#save-and-retrieve-the-data)
6. [Add some styling in CSS](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#add-some-styling-in-css)
7. [Deploy on Vercel (Optional)](https://github.com/suujia/TSB-hackathon-mvp-template/blob/main/README.md#deploy-on-vercel)

### Setup and Installation (10 mins) <a name="setup-and-installation"></a>

1. Open `Terminal` on Mac or Linux, or `Powershell` on Windows.
2. [Install Node.js](https://nodejs.org/en/download/) for running JavaScript code
3. [Install VS Code](https://code.visualstudio.com/download) for editing code

### Create the Web App (15 mins)

1. Create a new [Next.js](https://next.js/) app: `npx create-next-app@latest tsb-hackathon-mvp`

Let's use these simple settings to configure the app!

```
✔ Would you like to use TypeScript?  No
✔ Would you like to use ESLint?  Yes
✔ Would you like to use Tailwind CSS?  No
✔ Would you like to use `src/` directory?  Yes
✔ Would you like to use App Router? (recommended)  Yes
✔ Would you like to customize the default import alias (@/*)?  No
```

### Database Setup (10 mins) <a name="database-setup"></a>

1. Add a `Tweet` data model schema at the end of `/prisma/schema.prisma`.

```
model Tweet {
  id        Int      @id @default(autoincrement())
  content   String
  timestamp DateTime @default(now())
}
```

2. Run the migration to use the database schema

```
npx prisma migrate dev --name init
```

3. Create a `src/db.ts` file to set up the database connection. This file will be used to create a new Prisma client instance and export it as a default module. Prisma is a database toolkit that makes it easy to work with databases in a type-safe way.

```
import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

```

4. Start the web app

```
npm run dev
```

Go to [http://localhost:3000](http://localhost:3000) to see the web app.

### Create a new React component (30 mins) <a name="create-a-new-react-component"></a>

1. Create a new folder `src/app/new` and a new file `page.jsx` inside it.
2. Add a new React component to the new file.

```
import Link from "next/link";
import prisma from "../../db";

async function createTweet(data) {}

export default function NewTweetPage() {
  return (
    <div className="container">
      <h1>New Tweet</h1>
      <Link href="/">Back</Link>
      <form action={createTweet}>
        <input type="text" name="content" />
        <button type="submit">Tweet</button>
      </form>
    </div>
  );
}
```

3. Add a link to the new page in the `src/app/page.js` file.

```
<Link href="/new">New Tweet</Link>
```

### Save and Retrieve the Data (20 mins) <a name="save-and-retrieve-the-data"></a>

1. In the `/src/app/page.js` file, import Prisma: `import prisma from "../db";`
2. Use the Prisma client, `prisma.tweet.findMany()`, to get the tweets from the database.

```
import Link from "next/link";
import prisma from "../db";

export default async function Page() {
  const tweets = await prisma.tweet.findMany();

  return (
    <div className="container">
      <h1>Mini Twitter</h1>
      <Link href="/new">New Tweet</Link>
      <ul>
        {tweets.map((tweet) => (
          <div className="tweet" key={tweet.id}>
            {tweet.content}
          </div>
        ))}
      </ul>
    </div>
  );
}
```

3. In the `/src/app/new/page.jsx` file, import Prisma: `import prisma from "../../db";`
4. Update the createTweet function to create a new tweet.

```
async function createTweet(data) {
  "use server";
  const content = data.get("content")?.valueOf();
  if (typeof content !== "string" || content.length === 0) {
    return;
  }

  await prisma.tweet.create({
    data: {
      content,
    },
  });
  redirect("/");
}
```

### Add some styling in CSS (10 mins) <a name="add-some-styling-in-css"></a>

1. Delete everything in `globals.css` and add these custom styles to get started. Edit the styling to your liking! If you want to add styling around any component, all you need to do is add `className="your-variable-name"` to the `div`, then come here and add `.your-variable-name {}` to the CSS file.

```
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
}

.tweet {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  height: 100px;
  width: 300px;
}
```

Here are sample styles you can add to the `.tweet` class, but feel free to customize it to your liking!

```
color: blue;
border-radius: 20px;
border: 2px solid #000000;
background-color: #f0f0f0;
```

## Publish app to a real URL (Optional) <a name="deploy-on-vercel"></a>

You can follow this tutorial to deploy to a real URL using Vercel: [Next.js Tutorial #14 - Deploying to Vercel](https://www.youtube.com/watch?v=_8wkKL0LKks)
