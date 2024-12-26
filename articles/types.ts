export type TCategory = {
    id: string,
    title: string,
    articles: TArticle[]
};

export type TArticle = {
    id: string,
    title: string,
    description: string,
    content: string,
    lastUpdate: Date,
};