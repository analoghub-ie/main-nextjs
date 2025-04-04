import {allFilteredArticles} from "@/articles/allArticles";
import {Breadcrumbs} from "@/components/breadcrumbs";
import {redirect, RedirectType} from "next/navigation";
import {MarkdownRenderer} from "@/components/markdownWrapper";
import {siteConfig} from "@/config/site";
import {Metadata} from "next";
import {ScrollToHash} from "@/components/scrollToHash";


type Props = {
    params: Promise<{ categoryId: string; articleId: string }>;
};

export async function generateStaticParams() {
    return allFilteredArticles.flatMap((category) =>
        category.articles.map((article) => ({
            categoryId: category.id,
            articleId: article.id,
        }))
    );
}

export async function generateMetadata({ params }: Props) {
    const { categoryId, articleId } = await params;

    const category = allFilteredArticles.find((category) => category.id === categoryId);
    const article = category?.articles.find((article) => article.id === articleId);

    return {
        title: article?.title,
        description: article?.description,
    } satisfies Metadata
}

export default async function Page({params}: Props) {
    const { categoryId, articleId } = await params;

    // Find the category and article
    const category = allFilteredArticles.find((category) => category.id === categoryId);
    const article = category?.articles.find((article) => article.id === articleId);

    if (!category) {
        // Category not found -> redirect to home
        redirect('/', RedirectType.replace);
    }

    if (!article) {
        // Article not found -> redirect to categoryId page
        redirect(`/category/${categoryId}`, RedirectType.replace);
    }

    const content = article.content
            .replace(/<(?!iframe)([a-zA-Z][^>]*)$/gm, '&lt;$1') // Escape all tags except iframe
            .replace(/<pre[^>]*><code[^>]*>([\s\S]*?)<\/code><\/pre>/gi,
                (match, codeContent) => {
                    const escaped = codeContent
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    return match.replace(codeContent, escaped);
                })
            .replace(/```(\w+)?\n([\s\S]*?)```/g,
                (match, lang, codeContent) => {
                    const escaped = codeContent
                        .replace(/</g, '&lt;')
                        .replace(/>/g, '&gt;');
                    return `\`\`\`${lang ?? ''}\n${escaped}\`\`\``;
                })
            // .replace(/<([a-zA-Z][^>]*)$/gm, '&lt;$1')
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

            <MarkdownRenderer>
                {content}
            </MarkdownRenderer>

            <ScrollToHash/>
        </div>
    );
}