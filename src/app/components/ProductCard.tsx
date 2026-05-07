import React from 'react';
import { Link } from 'react-router';
import { Plus } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  size: string;
}

export function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group relative rounded-2xl bg-white p-3 sm:p-4 shadow-sm transition-all hover:shadow-md border border-[#EAE4D9]">
      <Link to={`/products/${product.id}`} className="block overflow-hidden rounded-xl bg-[#F5F2ED] aspect-square relative mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm text-xs font-medium px-2 py-1 rounded-md text-green-800">
          {product.category}
        </div>
      </Link>
      <div className="flex justify-between items-start gap-2">
        <div className="flex-1 min-w-0">
          <Link to={`/products/${product.id}`}>
            <h3 className="font-medium text-stone-800 truncate" title={product.name}>
              {product.name}
            </h3>
          </Link>
          <p className="text-sm text-stone-500 mt-1">${product.price.toFixed(2)}</p>
        </div>
        <button 
          className="flex-shrink-0 bg-green-700 text-white p-2 rounded-full hover:bg-green-800 transition-colors"
          aria-label="Thêm vào giỏ"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}