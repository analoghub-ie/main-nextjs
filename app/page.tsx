"use client";

import {Card, Link, Spacer} from "@nextui-org/react";
import {articles} from "@/articles/allArticles";

export default function Home() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {articles.map((category) => (
                <Card key={category.id}
                      isHoverable
                      // isPressable
                      style={{ padding: "1rem", minWidth: "300px", flexGrow: 1 }}
                      // as={Link}
                      // href={`/category/${category.id}`}
                >
                    <h4>{category.title}</h4>

                    <Spacer y={0.5} />

                    {category.articles.map((article) => (
                        <Link
                            key={article.id}
                            href={`/category/${category.id}/article/${article.id}`}
                            style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                            {article.title}
                        </Link>
                    ))}
                </Card>
            ))}
        </div>
    );
}