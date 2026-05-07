import React, { useState } from 'react';
import { CATEGORIES } from '../data'; // Đã xóa PRODUCTS tĩnh
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, X } from 'lucide-react';
import { useProducts } from '../useProducts'; // Thêm dòng này

export function Products() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("Tất cả");
  
  // Dùng dữ liệu từ Google Sheets thay cho file tĩnh
  const { products: fetchedProducts, loading } = useProducts();

  const filteredProducts = activeCategory === "Tất cả" 
    ? fetchedProducts 
    : fetchedProducts.filter(p => p.category === activeCategory);

  if (loading) {
    return <div className="py-20 text-center text-stone-500">Đang tải vườn cây...</div>;
  }
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-medium text-stone-900 tracking-tight">Tất cả cây</h1>
        <button 
          onClick={() => setIsFilterOpen(true)}
          className="md:hidden flex items-center gap-2 text-stone-700 bg-white px-4 py-2 rounded-full border border-[#EAE4D9] text-sm font-medium shadow-sm"
        >
          <SlidersHorizontal className="w-4 h-4" />
          Lọc
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        
        {/* Desktop Sidebar Filter */}
        <aside className="hidden md:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-8">
            <div>
              <h3 className="font-medium text-stone-900 mb-4">Danh mục</h3>
              <ul className="space-y-3">
                {CATEGORIES.map(cat => (
                  <li key={cat}>
                    <button 
                      onClick={() => setActiveCategory(cat)}
                      className={`text-sm w-full text-left transition-colors ${activeCategory === cat ? 'text-green-700 font-medium' : 'text-stone-500 hover:text-stone-900'}`}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-medium text-stone-900 mb-4">Kích thước</h3>
              <div className="space-y-2">
                {['Nhỏ', 'Vừa', 'Lớn'].map(size => (
                  <label key={size} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-[#EAE4D9] text-green-700 focus:ring-green-700 w-4 h-4" />
                    <span className="text-sm text-stone-600">{size}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-stone-900 mb-4">Mức giá</h3>
              <div className="space-y-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="border-[#EAE4D9] text-green-700 focus:ring-green-700 w-4 h-4" />
                  <span className="text-sm text-stone-600">Dưới $20</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="border-[#EAE4D9] text-green-700 focus:ring-green-700 w-4 h-4" />
                  <span className="text-sm text-stone-600">$20 - $40</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="price" className="border-[#EAE4D9] text-green-700 focus:ring-green-700 w-4 h-4" />
                  <span className="text-sm text-stone-600">Trên $40</span>
                </label>
              </div>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {filteredProducts.length === 0 && (
            <div className="text-center py-20">
              <p className="text-stone-500">Không tìm thấy sản phẩm trong danh mục này.</p>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filter Bottom Sheet */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 flex items-end md:hidden">
          <div className="fixed inset-0 bg-stone-900/40 backdrop-blur-sm" onClick={() => setIsFilterOpen(false)} />
          <div className="relative w-full bg-white rounded-t-2xl shadow-xl p-6 h-[80vh] overflow-y-auto animate-in slide-in-from-bottom flex flex-col">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-medium text-stone-900">Bộ lọc</h2>
              <button onClick={() => setIsFilterOpen(false)} className="p-2 -mr-2 text-stone-500 hover:text-stone-900">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-8 flex-1">
              <div>
                <h3 className="font-medium text-stone-900 mb-4">Danh mục</h3>
                <div className="flex flex-wrap gap-2">
                  {CATEGORIES.map(cat => (
                    <button 
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border ${activeCategory === cat ? 'bg-green-700 text-white border-green-700' : 'bg-white text-stone-600 border-[#EAE4D9]'}`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-medium text-stone-900 mb-4">Kích thước</h3>
                <div className="space-y-3">
                  {['Nhỏ', 'Vừa', 'Lớn'].map(size => (
                    <label key={size} className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" className="rounded border-[#EAE4D9] text-green-700 focus:ring-green-700 w-5 h-5" />
                      <span className="text-base text-stone-600">{size}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#EAE4D9]">
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="w-full bg-green-700 text-white py-4 rounded-xl font-medium text-lg hover:bg-green-800 transition-colors"
              >
                Áp dụng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}