import { redirect } from "next/navigation";
import Link from "next/link";
import prisma from "../../db";

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
