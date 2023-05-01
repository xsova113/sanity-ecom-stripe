import imageUrlBuilder from '@sanity/image-url'
import { createClient } from 'next-sanity';

export const client = createClient({
    projectId: 'l5g5wqt3',
    dataset: 'production',
    apiVersion: '2023-04-28',
    useCdn: true,
    token: process.env.NEXT_PUBLIC_SANITY_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);