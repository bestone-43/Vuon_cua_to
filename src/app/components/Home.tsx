import React from 'react';
import { CATEGORIES } from '../data'; 
import { ProductCard } from './ProductCard';
import { Link } from 'react-router';
import { ArrowRight } from 'lucide-react';
import { useProducts } from '../useProducts'; 
import { useBanners } from '../useBanners';

export function Home() {
  // 1. Lấy dữ liệu sản phẩm và banner từ Google Sheets
  const { products: fetchedProducts, loading: productsLoading } = useProducts();
  const { banners, loading: bannersLoading } = useBanners();

  // 2. Trích xuất dữ liệu banner cụ thể dựa trên ID (đảm bảo khớp với ID trong Sheet Banners của bạn)
  const heroBanner = banners.find(b => b.id === 'hero');
  const bestSellerBanner = banners.find(b => b.id === 'best-seller');
  const comboBanner = banners.find(b => b.id === 'combo');

  // 3. Logic lọc sản phẩm cho từng khu vực
  const newArrivals = fetchedProducts
    .filter(p => p.category === 'Sản phẩm mới' || p.category === 'Cây treo')
    .slice(0, 4);
  const succulents = fetchedProducts
    .filter(p => p.category === 'Sen đá' || p.category === 'Xương rồng')
    .slice(0, 4);
  const deskPlants = fetchedProducts
    .filter(p => p.category === 'Cây để bàn')
    .slice(0, 4);

  // Hiển thị trạng thái đang tải nếu một trong hai nguồn dữ liệu chưa về
  if (productsLoading || bannersLoading) {
    return (
      <div className="py-32 text-center text-stone-500 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium">Đang khởi tạo vườn cây...</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Hero Section - Banner động từ Google Sheets */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 md:h-[440px] lg:h-[480px]">
          
          {/* Banner Lớn (Bên trái) */}
          <div className="md:col-span-8 relative rounded-2xl overflow-hidden group min-h-[320px] md:min-h-0">
            <img 
              src={heroBanner?.image || "https://images.unsplash.com/photo-1585444094513-7c7eec93be68?q=80&w=1080"} 
              alt={heroBanner?.title || "Mang thiên nhiên vào không gian của bạn"} 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
            
            <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white leading-tight mb-3 tracking-tight max-w-xl">
                {heroBanner?.title || "Mang thiên nhiên vào không gian của bạn."}
              </h1>
              <p className="text-white/90 text-sm md:text-base mb-5 max-w-md hidden sm:block">
                {heroBanner?.description || "Bộ sưu tập các loại sen đá tuyệt đẹp và quà tặng từ thiên nhiên cho ngôi nhà của bạn."}
              </p>
              <div>
                <Link to={heroBanner?.link || "/products"} className="inline-flex items-center gap-2 bg-green-700 text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-green-800 transition-colors shadow-lg border border-white/20">
                  Khám phá ngay
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* Hai Banner Nhỏ (Bên phải) */}
          <div className="md:col-span-4 flex flex-col gap-3 md:gap-4">
            {/* Banner nhỏ trên */}
            <div className="flex-1 relative rounded-2xl overflow-hidden group min-h-[180px] md:min-h-0">
              <img 
                src={bestSellerBanner?.image || "https://images.unsplash.com/photo-1664438279397-4422f095d786?q=80&w=1080"} 
                alt={bestSellerBanner?.title || "Sản phẩm bán chạy"} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">{bestSellerBanner?.title || "Sản phẩm bán chạy"}</h3>
                <Link to={bestSellerBanner?.link || "/products"} className="text-white flex items-center gap-1 text-sm font-medium hover:underline w-fit">
                  Xem thêm <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Banner nhỏ dưới */}
            <div className="flex-1 relative rounded-2xl overflow-hidden group min-h-[180px] md:min-h-0">
              <img 
                src={comboBanner?.image || "https://images.unsplash.com/photo-1777590786052-f55169a21d97?q=80&w=1080"} 
                alt={comboBanner?.title || "Combo quà tặng"} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute inset-0 p-5 flex flex-col justify-end">
                <h3 className="text-lg md:text-xl font-medium text-white mb-1.5">{comboBanner?.title || "Combo quà tặng"}</h3>
                <Link to={comboBanner?.link || "/products"} className="text-white flex items-center gap-1 text-sm font-medium hover:underline w-fit">
                  Xem thêm <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Pills (Giữ nguyên phần tĩnh này) */}
      <section className="border-b border-[#EAE4D9] bg-white sticky top-16 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex overflow-x-auto pt-4 pb-2 gap-3 items-center [&::-webkit-scrollbar]:hidden">
            {CATEGORIES.map((cat, idx) => (
              <button 
                key={cat}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${idx === 0 ? 'bg-green-700 text-white' : 'bg-[#F5F2ED] text-stone-700 hover:bg-[#EAE4D9]'}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex justify-center items-center gap-1.5 pb-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-700"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#EAE4D9]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#EAE4D9]"></div>
          </div>
        </div>
      </section>

      {/* Các khu vực sản phẩm chính lấy từ Sheets */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
        
        {/* Sản phẩm mới */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Sản phẩm mới</h2>
              <p className="text-stone-500 mt-2">Cập nhật trực tiếp từ kho hàng.</p>
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

        {/* Sen đá & Xương rồng */}
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

        {/* Cây để bàn */}
        <section>
          <div className="flex justify-between items-end mb-6">
            <div>
              <h2 className="text-2xl md:text-3xl font-medium text-stone-900 tracking-tight">Cây để bàn</h2>
              <p className="text-stone-500 mt-2">Người bạn đồng hành hoàn hảo cho góc làm việc.</p>
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