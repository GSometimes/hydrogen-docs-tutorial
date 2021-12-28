import {Link} from '@shopify/hydrogen';

export default function Collection1({popularProductsData}) {
  return (
    <div className="collection collection1">
      <div className="container">
        <div className="row">
          {popularProductsData.map((item) => (
            <div className="col-md-4">
              <div className="collection1__collection-item">
                <Link
                  to={`/products/${item.handle}`}
                  className={
                    'collection1__product-img collection1__product-img--rectangle'
                  }
                >
                  <div className="collection1__heart">
                    <i className="far fa-heart"></i>
                  </div>
                  <img src={item.featuredImage.url} alt={item.title} />
                </Link>
                <div className="collection1__product-info">
                  <div className="collection1__product-details">
                    <span className="collection1__product-title">
                      {item.title}
                    </span>
                    <span className="collection1__product-price">
                      ${item.variants.edges[0].node.price}
                    </span>
                  </div>
                  <div className="collection1__colors">
                    <div className="collection1__color collection1__color--blue"></div>
                    <div className="collection1__color collection1__color--black"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
