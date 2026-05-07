import { useState, useEffect } from 'react';
import Papa from 'papaparse';

// DÁN LINK CSV CỦA SHEET "BANNERS" VÀO ĐÂY
const BANNERS_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTbDKotbOYtFOZWukHJhz-zebZgAhorZWJqnH21bM2DK04PQkDybHuoQHts_a-1gpLzm6_Iw650Bumy/pub?gid=586782734&single=true&output=csv";

export function useBanners() {
  const [banners, setBanners] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(BANNERS_URL, {
      download: true,
      header: true,
      complete: (results) => {
        setBanners(results.data);
        setLoading(false);
      }
    });
  }, []);

  return { banners, loading };
}