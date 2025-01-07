import {MetadataRoute} from 'next'
import {siteConfig} from "@/config/site";
import {articles} from "@/articles/allArticles";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteConfig.env.hostUrl,
        },
        {
            url: siteConfig.env.hostUrl + '/about',
        },

        ...articles
            .filter(e => !e.onlyDev || siteConfig.env.dev)
            .filter(e => e.articles.length)
            .flatMap(category => category.articles.map(article => ({
                url: `${siteConfig.env.hostUrl}/category/${category.id}/article/${article.id}`
            })))
    ]
}