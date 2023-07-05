import Head from 'next/head';
import Link from 'next/link';

import styles from '../styles/Home.module.css';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
export default function Home({ allProducts }: { allProducts: any }) {
    return (
        <>
            <Head>
                <title>Food | Home</title>
            </Head>
            <div className="container">
                <h2 className={styles.title}>
                    All Products
                </h2>
                <div className={styles.products_container}>
                    {allProducts.map((product: any) => {
                        return (
                            <div className={styles.product_card} key={product.id}>
                                <Link href={`products/${product.slug}`}>
                                    <div className="bg-gray-100">
                                        <img
                                            src={product.image?.url}
                                            className={styles.product_img}
                                            alt=""
                                       />
                                    </div>

                                </Link>
                                <div className={styles.product_content}>
                                    <h3>{product.name}</h3>
                                    {/*<p>${product?.price}</p>*/}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export async function getStaticProps() {
    const client = new ApolloClient({
        uri: 'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cljpst1tv09d701ul0rt71g6n/master',
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
            query {
                products {
                    id
                    name
                    slug
                    price
                    image {
                        url
                    }
                }
            }
            
        `,
    });

    const allProducts = data.products;

    return {
        props: {
            allProducts,
        },
    };
}