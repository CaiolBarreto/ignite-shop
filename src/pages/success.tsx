import { GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "~/lib/stripe";
import { Container, ImageContainer } from "~/styles/pages/success";

interface SuccessProps {
  customerName: string;
  product: {
    name: string;
    imageUrl: string
  }
}

export default function Success({ customerName, product }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Purchase made</title>

        <meta name="robots" content="noindex" />
      </Head>

      <Container>
        <h1>Purchase made</h1>
        <ImageContainer>
          <Image
            src={product.imageUrl}
            alt="jersey_photo"
            width={120}
            height={120}
          />
        </ImageContainer>
        <p>Yeah <span>{customerName}</span>, your <span>{product.name}</span> is already on the way</p>
        <Link href="/">Return to catalog</Link>
      </Container>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }

  const sessionId = String(query.session_id)

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details?.name
  const product = session.line_items?.data[0]?.price?.product as Stripe.Product

  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}