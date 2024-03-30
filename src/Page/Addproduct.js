import React, { useState } from "react";
import Header from "./Header";
import Snowflakes from "./Snowflake";
import axios from "axios";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState(0);
  const [productDescription, setProductDescription] = useState("");
  const [productType, setProductType] = useState("");
  const [productImage, setProductImage] = useState(null);
  const history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const newProduct = {
      productName: productName,
      productPrice: productPrice,
      productDescription: productDescription,
      productType: productType,
      productImage: productImage,
    };

    try {
      const response = await axios.post(
        "https://localhost:7048/api/Products",
        newProduct
      );
      console.log("Product added:", response.data);
      Swal.fire({
        icon: "success",
        title: "Add Product Successful",
        text: `Your add Product ${productName} successfully!`,
        showConfirmButton: true,
      }).then((result) => {
        // Redirect to login page after success message
        if (result.isConfirmed) {
          history.push("/Shop");
        }
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundImage:
          "url('https://cdn.discordapp.com/attachments/893088061276192790/1219696450984738826/Untitled_image.jpeg?ex=660c3dd6&is=65f9c8d6&hm=f90584bf8b983c2ceb384f3ce47d8ef1314550981f52713d0a286af9d456cb9c&')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Header />
      <Snowflakes />
      <br /> <br />
      <div className="sm:container mx-auto justify-center">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ">
          <h1 className="text-2xl mb-4">Add Product</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="product-name"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Name:
              </label>
              <input
                type="text"
                id="product-name"
                value={productName}
                onChange={(event) => setProductName(event.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline textarea textarea-error"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="product-price"
                className="block text-gray-700 text-sm font-bold mb-2 "
              >
                Product Price:
              </label>
              <input
                type="number"
                id="product-price"
                value={productPrice}
                onChange={(event) => setProductPrice(event.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline textarea textarea-error"
                required
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="product-description"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Description:
              </label>
              <textarea
                id="product-description"
                value={productDescription}
                onChange={(event) => setProductDescription(event.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-white textarea textarea-error leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <div className="mb-4">
              <label
                htmlFor="product-type"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Type:
              </label>
              <select
                id="product-type"
                value={productType}
                onChange={(event) => setProductType(event.target.value)}
                className="select select-error w-full max-w-xs text-white"
                required
              >
                <option value="Coat">Coat</option>
                <option value="Shirt">Shirt</option>
              </select>
            </div>
            <div className="mb-4">
              <label
                htmlFor="product-image"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Product Image:
              </label>
              <textarea
                id="product-image"
                value={productImage}
                onChange={(event) => setProductImage(event.target.value)}
                className="appearance-none border rounded w-full py-2 px-3 text-white textarea textarea-error leading-tight focus:outline-none focus:shadow-outline"
                required
              ></textarea>
            </div>
            <button type="submit" className="btn btn-outline btn-info">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
