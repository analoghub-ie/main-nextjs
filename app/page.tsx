// "use client";

import {Card, Link, Spacer} from "@nextui-org/react";
import {allFilteredArticles} from "@/articles/allArticles";
import moment from "moment";

export default function Home() {
    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem" }}>
            {allFilteredArticles.map((category) => (
                <Card key={category.id}
                      isHoverable
                      // isPressable
                      style={{ padding: "1rem", minWidth: "300px", flexGrow: 1, alignItems: 'start' }}
                      // as={Link}
                      // href={`/category/${category.id}`}
                >
                    <h3 className={'text-2xl font-semibold mb-3'}>{category.title}</h3>

                    <Spacer y={0.5} />

                    {category.articles
                        .sort((a, b) => moment(b.lastUpdate).isAfter(a.lastUpdate) ? 1 : -1)
                        .slice(0, 3) // Show only 3 articles
                        .map((article) => (
                        <Link
                            key={article.id}
                            href={`/category/${category.id}/article/${article.id}`}
                            style={{ display: "block", marginBottom: "0.5rem" }}
                        >
                            {article.title}
                        </Link>
                    ))}

                    <Spacer y={0.5} />

                    {category.articles.length > 3 && (
                        <Link
                            href={`/category/${category.id}`}
                            style={{ display: "block", marginBottom: "0.5rem", alignSelf: 'end' }}
                        >
                            ...and {category.articles.length - 3} more
                        </Link>
                    )}
                </Card>
            ))}
        </div>
    );
}