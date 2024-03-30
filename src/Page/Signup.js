import React, { useState } from "react";
import Header from "./Header";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Snowflakes from "./Snowflake";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !username ||
      !password ||
      !confirmPassword ||
      !phoneNumber ||
      !address
    ) {
      alert("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    try {
      const newUser = {
        userName: username,
        userPassword: password,
        userImage: "IMG", // Default image
        userAddress: address,
        userPhone: phoneNumber,
        userRole: "User", // Default role
      };

      // Post user data to the API
      const response = await axios.post(
        "https://localhost:7048/api/Users",
        newUser
      );

      // Handle successful response
      console.log("User created:", response.data);

      // Show success message
      Swal.fire({
        icon: "success",
        title: "Registration Successful",
        text: "Your account has been created successfully!",
        showConfirmButton: true,
      }).then((result) => {
        // Redirect to login page after success message
        if (result.isConfirmed) {
          history.push("/Login");
        }
      });
    } catch (error) {
      // Handle error response
      console.error("Error creating user:", error);
      alert(
        "An error occurred while creating your account. Please try again later."
      );
    }
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
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="user"
                  name="user"
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="User123"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="confirm-password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phonenumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Phonenumber
                </label>
                <input
                  type="tel"
                  name="phonenumber"
                  id="phonenumber"
                  placeholder="0999999999"
                  pattern="[0-9]{10}"
                  title="Please enter a valid phone number"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="address"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Address
                </label>
                <input
                  type="address"
                  name="address"
                  id="address"
                  placeholder="9/1 ถ.กรุงธน ต.กรุง อ.กรุง จ.กรุงเต๊บ 76550"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-black btn btn-outline btn-info bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/Login"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
