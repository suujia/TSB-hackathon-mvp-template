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
