import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import { useProducts } from '../useProducts'; 
import { ArrowLeft, Minus, Plus, Droplets, Sun, Thermometer, ShoppingBag, Heart } from 'lucide-react';

export function ProductDetail() {
  const { id } = useParams();
  const { products, loading } = useProducts(); 
  const [quantity, setQuantity] = useState(1);
  
  // State để theo dõi tấm ảnh nào đang được chọn hiển thị chính
  const [activeIndex, setActiveIndex] = useState(0);

  if (loading) {
    return (
      <div className="py-32 text-center text-stone-500 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium">Đang tìm cây cho bạn...</p>
      </div>
    );
  }

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <h2 className="text-2xl font-medium text-stone-900 mb-4">Không tìm thấy cây</h2>
        <Link to="/products" className="text-green-700 hover:underline inline-flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" /> Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  // LOGIC XỬ LÝ NHIỀU ẢNH: 
  // Chẻ chuỗi "link1, link2" thành mảng ['link1', 'link2'] và xóa khoảng trắng dư thừa
  const imageUrls = product.image ? product.image.split(',').map((url: string) => url.trim()) : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <Link to="/products" className="inline-flex items-center gap-2 text-sm text-stone-500 hover:text-green-700 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Trở lại cửa hàng
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16">
        
        {/* Image Gallery */}
        <div className="space-y-4">
          {/* Ảnh chính lớn nhất */}
          <div className="aspect-square rounded-2xl overflow-hidden bg-[#F5F2ED] border border-[#EAE4D9] shadow-sm">
            <img 
              src={imageUrls[activeIndex] || product.image} 
              alt={product.name} 
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          
          {/* Danh sách ảnh nhỏ (Thumbnails) */}
          <div className="grid grid-cols-4 gap-4">
            {imageUrls.map((url, i) => (
              <button 
                key={i} 
                onClick={() => setActiveIndex(i)}
                className={`aspect-square rounded-xl overflow-hidden cursor-pointer border-2 transition-all ${
                  i === activeIndex ? 'border-green-700 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img 
                  src={url} 
                  alt={`${product.name} view ${i + 1}`} 
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="mb-2">
            <span className="text-sm font-medium text-green-700 tracking-wide uppercase px-3 py-1 bg-green-50 rounded-md border border-green-100">
              {product.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium text-stone-900 tracking-tight mb-4">
            {product.name}
          </h1>
          
          <p className="text-2xl text-stone-900 font-semibold mb-6">
            {Number(product.price).toLocaleString('vi-VN')}đ
          </p>

          <p className="text-base text-stone-600 mb-8 leading-relaxed">
            {product.description || "Một cái cây tuyệt đẹp để mang lại sức sống và sự tươi mới cho không gian của bạn."}
          </p>

          <div className="mb-8">
            <h3 className="text-sm font-medium text-stone-900 mb-3">Kích thước sản phẩm</h3>
            <div className="flex gap-3">
              <span className="px-6 py-2.5 rounded-full border border-green-700 bg-green-50 text-green-800 shadow-sm text-sm font-medium">
                {product.size || 'Vừa'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-10">
            <div className="flex items-center border border-[#EAE4D9] rounded-full h-14 bg-white shadow-sm">
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
            <button className="flex-1 bg-green-700 text-white h-14 rounded-full font-medium text-lg flex items-center justify-center gap-2 hover:bg-green-800 transition-all shadow-md active:scale-95">
              <ShoppingBag className="w-5 h-5" />
              Thêm vào giỏ
            </button>
            <button className="w-14 h-14 rounded-full border border-[#EAE4D9] bg-white flex items-center justify-center text-stone-400 hover:text-rose-500 transition-colors">
              <Heart className="w-6 h-6" />
            </button>
          </div>

          {/* Plant Care Instructions */}
          <div className="border-t border-[#EAE4D9] pt-8 mt-auto">
            <h3 className="text-lg font-medium text-stone-900 mb-6">Hướng dẫn chăm sóc cây</h3>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Droplets className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Tưới nước</h4>
                  <p className="text-sm text-stone-500 mt-1">{product.water || "Tưới nước 1-2 tuần một lần."}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Sun className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Ánh sáng</h4>
                  <p className="text-sm text-stone-500 mt-1">{product.sun || "Ưa ánh sáng gián tiếp."}</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0 shadow-inner">
                  <Thermometer className="w-5 h-5 text-red-500" />
                </div>
                <div>
                  <h4 className="font-medium text-stone-900">Nhiệt độ</h4>
                  <p className="text-sm text-stone-500 mt-1">{product.temp || "Nhiệt độ lý tưởng từ 18°C-24°C."}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}