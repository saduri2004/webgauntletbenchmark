import React from 'react';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    promotionalDiscount?: string;
    image: string;
    additionalImages?: string[];
  };
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="product-details">
      <div className="product-image-gallery">
        <img src={product.image} alt={product.name} className="main-image" />
        {product.additionalImages && product.additionalImages.map((img, index) => (
          <img 
            key={index} 
            src={img} 
            alt={`${product.name} additional view ${index + 1}`} 
            className="additional-image" 
          />
        ))}
      </div>
      
      <div className="product-info">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        
        {product.promotionalDiscount && (
          <div className="promotional-discount-details">
            <span className="discount-badge">
              Discount: {product.promotionalDiscount}
            </span>
          </div>
        )}
        
        <div className="product-pricing">
          {product.originalPrice && product.originalPrice !== product.price ? (
            <>
              <span className="original-price">${product.originalPrice.toFixed(2)}</span>
              <span className="discounted-price">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="price">${product.price.toFixed(2)}</span>
          )}
        </div>
        
        <button className="add-to-cart">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetails;
