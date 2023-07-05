import Head from 'next/head';
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';
import { Button } from '@chakra-ui/react';

import styles from '../../styles/SingleProduct.module.css';

const SingleProduct = ({ product }) => {
    return (
        <>
            <Head>
                <title>{product?.name}</title>
            </Head>
            <div className={styles.single_container}>
                <div className={styles.left_section}>
                    <img src={product?.image?.url} className={styles.left_img} alt="" />
                </div>
                <div className={styles.right_section}>
                    <h3 className={styles.title}>{product?.name}</h3>
                    <p className={styles.price}>${product?.price}</p>
                    <div
                        className={styles.para}
                        dangerouslySetInnerHTML={{
                            __html: product?.description?.html,
                        }}
                    ></div>
             {/*       <Button
                        data-item-id={product?.id}
                        data-item-price={product?.price}
                        data-item-url={`products/${product?.slug}`}
                        data-item-image={product?.image?.url}
                        data-item-name={product?.name}
                    >
                        Add to cart with others payments gateways
                    </Button>*/}
                </div>
            </div>
        </>
    );
};

export default SingleProduct;

export async function getStaticProps({ params }) {
    const client = new ApolloClient({
        uri:
            'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cljpst1tv09d701ul0rt71g6n/master',
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
      query ProductQuery($slug: String!) {
        product(where: { slug: $slug }) {
          id
          name
          price
          slug
          description {
            html
          }
          image {
            url
          }
        }
      }
    `,
        variables: {
            slug: params.productslug,
        },
    });

    const product = data.product;

    return {
        props: {
            product,
        },
    };
}

export async function getStaticPaths() {
    const client = new ApolloClient({
        uri:
            'https://api-us-east-1-shared-usea1-02.hygraph.com/v2/cljpst1tv09d701ul0rt71g6n/master',
        cache: new InMemoryCache(),
    });

    const { data } = await client.query({
        query: gql`
      query ProductsQuery {
        products {
          slug
        }
      }
    `,
    });

    const paths = data.products.map((product) => ({
        params: {
            productslug: product.slug,
        },
    }));

    return {
        paths,
        fallback: false,
    };
}
