import Link from "next/link";

export default function Page() {
  return (
    <div className="container">
      <h1>New Todos</h1>
      <Link href="/" className="button">
        Go back
      </Link>
    </div>
  );
}
