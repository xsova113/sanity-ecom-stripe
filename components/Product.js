

import Link from 'next/link'
import React from 'react'
import { urlFor } from '../lib/client'
import Image from 'next/image';

const Product = ({
  product
}) => {
  const {slug, image, name, price} = product;
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <Image
            src={urlFor(image && image[0]).url()}
            alt='product image'
            width={250}
            height={250}
            className='product-image'
          />

          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  )
}

export default Product