import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails, updateProduct } from "../../redux/slice/productSlice";

function EditProduct() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const { selectedProduct } = useSelector((state) => state.products);
  const [productData, setProductDate] = useState();

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    setProductDate(selectedProduct);
  }, [selectedProduct]);
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
  };
  const handleDataChange = (e) => {
    const { name, value } = e.target;
    setProductDate((pre) => ({ ...pre, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
   dispatch(updateProduct({id,productData}))
   navigate('/admin/products')
  };

  useEffect(() => {
    console.log(productData);
  }, [productData]);
  return (
    <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit} action="submit">
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Product Name
          </label>
          <input
            className="w-full p-2  border border-gray-500 rounded"
            type="text"
            name="name"
            required
            value={productData?.name}
            onChange={handleDataChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            description
          </label>
          <textarea
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="description"
            rows={4}
            value={productData?.description}
            onChange={handleDataChange}
          ></textarea>
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Price
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="number"
            name="price"
            value={productData?.price}
            onChange={handleDataChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Count in Stock
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="number"
            name="countInStock"
            required
            value={productData?.countInStock}
            onChange={handleDataChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            SKU
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="sku"
            value={productData?.sku}
            onChange={handleDataChange}
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Sizes (comma seperated)
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="name"
            value={productData?.sizes.join(", ")}
            onChange={(e) =>
              setProductDate((productData) => ({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              }))
            }
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Colors (comma seperated)
          </label>
          <input
            className="w-full p-2 border border-gray-300 rounded-md"
            type="text"
            name="name"
            value={productData?.colors.join(", ")}
            onChange={(e) =>
              setProductDate((productData) => ({
                ...productData,
                colors: e.target.value.split(",").map((color) => color.trim()),
              }))
            }
          />
        </div>
        <div className="mb-6">
          <label htmlFor="name" className="block font-semibold mb-2">
            Upload Image
          </label>
          <input
            type="file"
            className="cursor-pointer"
            name="imag"
            // value={productData?.category}
            onChange={handleImageUpload}
          />
          ,
          <div className="flex gap-4 mt-4">
            {productData?.images.map((image, i) => (
              <div key={i}>
                {" "}
                <img
                  className="h-20 w-20 shadow-md rounded-md object-cover"
                  src={image.url}
                  alt={image.altText || "product image"}
                />
              </div>
            ))}
          </div>
        </div>
        {
          <button className="w-full bg-green-500 rounded-md font-bold text-white py-2 hover:bg-green-600 cursor-pointer transition-colors ">
            {uploading ? "Updating ..." : "Update Product"}
          </button>
        }
      </form>
    </div>
  );
}

export default EditProduct;
