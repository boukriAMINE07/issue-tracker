import {z} from 'zod';

export const createIssueSchema=z.object({
    title:z.string().min(3,'title must be at least 3 characters long').max(255),
    description:z.string().min(1,'description must be at least 1 character long ')
})