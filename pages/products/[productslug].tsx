import Head from 'next/head';

import styles from '../../styles/SingleProduct.module.css';

import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import {Button} from "@chakra-ui/react";

const singleproduct = ({ product }: { product: any }) => {
    return (
        <>
            <Head>
                <title>{product.name}</title>
            </Head>
            <div className={styles.single_container}>
                <div className={styles.left_section}>
                    <img src={product.image.url} className={styles.left_img} alt="" />
                </div>
                <div className={styles.right_section}>
                    <h3 className={styles.title}>{product.name}</h3>
                    <p className={styles.price}>${product.price}</p>
                    <div
                        className={styles.para}
                        dangerouslySetInnerHTML={{
                            __html: product.description.html,
                        }}
                    ></div>
                    <Button
                        data-item-id={product.id}
                        data-item-price={product.price}
                        data-item-url={`products/${product.slug}`}
                        data-item-image={product.image.url}
                        data-item-name={product.name}
                    >
                        Add to cart 🛒
                    </Button>
                </div>
            </div>
        </>
    );
};

export async function getStaticPaths() {
    const client = new ApolloClient({
        uri: 'https://api-us-east-1.graphcms.com/v2/cl2cupjxo4izz01z8fcm26gxf/master',
        cache: new InMemoryCache(),
    });

    const data = await client.query({
        query: gql`
			query ProductsQuery {
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


    const paths = data.data.products.map((singleProduct: any) => {
        return {
            params: {
                productslug: singleProduct.slug,
            },
        };
    });

    return {
        paths,
        fallback: false,
    };
}


export default singleproduct;