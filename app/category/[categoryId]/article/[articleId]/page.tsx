import {articles} from "@/articles/allArticles";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {redirect, RedirectType} from "next/navigation";
import {MarkdownRenderer} from "@/components/markdownWrapper";
import {siteConfig} from "@/config/site";


export default async function Page({params}: {
    params: Promise<{ categoryId: string; articleId: string }>;
}) {
    const { categoryId, articleId } = await params;

    // Find the category and article
    const category = articles.find((category) => category.id === categoryId);
    const article = category?.articles.find((article) => article.id === articleId);

    if (!category) {
        // Category not found -> redirect to home
        redirect('/', RedirectType.replace);
    }

    if (!article) {
        // Article not found -> redirect to categoryId page
        redirect(`/category/${categoryId}`, RedirectType.replace);
    }

    let content = article.content
        .replaceAll('PASTEURLHERE', siteConfig.env.hostUrl)
        .replaceAll('http://localhost:3000', siteConfig.env.hostUrl)
        .replaceAll('https://dev.analoghub.ie', siteConfig.env.hostUrl)
        .replaceAll('https://analoghub.ie', siteConfig.env.hostUrl)
        // .replaceAll('#000000', 'currentColor')
        // .replaceAll('#000', 'currentColor')
    ;

    return (
        <div className="flex flex-col gap-4 overflow-auto">
            <Breadcrumbs elements={[
                {title: 'Home', href: '/'},
                {title: category.title, href: `/category/${categoryId}`},
                {title: article.title, href: `/category/${categoryId}/article/${articleId}`}
            ]}/>

            <MarkdownRenderer children={content}/>
        </div>
    );
}