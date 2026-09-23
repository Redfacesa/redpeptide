import type { Metadata } from "next";
import Link from "next/link";
import { articles } from "@/lib/catalog";

export const metadata: Metadata = { title: "Journal" };

export default function JournalPage() {
  return (
    <div className="wrap pad">
      <div className="page-title">
        <p className="eyebrow">Journal</p>
        <h1>Notes on quality and dispatch</h1>
      </div>
      <div className="news" style={{ marginTop: 20 }}>
        {articles.map((article) => (
          <Link className="story" key={article.slug} href={`/journal/${article.slug}`}>
            <p className="eyebrow">{article.kicker}</p>
            <h3>{article.title}</h3>
            <p>{article.excerpt}</p>
            <span className="date">{article.date}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
