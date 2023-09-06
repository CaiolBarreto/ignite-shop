import { styled } from "@stitches/react";

export const Container = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  margin: '0 auto',
  height: 656,

  h1: {
    fontSize: '$2xl',
    color: '$gray100'
  },

  span: {
    fontWeight: 'bold',
  },

  p: {
    marginBottom: 88,
    fontSize: '$xl',
    color: '$gray100',
    maxWidth: 560,
    textAlign: 'center',
    marginTop: '2rem',
    lineHeight: 1.4
  },

  a: {
    display: 'block',
    marginTop: '5rem',
    fontSize: '$lg',
    color: '$green500',
    textDecoration: 'none',
    fontWeight: 'bold',

    '&:hover': {
      color: '$green300'
    }
  },
})

export const ImageContainer = styled('div', {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',

  padding: '0.25rem',

  marginTop: '4rem',
  width: 127,
  height: 145,
  borderRadius: 8,

  background: 'linear-gradient(100deg, #1ea483 0%, #7465d4 100%)',

  img: {
    objectFit: 'cover'
  }
})