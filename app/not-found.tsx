import Link from "next/link";

export default function NotFound() {
  return (
    <div className="wrap pad prose">
      <p className="eyebrow">404</p>
      <h1>That page is not in the catalog.</h1>
      <p>The compound or note you asked for is not part of this sample store.</p>
      <p><Link className="btn" href="/shop">Back to the shop</Link></p>
    </div>
  );
}
