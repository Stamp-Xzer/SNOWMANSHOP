import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Snowflakes from "./Snowflake";

const Dev = () => {
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
      <br /> <br /> <br /> <br /> <br />
      <div className="max-w-md p-8 mx-auto sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100 ">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src="https://cdn.discordapp.com/attachments/1062376070390743123/1219285109308391435/image.png?ex=660abebf&is=65f849bf&hm=678b430fd3dc4356feb5eb095f40b57e97453dfba5a844154fa21741475fe58e&"
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-blue-400">
              Puttipong Srisaard
            </h2>
            <span className="text-sm dark:text-gray-400 text-blue-300">
              Dev1
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-400">puttipong.sri@ku.th</span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="IG"
                className="w-4 h-4"
              >
                <image
                  href="https://cdn.discordapp.com/attachments/1062376070390743123/1219263090068029472/1200px-Instagram_icon.png?ex=660aaa3d&is=65f8353d&hm=b0c914f8cd923f315db077caff0cf5c58d0c5072f13856d2164b11dd7d391e37&"
                  width="512"
                  height="512"
                />
              </svg>
              <span className="dark:text-gray-400">bankk.p</span>
            </span>
          </div>
        </div>
      </div>
      <div className="max-w-md p-8 mx-auto sm:flex sm:space-x-6 dark:bg-gray-900 dark:text-gray-100 ">
        <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
          <img
            src="https://cdn.discordapp.com/attachments/893088061276192790/1221505291623858377/341386315_590061889731481_5031388525391816973_n.jpg?ex=6612d273&is=66005d73&hm=2389241f09bbea5e89ccce5240d9ee2495b7cda199c9fb0677f12de38383d9c1&"
            alt=""
            className="object-cover object-center w-full h-full rounded dark:bg-gray-500"
          />
        </div>
        <div className="flex flex-col space-y-4">
          <div>
            <h2 className="text-2xl font-semibold text-blue-700">
              Mathit Jantharith
            </h2>
            <span className="text-sm dark:text-gray-400 text-blue-700">
              Dev2
            </span>
          </div>
          <div className="space-y-1">
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="Email address"
                className="w-4 h-4"
              >
                <path
                  fill="currentColor"
                  d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"
                ></path>
              </svg>
              <span className="dark:text-gray-400">mathit.j@ku.th</span>
            </span>
            <span className="flex items-center space-x-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                aria-label="IG"
                className="w-4 h-4"
              >
                <image
                  href="https://cdn.discordapp.com/attachments/1062376070390743123/1219263090068029472/1200px-Instagram_icon.png?ex=660aaa3d&is=65f8353d&hm=b0c914f8cd923f315db077caff0cf5c58d0c5072f13856d2164b11dd7d391e37&"
                  width="512"
                  height="512"
                />
              </svg>
              <span className="dark:text-gray-400">stamp_46z</span>
            </span>
          </div>
        </div>
      </div>{" "}
      <br /> <br /> <br /> <br /> <br />
      <br />
      <Footer />
    </div>
  );
};

export default Dev;
