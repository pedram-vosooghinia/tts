"use client";
import { useState, useEffect, useCallback } from "react";
import MainCard from "@/components/dashboard/product/main/showAll/MainCard";
import toast from "react-hot-toast";
import { getMainProductService } from "@/services/product/mainProduct";
import LoadingModal from "@/components/Main/LoadingModal";
// import SearchMain from "@/components/dashboard/product/main/showAll/SearchMain";
import { Button } from "@/components/ui/button";
export default function ShowMain() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<MainProduct[]>([]);
  const [offset, setOffset] = useState(0);
  const [searchedProduct, setSearchedProduct] = useState<MainProduct | null>(
    null
  );
  const limit = 20;
  const fetchProducts = useCallback(async (offset: number, limit: number) => {
    try {
      const productsData = await getMainProductService({ offset, limit });
      const data = productsData?.data?.data || [];
      return data;
    } catch {
      toast.error("لطفا دوباره رفرش کنید");
      return [];
    }
  }, []);

  useEffect(() => {
    const loadInitialProducts = async () => {
      const initialProducts = await fetchProducts(0, limit);
      setProducts(initialProducts);
      setLoading(false);
    };
    loadInitialProducts();
  }, [fetchProducts, limit]);

  const handleLoadMore = async () => {
    setLoading(true);
    const newOffset = offset + limit;
    const additionalProducts = await fetchProducts(newOffset, limit);
    setProducts((prevProducts) => [...prevProducts, ...additionalProducts]);
    setOffset(newOffset);
    setLoading(false);
  };

  // const handleSearch = (product: MainProduct | null) => {
  //   setSearchedProduct(product);
  // };
  const handleClearSearch = () => {
    setSearchedProduct(null);
  };
  const displayedProducts = searchedProduct ? [searchedProduct] : products;

  if (loading) {
    return <LoadingModal />;
  }
  return (
    <>
      {/* <SearchMain onSearch={handleSearch} /> */}
      {searchedProduct && (
        <div className="flex justify-center items-center m-4">
          <Button
            onClick={handleClearSearch}
            className="bg-red-500 hover:bg-red-700"
          >
            حذف جستجو
          </Button>
        </div>
      )}
      <div className="flex flex-col justify-center items-center">
        <div className="flex my-6 gap-4 flex-wrap justify-center items-start">
          {displayedProducts.map((product) => (
            <MainCard key={product.id} product={product} />
          ))}
        </div>
        {!searchedProduct && displayedProducts.length > 0 && (
          <div className="flex justify-center items-center m-4">
            <Button
              onClick={handleLoadMore}
              className="bg-pedram-2 hover:bg-pedram-1"
            >
              مشاهده بیشتر
            </Button>
          </div>
        )}
        {displayedProducts.length === 0 && (
          <div className="flex justify-center items-center mt-40">
            هیچ محصولی برای نمایش وجود ندارد
          </div>
        )}
      </div>
    </>
  );
}
