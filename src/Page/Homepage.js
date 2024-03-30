import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios"; // Import Axios
import Footer from "./Footer";
import "./Homepage.css";
import Snowflakes from "./Snowflake";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const userData = localStorage.getItem("user");

  useEffect(() => {
    // Use Axios to fetch data from ASP.NET API
    axios
      .get("https://localhost:7048/api/Products")
      .then((response) => {
        // Sort products by price in descending order
        const sortedProducts = response.data.sort(
          (a, b) => b.productPrice - a.productPrice
        );
        // Get the top 3 most expensive products
        const top3Products = sortedProducts.slice(0, 3);
        setProducts(top3Products);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setError(error.message || "An error occurred while fetching products.");
      });
  }, []);
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
      <div class="carousel max-w-screen-lg mx-auto flex justify-center ">
        <div id="slide1" class="carousel-item relative w-full">
          <img
            src="https://cdn.discordapp.com/attachments/1062376070390743123/1220369957959897192/SNOW.gif?ex=660eb117&is=65fc3c17&hm=7d6be2ff4f03f3ff1f27cf242dede7e4bf4adbe0526ddf028d5962c666079c48&"
            class="w-full"
          />
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide3" class="text-white">
              ❮
            </a>
            <a href="#slide2" class="text-white">
              ❯
            </a>
          </div>
        </div>
        <div id="slide2" class="carousel-item relative w-full">
          <img
            src="https://cdn.discordapp.com/attachments/1062376070390743123/1220369957959897192/SNOW.gif?ex=660eb117&is=65fc3c17&hm=7d6be2ff4f03f3ff1f27cf242dede7e4bf4adbe0526ddf028d5962c666079c48&"
            class="w-full"
          />
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide1" class="text-black">
              ❮
            </a>
            <a href="#slide3" class="text-black">
              ❯
            </a>
          </div>
        </div>
        <div id="slide3" class="carousel-item relative w-full">
          <img
            src="https://cdn.discordapp.com/attachments/1062376070390743123/1220372578133348393/SNOW_1.gif?ex=660eb388&is=65fc3e88&hm=2149d9d24c101c9996efbcadca2d4337590bcd29cade2c98c68fadeccda4586a&"
            class="w-full"
          />
          <div class="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide2" class="text-black">
              ❮
            </a>
            <a href="#slide1" class="text-black">
              ❯
            </a>
          </div>
        </div>
      </div>
      <br /> <br />
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div class="container-sm ps-4 pe-4 mb-3" style={{ width: "50%" }}>
          <div
            class="w-100 bg-glass shadow ps-0 pe-1 pe-lg-4 align-content-center"
            style={{
              borderRadius: "10vh",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div class="flex">
              <div class="col-6 col-lg-2 text-main">
                <div
                  class="p-2"
                  style={{
                    backgroundColor: "var(--main)",
                    borderRadius: "1vh 0 0 1vh",
                    fontWeight: 600,
                    fontSize: 20,
                  }}
                >
                  <img
                    src="https://cdn-icons-png.flaticon.com/512/8306/8306906.png"
                    width="25"
                  />
                </div>
              </div>
              <div
                class="col-6 col-lg-10 p-2 text-main justify-content-center"
                style={{ marginTop: 2.5, color: "black" }}
              >
                <marquee class=" font-bold">
                  {" "}
                  ยินดีต้อนรับ เข้าสู่ร้านค้า Snowman Shop
                  ขายเสื้อผ้าชั้นนำทั่วไป สามารถเลือกดูสินค้าได้ตามใจชอบ
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  {"  "}
                </marquee>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div className="container-sm ps-4 pe-4 mb-3" style={{ width: "50%" }}>
          <div
            className="w-100 bg-glass shadow ps-0 pe-1 pe-lg-4 align-content-center"
            style={{
              borderRadius: "1vh",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div className="flex align-items-center">
              <div className="col-6 col-lg-2 text-center">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/8306/8306906.png"
                  className="m-0 mb-2"
                  style={{ height: "2.5rem" }}
                />
              </div>
              <div
                className="col-6 col-lg-10 p-2 text-lg d-flex align-items-start"
                style={{ marginTop: 2.5 }}
              >
                <span className=" text-blue-500 font-bold">สินค้าแนะนำ</span>
              </div>
            </div>
            <div className="p-2">
              <div class="data-container">
                <a href="/Shop" class="btn text-sm px-2 py-1">
                  เพิ่มเติม
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br /> <br />
      <div data-aos="fade-up">
        <div className="flex justify-center">
          {products.map((product) => (
            <div
              key={product.productID}
              className="card card-compact w-64 bg-base-100 shadow-xl mr-12"
            >
              <figure>
                <img src={product.productImage} alt={product.productName} />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{product.productName}</h2>
                <p>{product.productDescription}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <br /> <br />
      <Footer />
    </div>
  );
};

export default Homepage;
