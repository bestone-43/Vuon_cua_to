import React, { useState } from 'react';
import { useParams, Link } from 'react-router';
// Xóa import PRODUCTS tĩnh
import { useProducts } from '../useProducts'; // Thêm dòng này
import { ArrowLeft, Minus, Plus, Droplets, Sun, Thermometer, ShoppingBag, Heart } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts(); // Lấy dữ liệu từ hook
  const [quantity, setQuantity] = useState(1);

  if (loading) {
    return <div className="py-20 text-center text-stone-500">Đang tìm cây...</div>;
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-medium text-stone-900 mb-4">Không tìm thấy cây</h2>
        <Link to="/products" className="text-green-700 hover:underline">Quay lại cửa hàng</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-green-700 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Trở lại cửa hàng
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Image Gallery */}
        <div className="space-y-4">
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5F2ED]">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 ${i === 1 ? 'border-green-700' : 'border-transparent'}`}>
                <img 
                  src={product.image} 
                  alt={`${product.name} view ${i}`} 
                  className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-green-700 tracking-wide uppercase">{product.category}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-4">
            {product.name}
          </h1>
          <p className="text-2xl text-stone-900 font-medium mb-6">
            ${product.price.toFixed(2)}
          </p>
          <p className="text-base text-stone-600 mb-8 leading-relaxed">
            {product.description || "Một cái cây tuyệt đẹp để mang lại sức sống và sự tươi mới cho không gian của bạn. Được chăm sóc cẩn thận và giao tận cửa nhà bạn."}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-stone-900 mb-3">Kích thước</h3>
            <div className="flex gap-3">
              {['Nhỏ', 'Vừa', 'Lớn'].map((size) => (
                <button 
                  key={size}
                  className={`px-6 py-2.5 rounded-full border text-sm font-medium transition-colors ${product.size === size ? 'border-green-700 bg-green-50 text-green-800' : 'border-[#EAE4D9] text-stone-600 hover:border-stone-400'}`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-[#EAE4D9] rounded-full h-14 bg-white">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-12 flex items-center justify-center text-stone-500 hover:text-stone-900"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center font-medium text-stone-900">{quantity}</span>
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-12 flex items-center justify-center text-stone-500 hover:text-stone-900"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button className="flex-1 bg-green-700 text-white h-14 rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-colors shadow-sm">
              <ShoppingBag className="w-5 h-5" />
              Thêm vào giỏ
            </button>
            <button className="w-14 h-14 rounded-full border border-[#EAE4D9] bg-white flex items-center justify-center text-stone-400 hover:text-rose-500 hover:border-rose-200 transition-colors flex-shrink-0">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Plant Care Instructions */}
          <div className="border-t border-[#EAE4D9] pt-8 mt-auto">
            <h3 className="text-lg font-medium text-stone-900 mb-6">Hướng dẫn chăm sóc cây</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Tưới nước</h4>
                  <p className="text-sm text-stone-500 mt-1">Tưới nước 1-2 tuần một lần, để đất khô một nửa giữa các lần tưới.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0">
                  <Sun className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Ánh sáng</h4>
                  <p className="text-sm text-stone-500 mt-1">Ưa ánh sáng sáng, gián tiếp. Tránh ánh nắng mặt trời trực tiếp có thể làm cháy lá.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0">
                  <Thermometer className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Nhiệt độ</h4>
                  <p className="text-sm text-stone-500 mt-1">Nhiệt độ trung bình trong nhà từ 18°C-24°C. Tránh gió lùa.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}