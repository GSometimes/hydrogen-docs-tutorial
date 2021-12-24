// import Header1 from '../Header/Header1/Header1'
// import Header2 from '../Header/Header2/Header2'
// import Header3 from '../Header/Header3/Header3'

// export default function MainLayout(props){
//   return(<div className="fixed-nav transparent-nav">
//     <Header3 />
//     <main >{props.children}</main>
//     <footer>This is the Footer</footer>
//   </div>)
// }

import {
  Image,
  useShopQuery,
  flattenConnection,
  LocalizationProvider,
} from '@shopify/hydrogen';
import gql from 'graphql-tag';

import Header from '../../src/components/Header.client';
import Footer from '../../src/components/Footer.server';
import {useCartUI} from '../../src/components/CartUIProvider.client';
import Cart from '../../src/components/Cart.client';
// import Collection1 from '../../components/Collections/Collection1/Collection1';

export default function Layout({children, hero}) {
  const {data} = useShopQuery({
    query: QUERY,
    variables: {
      numCollections: 3,
    },
    cache: {
      maxAge: 60,
      staleWhileRevalidate: 60 * 10,
    },
  });
  const {isCartOpen, closeCart} = useCartUI();
  const collections = data ? flattenConnection(data.collections) : null;
  const products = data ? flattenConnection(data.products) : null;
  const storeName = data ? data.shop.name : '';

  return (
    <LocalizationProvider>
      <div className="fixed-nav transparent-nav">
        <div className="min-h-screen max-w-screen text-gray-700 font-sans">
          <Header collections={collections} storeName={storeName} />
          <div>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */}
            <div
              className={`z-50 fixed top-0 bottom-0 left-0 right-0 bg-black transition-opacity duration-400 ${
                isCartOpen ? 'opacity-20' : 'opacity-0 pointer-events-none'
              }`}
              onClick={isCartOpen ? closeCart : null}
            />
            <Cart />
          </div>
          <main>
            {hero}
            <div className="mx-auto max-w-7xl p-4 md:py-5 md:px-8">
              {children}
            </div>
          </main>
          {/* <Collection1 /> */}
          <Footer collection={collections[0]} product={products[0]} />
        </div>
      </div>
    </LocalizationProvider>
  );
}

const QUERY = gql`
  query indexContent($numCollections: Int!) {
    shop {
      name
    }
    collections(first: $numCollections) {
      edges {
        node {
          description
          handle
          id
          title
          image {
            ...ImageFragment
          }
        }
      }
    }
    products(first: 1) {
      edges {
        node {
          handle
        }
      }
    }
  }
  ${Image.Fragment}
`;
