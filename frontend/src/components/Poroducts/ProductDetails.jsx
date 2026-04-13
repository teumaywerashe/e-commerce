import { useState, useEffect } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductDetails, fetchSimilarProducts } from "../../redux/slice/productSlice";
import { addToCart } from "../../redux/slice/CartSlice";

function ProductDetails({ error, loading, productId }) {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { user, guestId } = useSelector((s) => s.auth);
  const { selectedProduct, similarProducts } = useSelector((s) => s.products);
  const productFetchId = productId || id;

  const [mainImage, setMainImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  useEffect(() => {
    if (selectedProduct?.images?.length > 0) setMainImage(selectedProduct.images[0]);
  }, [selectedProduct]);

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select size and color");
      return;
    }
    setDisabled(true);
    dispatch(addToCart({ productId: productFetchId, quantity, size: selectedSize, color: selectedColor, guestId, userId: user?._id }))
      .then(() => toast.success("Added to bag"))
      .catch(() => toast.error("Failed"))
      .finally(() => setDisabled(false));
  };

  if (loading) return (
    <div className="max-w-screen-xl mx-auto px-6 py-16 animate-pulse flex flex-col md:flex-row gap-12">
      <div className="md:w-1/2 bg-neutral-100 aspect-[3/4]" />
      <div className="md:w-1/2 space-y-4">
        <div className="bg-neutral-100 h-4 w-1/3" />
        <div className="bg-neutral-100 h-8 w-2/3" />
        <div className="bg-neutral-100 h-20 w-full" />
      </div>
    </div>
  );

  if (error) return <p className="text-center text-neutral-400 py-16 text-xs tracking-widest uppercase">{error}</p>;
  if (!selectedProduct) return null;

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-16">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Thumbnails */}
        <div className="hidden md:flex flex-col gap-2 w-16 shrink-0">
          {selectedProduct.images?.map((img, i) => (
            <button key={i} onClick={() => setMainImage(img)}
              className={`overflow-hidden border transition-all cursor-pointer ${mainImage?.url === img.url ? "border-primary" : "border-transparent"}`}>
              <img src={img.url} alt={img.altText} className="w-16 h-16 object-cover" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div className="md:w-[48%] shrink-0">
          {mainImage && (
            <div className="overflow-hidden bg-neutral-50">
              <img src={mainImage.url} alt={mainImage.altText} className="w-full aspect-[3/4] object-cover" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 flex flex-col">
          <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 mb-2">{selectedProduct.brand}</p>
          <h1 className="text-2xl font-light tracking-wide text-primary mb-4 leading-snug">{selectedProduct.name}</h1>

          <div className="flex items-baseline gap-3 mb-6">
            {selectedProduct.discountPrice ? (
              <>
                <span className="text-base font-semibold text-primary">${selectedProduct.discountPrice}</span>
                <span className="text-sm text-neutral-400 line-through">${selectedProduct.price}</span>
              </>
            ) : (
              <span className="text-base font-semibold text-primary">${selectedProduct.price}</span>
            )}
          </div>

          <p className="text-xs text-neutral-500 leading-relaxed mb-8">{selectedProduct.description}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-3">
              Color {selectedColor && <span className="font-normal text-neutral-400">— {selectedColor}</span>}
            </p>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.colors?.map((color, i) => (
                <button key={i} onClick={() => setSelectedColor(color)} title={color}
                  className={`w-7 h-7 border-2 transition-all cursor-pointer ${selectedColor === color ? "border-primary scale-110" : "border-transparent hover:border-neutral-300"}`}
                  style={{ backgroundColor: color.toLowerCase() }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-3">Size</p>
            <div className="flex gap-2 flex-wrap">
              {selectedProduct.sizes?.map((size, i) => (
                <button key={i} onClick={() => setSelectedSize(size)}
                  className={`px-4 py-2 text-[11px] font-medium tracking-wide border transition-colors cursor-pointer ${
                    selectedSize === size ? "bg-primary text-white border-primary" : "bg-white text-neutral-600 border-neutral-200 hover:border-primary"
                  }`}>
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="text-[10px] font-semibold tracking-widest uppercase text-primary mb-3">Quantity</p>
            <div className="flex items-center gap-4">
              <button disabled={quantity <= 1} onClick={() => setQuantity((p) => Math.max(p - 1, 1))}
                className="w-8 h-8 border border-neutral-200 flex items-center justify-center text-sm hover:border-primary disabled:opacity-30 transition-colors cursor-pointer">−</button>
              <span className="text-sm font-medium text-primary w-6 text-center">{quantity}</span>
              <button onClick={() => setQuantity((p) => p + 1)}
                className="w-8 h-8 border border-neutral-200 flex items-center justify-center text-sm hover:border-primary transition-colors cursor-pointer">+</button>
            </div>
          </div>

          <button onClick={handleAddToCart} disabled={disabled}
            className={`w-full py-4 text-[11px] font-semibold tracking-widest2 uppercase transition-colors cursor-pointer ${
              disabled ? "bg-neutral-200 text-neutral-400 cursor-not-allowed" : "bg-primary text-white hover:bg-neutral-800"
            }`}>
            {disabled ? "Adding..." : "Add to Bag"}
          </button>

          {/* Details */}
          <div className="mt-10 pt-8 border-t border-neutral-100 grid grid-cols-2 gap-4">
            {[["Brand", selectedProduct.brand], ["Material", selectedProduct.material], ["Category", selectedProduct.category], ["Gender", selectedProduct.gender]].map(([l, v]) => (
              <div key={l}>
                <p className="text-[9px] font-semibold tracking-widest uppercase text-neutral-400 mb-0.5">{l}</p>
                <p className="text-xs text-primary">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {similarProducts?.length > 0 && (
        <div className="mt-24">
          <p className="text-[10px] font-medium tracking-widest3 uppercase text-neutral-400 text-center mb-2">You May Also Like</p>
          <h2 className="text-xl font-light tracking-widest uppercase text-center text-primary mb-10">Similar Pieces</h2>
          <ProductGrid products={similarProducts} />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
