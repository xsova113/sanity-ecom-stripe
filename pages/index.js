import { Product, FooterBanner, HeroBanner } from '../components'
import { client } from '../lib/client';

const Home = ({ products, bannerData }) => {

  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />

      <div className='products-heading'>
        <h1>Best Selling Products</h1>
        <p>Speakers of many variations</p>
      </div>

      <div className='products-container'>
        {products?.map(product =>
          <Product key={product._id} product={product} />
        )}
      </div>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  )
};

export const getServerSideProps = async () => {
  const products = await client.fetch('*[_type == "product"]');
  const bannerData = await client.fetch('*[_type == "banner"]');

  return {
    props: { products, bannerData }
  };
};

export default Home