import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import Footer from "./Footer";
import Snowflakes from "./Snowflake";

const Profile = () => {
  const [image, setImage] = useState(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const userData = localStorage.getItem("user");
  const user = userData ? JSON.parse(userData) : null;
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to update profile picture and user data
  const handleSaveImage = async () => {
    if (user && user.userName) {
      try {
        // Update user data with new image URL
        await axios.put(`https://localhost:7048/api/Users/${user.userName}`, {
          ...user,
          userImage: image,
        });
        // Update localStorage with new image URL
        const updatedUserData = { ...user, userImage: image };
        localStorage.setItem("user", JSON.stringify(updatedUserData));
        setIsModalOpen(false); // Close the modal after saving
      } catch (error) {
        console.error("Error updating profile picture:", error);
      }
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://cdn.discordapp.com/attachments/893088061276192790/1219696450984738826/Untitled_image.jpeg?ex=660c3dd6&is=65f9c8d6&hm=f90584bf8b983c2ceb384f3ce47d8ef1314550981f52713d0a286af9d456cb9c&')",
      }}
    >
      <Header />
      <Snowflakes />
      <section className="pt-16 bg-blueGray-50">
        <div className="w-full lg:w-4/12 px-4 mx-auto">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
            <div className="px-6">
              <div className="text-center mt-12">
                <div className="bg-gray-100 rounded-full overflow-hidden relative w-28 h-28 mx-auto">
                  <div
                    className="w-full h-full rounded-full cursor-pointer overflow-hidden"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => setIsModalOpen(true)}
                  >
                    {user && user.userImage && (
                      <img
                        src={user.userImage}
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    )}
                  </div>
                </div>

                {user && (
                  <div>
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                      Username: {user.userName}
                    </h3>
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                      Password: {user.userPassword}
                    </h3>
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                      Phonenumber: {user.userPhone}
                    </h3>
                    <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                      Address: {user.userAddress}
                    </h3>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4">
              Change Profile Picture
            </h2>
            <form>
              <textarea
                rows={4}
                placeholder="Enter image URL"
                value={image || (user && user.userImage) || ""}
                onChange={(e) => setImage(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded-md"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg mr-2"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveImage}
                  className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      <br /> <br /> <br /> <br /> <br />
      <br />
      <br />
      <br />
      <Footer />
    </div>
  );
};

export default Profile;
