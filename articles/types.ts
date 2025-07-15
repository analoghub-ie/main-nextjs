export type TCategory = {
    id: string,
    title: string,
    articles: TArticle[]
    logo?: string,
    smallDescription?: string,

    hideInProd?: boolean,
};

export type TArticle = {
    id: string,
    title: string,
    description: string,
    content: string,
    lastUpdate: Date,

    hideInProd?: boolean,
};