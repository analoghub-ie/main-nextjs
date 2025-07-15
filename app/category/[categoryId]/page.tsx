// app/category/[categoryId]/page.tsx

import {allFilteredArticles} from "@/articles/allArticles";
import {Button, Card, CardBody, CardHeader, Image} from "@heroui/react";
import {redirect, RedirectType} from "next/navigation";
import {CloseIcon} from "@heroui/shared-icons";
import Link from "next/link";


type Props = {
    params: Promise<{ categoryId: string }>;
}

export default async function Page({ params }: Props) {
    const { categoryId } = await params;
    const category = allFilteredArticles.find(c => c.id === categoryId);

    if (!category) redirect("/", RedirectType.replace);

    return (
        <Card shadow="sm">
            <CardHeader className="flex items-start gap-3">
                <Image
                    alt={`${category.title} logo`}
                    className="dark:invert"
                    src={category.logo ?? "/images/no-image.svg"}
                    width={50}
                />

                <div className="flex flex-col flex-1">
                    <h4 className="text-2xl font-semibold text-primary">{category.title}</h4>
                    <p className="text-small text-default-500">{category.smallDescription}</p>
                </div>

                <Button
                    isIconOnly
                    aria-label="Вернуться к списку категорий"
                    as={Link}
                    className="text-default-500 hover:text-primary"
                    href="/category"
                    radius="full"
                    size="lg"
                    variant="light"
                >
                    <CloseIcon className="w-6 h-6" />
                </Button>
            </CardHeader>

            <CardBody className="p-0">
                <ul className="p-3 space-y-3">
                    {category.articles.map((a) => (
                        <li key={a.id}>
                            <Link
                                href={`/category/${category.id}/article/${a.id}`}
                                className="block text-secondary hover:text-primary"
                            >
                                {a.title}
                            </Link>
                        </li>
                    ))}
                </ul>
            </CardBody>


        </Card>
    );
}