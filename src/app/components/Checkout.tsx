import React, { useState } from 'react';
import { useProducts } from '../useProducts'; // 1. Chuyển sang dùng hook lấy data từ Sheets
import { ShieldCheck, CreditCard, Truck, ChevronRight } from 'lucide-react';
import { Link } from 'react-router';

export function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const { products, loading } = useProducts(); // 2. Gọi dữ liệu từ Sheets
  
  // Hiển thị trạng thái đang tải
  if (loading) {
    return (
      <div className="py-32 text-center text-stone-500 flex flex-col items-center gap-4">
        <div className="w-8 h-8 border-4 border-green-700 border-t-transparent rounded-full animate-spin"></div>
        <p className="font-medium">Đang chuẩn bị đơn hàng...</p>
      </div>
    );
  }

  // 3. Tạo giỏ hàng mẫu từ dữ liệu thật trong Sheets
  // Lấy tạm 2 sản phẩm đầu tiên từ Sheets để demo trang Checkout
  const cartItems = products.length >= 2 ? [
    { ...products[0], quantity: 1 },
    { ...products[1], quantity: 2 }
  ] : products.map(p => ({ ...p, quantity: 1 }));

  const subtotal = cartItems.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const shipping = 30000; // Phí ship 30k
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-medium text-stone-900 tracking-tight">Thanh toán</h1>
        <div className="flex items-center gap-2 text-sm text-stone-500 mt-2">
          <Link to="/products" className="hover:text-green-700">Giỏ hàng</Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-stone-900 font-medium">Thanh toán</span>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        
        {/* Cột trái - Form thông tin khách hàng */}
        <div className="flex-1 space-y-10">
          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-4">Thông tin liên hệ</h2>
            <div className="grid gap-4">
              <input type="email" placeholder="Địa chỉ email" className="w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-[#EAE4D9] text-green-700 w-4 h-4" />
                <span className="text-sm text-stone-600">Gửi cho tôi tin tức và ưu đãi qua email</span>
              </label>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-4">Địa chỉ giao hàng</h2>
            <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="Tên" className="w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <input type="text" placeholder="Họ" className="w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <input type="text" placeholder="Địa chỉ" className="col-span-2 w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <input type="text" placeholder="Thành phố" className="w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              <div className="grid grid-cols-2 gap-4">
                <select className="w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all text-stone-700">
                  <option>Tỉnh/Thành</option>
                  <option>Hà Nội</option>
                  <option>TP. HCM</option>
                  <option>Đắk Lắk</option>
                </select>
                <input type="text" placeholder="Mã bưu điện" className="w-full p-3 rounded-xl border border-[#EAE4D9] bg-white focus:outline-none focus:ring-2 focus:ring-green-500 transition-all" />
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-medium text-stone-900 mb-4">Thanh toán</h2>
            <p className="text-sm text-stone-500 mb-4 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4 text-green-600" />
              Tất cả các giao dịch đều được bảo mật và mã hóa.
            </p>
            <div className="space-y-3 bg-white p-4 rounded-2xl border border-[#EAE4D9]">
              <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border ${paymentMethod === 'card' ? 'border-green-600 bg-green-50/50' : 'border-transparent'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="text-green-700 w-4 h-4" />
                  <span className="font-medium text-stone-900">Thẻ tín dụng</span>
                </div>
                <CreditCard className="w-5 h-5 text-stone-400" />
              </label>
              <div className="h-px bg-[#EAE4D9] my-2" />
              <label className={`flex items-center justify-between p-3 rounded-xl cursor-pointer border ${paymentMethod === 'cod' ? 'border-green-600 bg-green-50/50' : 'border-transparent'}`}>
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} className="text-green-700 w-4 h-4" />
                  <span className="font-medium text-stone-900">Thanh toán khi nhận hàng (COD)</span>
                </div>
              </label>
            </div>
          </section>

          <button className="w-full bg-green-700 text-white py-4 rounded-xl font-medium text-lg hover:bg-green-800 transition-all shadow-md active:scale-[0.98]">
            Thanh toán {total.toLocaleString('vi-VN')}đ
          </button>
        </div>

        {/* Cột phải - Tóm tắt đơn hàng lấy từ data thực */}
        <div className="lg:w-[400px] flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 border border-[#EAE4D9] sticky top-24 shadow-sm">
            <h2 className="text-xl font-medium text-stone-900 mb-6">Tóm tắt đơn hàng</h2>
            <div className="space-y-4 mb-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex gap-4">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-[#F5F2ED] flex-shrink-0 border border-[#EAE4D9]">
                    <img src={item.image.split(',')[0]} alt={item.name} className="w-full h-full object-cover" />
                    <span className="absolute -top-2 -right-2 bg-stone-500 text-white w-5 h-5 rounded-full flex items-center justify-center text-xs">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-stone-900 text-sm">{item.name}</h4>
                    <p className="text-stone-500 text-xs mt-1">{item.size || 'Vừa'}</p>
                  </div>
                  <p className="font-medium text-stone-900 text-sm">
                    {(Number(item.price) * item.quantity).toLocaleString('vi-VN')}đ
                  </p>
                </div>
              ))}
            </div>

            <div className="border-t border-[#EAE4D9] pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Tạm tính</span>
                <span className="font-medium text-stone-900">{subtotal.toLocaleString('vi-VN')}đ</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-500">Phí giao hàng</span>
                <span className="font-medium text-stone-900">{shipping.toLocaleString('vi-VN')}đ</span>
              </div>
            </div>

            <div className="border-t border-[#EAE4D9] pt-4 mt-4">
              <div className="flex justify-between items-end">
                <span className="text-base font-medium text-stone-900">Tổng cộng</span>
                <span className="text-2xl font-medium text-stone-900">
                  {total.toLocaleString('vi-VN')}đ
                </span>
              </div>
            </div>

            <div className="mt-8 bg-stone-50 p-4 rounded-xl flex items-start gap-3">
              <Truck className="w-5 h-5 text-stone-400 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-stone-500 leading-relaxed">
                Miễn phí giao hàng cho đơn từ 500.000đ. Cây của bạn sẽ được đóng gói cẩn thận để đảm bảo sự tươi đẹp khi đến nơi.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}