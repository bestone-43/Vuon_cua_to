import React, { useState } from 'react';
import { Outlet, NavLink, Link, useLocation } from 'react-router';
import { Search, ShoppingBag, User, Menu, Home, Grid, MessageCircle, Phone, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import logoImage from '../../imports/lgo-removebg-preview.png';

export function Layout() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isFabOpen, setIsFabOpen] = useState(false);

  // Close mobile menu on navigation
  React.useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen bg-[#F5F2ED] flex flex-col font-sans">
      {/* Top Header */}
      <header className="bg-white sticky top-0 z-40 border-b border-[#EAE4D9] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <img src={logoImage} alt="Vườn Của Tớ Logo" className="h-14 sm:h-16 w-auto object-contain transition-transform hover:scale-105" />
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 items-center">
              <NavLink to="/" className={({isActive}) => `text-[15px] font-medium transition-colors hover:text-green-700 ${isActive ? 'text-green-700' : 'text-stone-600'}`}>Trang chủ</NavLink>
              <NavLink to="/products" className={({isActive}) => `text-[15px] font-medium transition-colors hover:text-green-700 ${isActive ? 'text-green-700' : 'text-stone-600'}`}>Cửa hàng</NavLink>
              <NavLink to="/about" className={({isActive}) => `text-[15px] font-medium transition-colors hover:text-green-700 ${isActive ? 'text-green-700' : 'text-stone-600'}`}>Về chúng tôi</NavLink>
            </nav>

            {/* Search Bar - Hidden on small screens */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-stone-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-[#EAE4D9] rounded-full leading-5 bg-[#F5F2ED] placeholder-stone-500 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm transition-colors"
                  placeholder="Tìm kiếm cây, chậu..."
                />
              </div>
            </div>

            {/* Icons */}
            <div className="flex items-center gap-4">
              <button className="md:hidden text-stone-600 hover:text-green-700 p-1">
                <Search className="h-5 w-5" />
              </button>
              <Link to="/checkout" className="text-stone-600 hover:text-green-700 p-1 relative">
                <ShoppingBag className="h-5 w-5" />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-600 ring-2 ring-white" />
              </Link>
              <button className="hidden md:block text-stone-600 hover:text-green-700 p-1">
                <User className="h-5 w-5" />
              </button>
              {/* Mobile menu button */}
              <button 
                className="md:hidden text-stone-600 hover:text-green-700 p-1"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Search Bar - Conditional */}
        {isMobileMenuOpen && (
          <div className="md:hidden px-4 pb-4 bg-white border-t border-[#EAE4D9] pt-4">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-stone-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-[#EAE4D9] rounded-full leading-5 bg-[#F5F2ED] placeholder-stone-500 focus:outline-none focus:bg-white focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:text-sm"
                placeholder="Search plants..."
              />
            </div>
            <nav className="mt-4 flex flex-col space-y-2">
              <NavLink to="/" className="px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-green-700 hover:bg-[#F5F2ED]">Trang chủ</NavLink>
              <NavLink to="/products" className="px-3 py-2 rounded-md text-base font-medium text-stone-700 hover:text-green-700 hover:bg-[#F5F2ED]">Cửa hàng</NavLink>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-[#EAE4D9] pt-8 pb-20 md:pb-8 mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-1">
              <div className="flex items-center mb-4">
                <img src={logoImage} alt="Vườn Của Tớ Logo" className="h-16 sm:h-20 w-auto object-contain" />
              </div>
              <p className="text-stone-500 text-sm">
                Mang thiên nhiên vào không gian của bạn, qua từng chiếc lá.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Cửa hàng</h3>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><Link to="/products" className="hover:text-green-700">Tất cả cây</Link></li>
                <li><a href="#" className="hover:text-green-700">Sản phẩm mới</a></li>
                <li><a href="#" className="hover:text-green-700">Phụ kiện</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-stone-500">
                <li><a href="#" className="hover:text-green-700">Chăm sóc cây</a></li>
                <li><a href="#" className="hover:text-green-700">Chính sách giao hàng</a></li>
                <li><a href="#" className="hover:text-green-700">Đổi trả</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-stone-900 mb-4">Nhận thông báo mới</h3>
              <form className="mt-2 flex sm:max-w-md">
                <input
                  type="email"
                  required
                  className="appearance-none min-w-0 w-full bg-[#F5F2ED] border border-[#EAE4D9] rounded-l-md py-2 px-4 text-base text-stone-900 placeholder-stone-500 focus:outline-none focus:ring-1 focus:ring-green-500 focus:border-green-500"
                  placeholder="Nhập email của bạn"
                />
                <button
                  type="submit"
                  className="flex-shrink-0 bg-green-700 border border-transparent rounded-r-md py-2 px-4 flex items-center justify-center text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Đăng ký
                </button>
              </form>
            </div>
          </div>
          <div className="mt-8 border-t border-[#EAE4D9] pt-8 flex justify-between items-center">
            <p className="text-sm text-stone-400">&copy; 2026 Vườn Của Tớ. Đã đăng ký bản quyền.</p>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#EAE4D9] z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <NavLink to="/" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-green-700' : 'text-stone-400 hover:text-green-700'}`}>
          <Home className="w-5 h-5" />
          <span className="text-[10px] font-medium">Trang chủ</span>
        </NavLink>
        <NavLink to="/products" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-green-700' : 'text-stone-400 hover:text-green-700'}`}>
          <Grid className="w-5 h-5" />
          <span className="text-[10px] font-medium">Danh mục</span>
        </NavLink>
        <NavLink to="/checkout" className={({isActive}) => `flex flex-col items-center gap-1 ${isActive ? 'text-green-700' : 'text-stone-400 hover:text-green-700'} relative`}>
          <ShoppingBag className="w-5 h-5" />
          <span className="absolute top-0 right-1 block h-1.5 w-1.5 rounded-full bg-green-600" />
          <span className="text-[10px] font-medium">Giỏ hàng</span>
        </NavLink>
        <button className="flex flex-col items-center gap-1 text-stone-400 hover:text-green-700">
          <User className="w-5 h-5" />
          <span className="text-[10px] font-medium">Tài khoản</span>
        </button>
      </div>

      {/* Floating Action Button (FAB) Group */}
      <div className="fixed bottom-20 md:bottom-8 right-4 md:right-8 z-50 flex flex-col items-end gap-3">
        {isFabOpen && (
          <div className="flex flex-col gap-3 items-center mb-2 animate-in slide-in-from-bottom-4 fade-in duration-200">
            {/* Zalo Icon placeholder (using MessageCircle as fallback) */}
            <button className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-600 transition-transform hover:scale-110" aria-label="Zalo">
              <span className="font-bold text-sm">Zalo</span>
            </button>
            {/* Facebook Messenger */}
            <button className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 transition-transform hover:scale-110" aria-label="Messenger">
              <MessageCircle className="w-6 h-6" />
            </button>
            {/* Phone */}
            <button className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-green-700 transition-transform hover:scale-110" aria-label="Gọi điện">
              <Phone className="w-5 h-5" />
            </button>
          </div>
        )}
        <button 
          onClick={() => setIsFabOpen(!isFabOpen)}
          className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${isFabOpen ? 'bg-stone-800 text-white hover:bg-stone-900' : 'bg-green-700 text-white hover:bg-green-800'}`}
          aria-label="Liên hệ"
        >
          {isFabOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}