import { SafeHtml } from "@angular/platform-browser";

export interface News{
    news_id: number | null,
    subject: string[] | null,
    submitted: string | null,
    title: string | null,
    snippet: string | null,
    content: SafeHtml | null,
    comments: Comment[] | null,
    author: string | null,
}

// NOTE: don't need is_author, since author is stored in comment and username is stored in session.
export interface Comment{
    author: string | null,
    child_comments: Comment[] | null,
    submitted: string | null,
    comment_id: number | null,
    parent_comment: number | null,
    news_id: number | null,
    content: string | null
}

export interface NewsPostResponse{
    id: number,
    message: string
}

export interface NewsResponse{
    results: News[]
}

export const NULL_NEWS : News = {
    news_id: null, 
    submitted: null,
    subject: null,
    title: null,
    snippet: null,
    content: null,
    comments: [],
    author: null
}