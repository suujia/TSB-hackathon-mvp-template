import Image from "next/image";
import Link from "next/link";

export default function Page() {
  return (
    <div className="container">
      <h1>Hello World</h1>
      <Link href="/new" className="button">
        Create New Todo
      </Link>
    </div>
  );
}
