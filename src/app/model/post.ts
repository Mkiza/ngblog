import { User } from "./user";

export interface Post {
    id: string;
    title: string;
    content: string;
    loveIts: number;
    created_at: Date;
    hateIts: number;
    created_by: string;
}
