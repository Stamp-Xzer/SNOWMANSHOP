import React, { useState, useEffect } from "react";
import axios from "axios"; // Import Axios
import Header from "./Header";
import Footer from "./Footer";
import Snowflakes from "./Snowflake";
import AOS from "aos";
import Swal from "sweetalert2";
import { Link, useHistory } from "react-router-dom";
const generatePayload = require("promptpay-qr");

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedProduct2, setSelectedProduct2] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("093-128-0344");
  const [amount, setAmount] = useState(null);
  const [qrCode, setqrCode] = useState("sample");
  const [editProductName, setEditProductName] = useState(null);
  const [editProductPrice, setEditProductPrice] = useState(null);
  const [editProductDescription, setEditProductDescription] = useState(null);
  const [editProductImage, setEditProductImage] = useState(null);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const [selectedProductType, setSelectedProductType] = useState("all");
  const history = useHistory();

  useEffect(() => {
    // Use Axios to fetch data from ASP.NET API
    axios
      .get("https://localhost:7048/api/Products")
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message || "An error occurred while fetching products.");
      });

    // Initialize AOS library
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
    setIsChecked2(false);
    // เรียงราคาจากถูกไปหาแพง
    setProducts([...products.sort((a, b) => b.productPrice - a.productPrice)]);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked1(false);
    setIsChecked2(!isChecked2);
    // เรียงราคาจากแพงไปหาถูก
    setProducts([...products.sort((a, b) => a.productPrice - b.productPrice)]);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    // Construct the updated product object
    const updatedProduct = {
      productID: selectedProduct2.productID, // Assuming productID is a unique identifier
      productName: editProductName,
      productPrice: editProductPrice,
      productDescription: editProductDescription,
      productType: selectedProduct2.productType,
      productImage: selectedProduct2.productImage,
    };

    // Send a PUT request to update the product
    axios
      .put(
        `https://localhost:7048/api/Products/${selectedProduct2.productID}`,
        updatedProduct
      )
      .then((response) => {
        console.log("Product updated successfully:", response.data);

        // Update the products state with the updated product
        setProducts(
          products.map((p) =>
            p.productID === selectedProduct2.productID ? updatedProduct : p
          )
        );

        setIsModalOpen2(false); // Close the edit modal after successful update
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        // Display error message
        setError(
          error.message || "An error occurred while updating the product."
        );
      });
  };

  const OrderProduct = async () => {
    setIsModalOpen(false);
    if (user) {
      const OrderProductNew = {
        orderProductID: selectedProduct.productID,
        orderPrice: selectedProduct.productPrice,
        orderStatus: "non-pay",
        orderUsername: user.userName,
      };
      try {
        const response = await axios.post(
          "https://localhost:7048/api/Orders",
          OrderProductNew
        );
        // console.log(response);
        Swal.fire({
          icon: "success",
          title: "Add Order Successful",
          text: `Your add order ${selectedProduct.productName} successfully!`,
          showConfirmButton: true,
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/Shop");
          }
        });
      } catch (error) {
        console.error("Error adding product:", error);
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Please Login!!",
        // text: `Your add order ${selectedProduct.productName} successfully!`,
        showConfirmButton: true,
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/Login");
        }
      });
    }
  };

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
    setAmount(product.productPrice); // Set the amount here
    setqrCode(generatePayload(phoneNumber, { amount: product.productPrice }));
    console.log("Modal opened");
  };

  const DelProduct = (product) => {
    if (!product) {
      console.error("Product is null or undefined.");
      return;
    }

    // Confirm deletion with user
    if (!window.confirm("Are you sure you want to delete this product?")) {
      return;
    }

    axios
      .delete(`https://localhost:7048/api/Products/${product.productID}`)
      .then((response) => {
        console.log("Product deleted successfully:", response.data);
        // Remove the deleted product from the products state
        console.log("AAA");
        setProducts(products.filter((p) => p.productID !== product.productID));
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Display error message
        setError(
          error.message || "An error occurred while deleting the product."
        );
      });
  };

  const EditProduct = (product) => {
    setIsModalOpen2(true);
    setSelectedProduct2(product);
  };

  return (
    <div
      className="custom-scrollbar"
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
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <select
          className="select select-error w-full max-w-xs"
          onChange={(e) => setSelectedProductType(e.target.value)}
        >
          <option value="all">สินค้าทั้งหมด</option>
          <option value="Coat">เสื้อกันหนาว</option>
          <option value="Shirt">เสื้อเชิ้ต</option>
        </select>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
            className="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
          />
          <span className="ml-2 text-red-500">แพง-ถูก</span>
        </label>
        <br />
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
            className="checkbox border-orange-400 checked:border-indigo-800 [--chkbg:theme(colors.indigo.600)] [--chkfg:orange]"
          />
          <span className="ml-2 text-green-500">ถูก-แพง</span>
        </label>
      </div>
      <br></br>
      <div data-aos="fade-up">
        <div className="justify-center mx-auto grid grid-cols-5 w-max">
          {products
            .filter((product) =>
              selectedProductType === "all"
                ? true
                : product.productType === selectedProductType
            )
            .map((product) => (
              <div
                key={product.productID}
                className="card card-compact w-64 bg-base-100 shadow-xl mr-12 mb-12"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <figure>
                  <img src={product.productImage} alt={product.productName} />
                </figure>
                <div className="card-body flex-grow">
                  <h2 className="card-title">{product.productName}</h2>
                  <p>{product.productDescription}</p>
                </div>
                <div className="card-actions flex justify-between items-center px-4 py-2">
                  <h1 className="text-2xl text-white font-bold">
                    {product.productPrice + ".00 ฿"}
                  </h1>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleBuyNow(product);
                      setAmount(product.productPrice);
                      const myModal = document.getElementById("my_modal_3");
                      if (myModal) {
                        myModal.showModal();
                      }
                    }}
                  >
                    Buy Now
                  </button>
                  {user && user.userRole === "Admin" && (
                    <button
                      className="btn btn-error mx-auto "
                      onClick={() => {
                        DelProduct(product);
                      }}
                    >
                      Delete
                    </button>
                  )}
                  {user && user.userRole === "Admin" && (
                    <button
                      className="btn btn-info mx-auto"
                      onClick={() => {
                        EditProduct(product);
                        const myModal = document.getElementById("my_modal_5");
                        if (myModal) {
                          myModal.showModal();
                        }
                      }}
                    >
                      Edit
                    </button>
                  )}
                </div>
                <dialog id="my_modal_3" className="modal">
                  <div className="modal-box">
                    <form method="dialog"></form>
                    {selectedProduct && (
                      <>
                        <figure>
                          <img
                            src={product.productImage}
                            alt={product.productName}
                          />
                        </figure>
                        <br></br>
                        <h3 className="font-bold text-lg">
                          ชื่อ : {selectedProduct.productName}
                        </h3>
                        <p className="py-4">
                          รายละเอียด : {selectedProduct.productDescription}
                        </p>
                        <div className="card-actions flex justify-between items-center px-4 py-2">
                          <h3 className="font-bold text-3xl text-white">
                            {selectedProduct.productPrice + ".00 ฿"}
                          </h3>
                          <button
                            className="btn btn-primary"
                            onClick={() => {
                              OrderProduct();
                              const myModal =
                                document.getElementById("my_modal_3");
                              if (myModal) {
                                myModal.close();
                              }
                            }}
                          >
                            Pay
                          </button>
                        </div>
                      </>
                    )}
                    {!selectedProduct && <p>No product selected.</p>}
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button>close</button>
                  </form>
                </dialog>
                <dialog
                  id="my_modal_5"
                  className="container modal mx-auto justify-center "
                >
                  <div className="modal-box">
                    {selectedProduct2 && (
                      <form onSubmit={handleEditSubmit}>
                        <div className="mb-4">
                          <label
                            htmlFor="editProductName"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Product Name:
                          </label>
                          <input
                            type="text"
                            id="editProductName"
                            value={editProductName}
                            onChange={(event) =>
                              setEditProductName(event.target.value)
                            }
                            className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline textarea textarea-error"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="editProductPrice"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Product Price:
                          </label>
                          <input
                            type="number"
                            id="editProductPrice"
                            value={editProductPrice}
                            onChange={(event) =>
                              setEditProductPrice(event.target.value)
                            }
                            className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline textarea textarea-error"
                            required
                          />
                        </div>

                        <div className="mb-4">
                          <label
                            htmlFor="editProductDescription"
                            className="block text-gray-700 text-sm font-bold mb-2"
                          >
                            Product Description:
                          </label>
                          <input
                            type="text"
                            id="editProductDescription"
                            value={editProductDescription}
                            onChange={(event) =>
                              setEditProductDescription(event.target.value)
                            }
                            className="appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline textarea textarea-error"
                            required
                          />
                        </div>
                        <button type="submit" className="btn btn-primary ">
                          Update Product
                        </button>
                      </form>
                    )}
                  </div>
                  <form method="dialog" className="modal-backdrop">
                    <button onClick={() => setIsModalOpen(false)}>Close</button>
                  </form>
                </dialog>
              </div>
            ))}
        </div>
      </div>
      <br /> <br />
      {error && <div className="error-message">{error}</div>}
      <br /> <br /> <br /> <br /> <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Shop;
