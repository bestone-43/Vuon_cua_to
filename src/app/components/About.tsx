import React from 'react';

export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-medium text-stone-900 tracking-tight mb-6">Câu chuyện của chúng tôi</h1>
        <p className="text-lg text-stone-600 leading-relaxed mb-8">
          Chào mừng đến với Vườn Của Tớ. Chúng tôi là một nhóm những người đam mê cây cỏ, tận tâm mang vẻ đẹp và sự bình yên của thiên nhiên vào ngôi nhà và không gian làm việc của bạn. Hành trình của chúng tôi bắt đầu từ một niềm tin đơn giản: ai cũng xứng đáng có một chút mảng xanh trong cuộc sống.
        </p>
        <div className="aspect-video bg-[#EAE4D9] rounded-2xl overflow-hidden mb-12">
           <img 
              src="https://images.unsplash.com/photo-1581572145515-5c6c361286ca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRvb3IlMjBwbGFudCUyMGRlY29yfGVufDF8fHx8MTc3Nzk5OTkyN3ww&ixlib=rb-4.1.0&q=80&w=1080" 
              alt="Plant shop interior" 
              className="w-full h-full object-cover opacity-90"
            />
        </div>
        <h2 className="text-2xl font-medium text-stone-900 mb-4">Chất lượng & Chăm sóc</h2>
        <p className="text-stone-600 leading-relaxed mb-8">
          Mỗi loại cây trong bộ sưu tập của chúng tôi đều được tuyển chọn và nuôi dưỡng kỹ lưỡng trong nhà kính. Chúng tôi đảm bảo rằng người bạn đồng hành xanh mới của bạn sẽ đến tay bạn một cách khỏe mạnh, cứng cáp và sẵn sàng phát triển trong môi trường mới. Chúng tôi cũng cung cấp hướng dẫn chăm sóc toàn diện để giúp bạn chăm cây tốt nhất có thể.
        </p>
      </div>
    </div>
  );
}