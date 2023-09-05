import { GetStaticPaths, type GetStaticProps } from "next"
import { stripe } from "~/lib/stripe";

import { ImageContainer, ProductContainer, ProductDetails } from "~/styles/pages/product"
import type Stripe from "stripe";
import Image from "next/image";

interface ProductProps {
  product: {
    id: string;
    name: string;
    imageUrl:string;
    price: string;
    description: string;
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  return (
    <ProductContainer>
      <ImageContainer>
        <Image src={product.imageUrl} height={480} width={520} alt="product_image"/>
      </ImageContainer>

      <ProductDetails>
        <h1>{product.name}</h1>

        <span>{product.price}</span>

        <p>{product.description}</p>

        <button onClick={() => console.log(product.defaultPriceId)}>
          Buy now
        </button>
      </ProductDetails>
    </ProductContainer>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params?.id as string;

  const product = await stripe.products.retrieve(productId);
  const price = await stripe.prices.retrieve(product.default_price as string);

  const unitAmount = (price.unit_amount as number) / 100;

  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(unitAmount);

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: formattedValue,
        description: product.description,
        defaultPriceId: price.id,
      },
    },
    revalidate: 60 * 60 * 1, // 1 hour
  };
};