import { useState, useEffect } from 'react';
import Papa from 'papaparse';

// DÁN LINK CSV TỪ GOOGLE SHEETS VÀO ĐÂY
const CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbDKotbOYtFOZWukHJhz-zebZgAhorZWJqnH21bM2DK04PQkDybHuoQHts_a-1gpLzm6_Iw650Bumy/pub?gid=0&single=true&output=csv";

export function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(CSV_URL, {
      download: true,
      header: true,
      complete: (results) => {
        const formattedData = results.data
          .filter((item: any) => item.id) // Bỏ qua các dòng trống
          .map((item: any) => ({
            ...item,
            price: Number(item.price) || 0 // Đảm bảo giá luôn là dạng số
          }));
        setProducts(formattedData);
        setLoading(false);
      }
    });
  }, []);

  return { products, loading };
}