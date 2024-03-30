import React from "react";
import { Link, useHistory } from "react-router-dom"; // เพิ่ม useHistory เข้ามา
import swal from "sweetalert";

import "./Header.css";
import "boxicons";

const Header = () => {
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const history = useHistory(); // สร้างตัวแปร history จาก useHistory()

  const handleLogout = () => {
    swal("Logout successful!", {
      icon: "success",
      buttons: false,
      timer: 1500,
    }).then(() => {
      history.push("/Home");
      localStorage.removeItem("user");
    });
  };

  return (
    <header>
      <img
        src="https://cdn.discordapp.com/attachments/1062376070390743123/1220358491789852682/6ba87d85426579f22152bec3cf5cf914.png?ex=660ea669&is=65fc3169&hm=7f3a1f418d43a2b53dcd27fd83fa59ad1ed834571cdf83bfd049f2dde18c2b08&"
        width="80"
      />
      <div class="container relative group">
        <div>
          <Link to="/Home">หน้าหลัก</Link>
        </div>
        <div>
          <Link to="/Shop">ร้านค้า</Link>
        </div>
        <div>
          <Link to="/Dev">ผู้จัดทำ</Link>
        </div>
        {user && user.userRole === "Admin" && (
          <div>
            <Link to="/Addproduct">Add Product</Link>
          </div>
        )}
        {user && user.userRole === "Admin" && (
          <div>
            <Link to="/Order">Orders</Link>
          </div>
        )}
      </div>

      <div class="dropdown dropdown-end">
        <div tabindex="0">
          <div class="w-20 rounded-full">
            <box-icon name="user-circle" size="lg" color="red"></box-icon>
          </div>
        </div>

        <ul
          tabindex="0"
          class="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow bg-base-100 bg-opacity-70 rounded-box w-52"
        >
          <li>
            <Link to="/Profile" class="justify-between text-black">
              Profile
            </Link>
          </li>
          {!user && (
            <li>
              <Link to="/Login" class="text-black">
                Login
              </Link>
            </li>
          )}
          {user && (
            <li>
              <button class="text-black" onClick={handleLogout}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
};

export default Header;
