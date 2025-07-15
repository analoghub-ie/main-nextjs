import {allFilteredArticles} from "@/articles/allArticles";
import Link from "next/link";
import {Card, CardHeader, Image} from "@heroui/react";
import clsx from "clsx";
import React from "react";

export const dynamic = "force-static";

export const MainCategories = React.memo(function MainCategories({ small }: { small?: boolean }) {
    return (
        <div className={'main-categories'} style={{ display: "flex", flexWrap: "wrap", gap: "1rem", flexBasis: "100%", alignItems: "center" }}>
            {allFilteredArticles.map((category) => (
                <Link key={category.id}
                      href={`/category/${category.id}`}
                      style={{flexGrow: 1}}>
                    <Card
                        shadow={small ? "sm" : undefined}
                        isHoverable
                        isPressable
                        style={{
                            padding: !small ? "1rem" : "0.5rem",
                            minWidth: "300px", width: '100%',
                            flexGrow: 1,
                            alignItems: 'start'
                        }}
                    >
                        <CardHeader className={clsx(
                            'gap-2',
                            // small ? 'py-0.75' : undefined
                        )}>
                            <Image
                                alt={`${category.title} logo`}
                                className={'dark:invert'}
                                width={50}
                                // radius="sm"
                                src={category.logo || "/images/no-image.svg"}
                            />

                            <div className="flex flex-col">
                                <h4 className={'text-2xl font-semibold text-primary text-start'}>{category.title}</h4>
                                <p className="text-small text-default-500 text-start">{category.smallDescription}</p>
                            </div>
                        </CardHeader>
                    </Card>
                </Link>
            ))}
        </div>
    );
});