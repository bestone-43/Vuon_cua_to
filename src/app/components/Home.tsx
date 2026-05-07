import React from 'react';
import { CATEGORIES, PRODUCTS } from '../data';
import { ProductCard } from './ProductCard';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';

export function Home() {
  const newArrivals = PRODUCTS.filter(p => p.category === 'Sản phẩm mới' || p.category === 'Cây treo').slice(0, 4);
  const succulents = PRODUCTS.filter(p => p.category === 'Sen đá' || p.category === 'Xương rồng').slice(0, 4);
  const deskPlants = PRODUCTS.filter(p => p.category === 'Cây để bàn').slice(0, 4);

  return (
    <div className="w-full">
      {/* Hero Section - Featured Banner Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:h-[440px] lg:h-[480px]">
          {/* Large Banner (Left) */}
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group min-h-[320px] md:min-h-0">
            <img 
              src="https://images.unsplash.com/photo-1585444094513-7c7eec93be68?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHN1Y2N1bGVudCUyMHZhcmlldHl8ZW58MXx8fHwxNzc4MTM1MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
              alt="Mang thiên nhiên vào không gian của bạn" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight mb-3 tracking-tight max-w-xl">
                Mang thiên nhiên vào không gian của bạn.
              </h1>
              <p className="text-white/90 text-sm md:text-base mb-5 max-w-md hidden sm:block">
                Bộ sưu tập các loại sen đá tuyệt đẹp, cây để bàn dễ chăm sóc và quà tặng từ thiên nhiên cho ngôi nhà của bạn.
              </p>
              <div>
                <Link to="/products" className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-800 transition-colors shadow-lg backdrop-blur-sm border border-white/20">
                  Khám phá ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Small Banners (Right) */}
          <div className="md:col-span-4 flex flex-col gap-3 md:gap-4">
            {/* Top Small Banner */}
            <div className="flex-1 relative rounded-2xl overflow-hidden group min-h-[180px] md:min-h-0">
              <img 
                src="https://images.unsplash.com/photo-1664438279397-4422f095d786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmcmVzaCUyMG1vbnN0ZXJhJTIwcGxhbnQlMjBpbmRvb3IlMjBicmlnaHR8ZW58MXx8fHwxNzc4MTM1MTE1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Sản phẩm bán chạy" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">Sản phẩm bán chạy</h3>
                <Link to="/products" className="text-white flex items-center gap-1 text-sm font-medium hover:underline w-fit">
                  Xem thêm <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Bottom Small Banner */}
            <div className="flex-1 relative rounded-2xl overflow-hidden group min-h-[180px] md:min-h-0">
              <img 
                src="https://images.unsplash.com/photo-1777590786052-f55169a21d97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxhdGhlYSUyMHBsYW50JTIwdmlicmFudCUyMGxlYXZlc3xlbnwxfHx8fDE3NzgxMzUxMTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral" 
                alt="Combo quà tặng" 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">Combo quà tặng</h3>
                <Link to="/products" className="text-white flex items-center gap-1 text-sm font-medium hover:underline w-fit">
                  Xem thêm <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills (Horizontal Scroll) */}
      <section className="border-b border-[#EAE4D9] bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pt-4 pb-2 gap-3 items-center [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {CATEGORIES.map((cat, idx) => (
              <button 
                key={cat}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-green-700 text-white' : 'bg-[#F5F2ED] text-stone-700 hover:bg-[#EAE4D9]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          {/* Pagination Dots */}
          <div className="flex justify-center items-center gap-1.5 pb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#EAE4D9]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#EAE4D9]"></div>
          </div>
        </div>
      </section>

      {/* Product Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* New Arrivals */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Sản phẩm mới</h2>
              <p className="text-stone-500 mt-2">Những mẫu cây mới nhất trong bộ sưu tập.</p>
            </div>
            <Link to="/products" className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center gap-1 hidden sm:flex">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newArrivals.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Succulents & Cacti */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Sen đá & Xương rồng</h2>
              <p className="text-stone-500 mt-2">Dễ chăm sóc và chịu hạn tốt.</p>
            </div>
            <Link to="/products" className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center gap-1 hidden sm:flex">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {succulents.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Desk Plants */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Cây để bàn</h2>
              <p className="text-stone-500 mt-2">Những người bạn đồng hành hoàn hảo cho góc làm việc.</p>
            </div>
            <Link to="/products" className="text-green-700 hover:text-green-800 font-medium text-sm flex items-center gap-1 hidden sm:flex">
              Xem tất cả <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {deskPlants.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}