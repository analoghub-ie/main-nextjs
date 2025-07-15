import {MetadataRoute} from 'next'
import {siteConfig} from "@/config/site";
import {allFilteredArticles} from "@/articles/allArticles";

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteConfig.env.hostUrl,
        },
        {
            url: siteConfig.env.hostUrl + '/about',
        },

        // {
        //     url: siteConfig.env.hostUrl + '/pageTester',
        // },

        {
            url: siteConfig.env.hostUrl + '/category/',
        },
        ...allFilteredArticles
            .flatMap(category => [
                {
                    url: siteConfig.env.hostUrl + '/category/' + category.id,
                },
                ...category.articles.map(article => ({
                    url: siteConfig.env.hostUrl + '/category/' + category.id + '/article/' + article.id,
                }))
            ])
    ]
}