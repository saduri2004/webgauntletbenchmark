import React from 'react';
import { applyPromotionalDiscounts } from '../utils/promotionalDiscounts';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    originalPrice?: number;
    promotionalDiscount?: string;
    image: string;
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="product-card">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      
      {product.promotionalDiscount && (
        <div className="promotional-discount">
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
    </div>
  );
};

export default ProductCard;
