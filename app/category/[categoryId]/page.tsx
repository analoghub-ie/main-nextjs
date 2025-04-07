import {allFilteredArticles} from "@/articles/allArticles";
import {Link} from "@nextui-org/react";
import {Metadata} from "next";
import {redirect, RedirectType} from "next/navigation";
import {Breadcrumbs} from "@/components/breadcrumbs";

type Props = {
    params: Promise<{ categoryId: string }>;
};

export async function generateStaticParams() {
    return allFilteredArticles.flatMap((category) => ({
        categoryId: category.id,
    }));
}

export async function generateMetadata({ params }: Props) {
    const { categoryId } = await params;

    const category = allFilteredArticles.find((category) => category.id === categoryId);

    return {
        title: category?.title,
    } satisfies Metadata
}

export default async function Page({params}: Props) {

    const { categoryId } = await params;

    // Find the category and article
    const category = allFilteredArticles.find((category) => category.id === categoryId);

    if (!category) {
        // Category not found -> redirect to home
        redirect('/', RedirectType.replace);
    }

    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <Breadcrumbs elements={[
                {title: 'Home', href: '/'},
                {title: category.title, href: `/category/${categoryId}`},
            ]}/>

            <div className="flex flex-col gap-1 overflow-auto">
                {category.articles.map((article) => (
                    <Link
                        key={article.id}
                        href={`/category/${category.id}/article/${article.id}`}
                        style={{ display: "block", marginBottom: "0.5rem" }}
                    >
                        {article.title}
                    </Link>
                ))}
            </div>
        </div>
    );
}