import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap prose-page">
      <h1>This page is not in the shop.</h1>
      <p>
        <Link className="link" href="/spirits">
          Back to Mimir
        </Link>
      </p>
    </div>
  );
}
