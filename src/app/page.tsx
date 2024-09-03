'use client'
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";


export default function Home() {
  const [typingStatus, setTypingStatus] = useState('human1');

  return (
    <div className="homepage flex items-center h-screen gap-28 px-20">
      <div className="left flex-1 flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-[90px] bg-gradient-to-r from-[#217bfe] to-[#00fe40] bg-clip-text text-transparent">
          AI GIMMIK
        </h1>
        <h2 className="font-bold text-xl mb-5">
          Supercharge your creativity and productivity
        </h2>
        <h3 className="">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque
          perspiciatis ipsam aperiam voluptas aut, quas possimus neque accusamus
        </h3>
        <button className="px-[25px] py-[15px] bg-[#217bfe] text-white rounded-[20px] text-[14px] mt-[20px] hover:bg-white hover:text-[#217bfe]">
          Get Started
        </button>
      </div>
      <div className="right flex-1 flex items-center justify-center h-full">
        <div className="imgContainer flex items-center justify-center rounded-xl bg-[#140e2d] w-4/5 height-1/2">
          <div className="bgContainer">
            <div className="bg"></div>
          </div>
          <Image
            src="/bot.png"
            alt=""
            width={400}
            height={500}
            className="bot"
          />
          <div className="chat absolute md:bottom-28 md:right-36 flex items-center gap-2 p-4 bg-[#2c2937] rounded-lg">
            <Image
              src={
                typingStatus === "human1"
                  ? "/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/human2.jpeg"
                  : "/bot.png"
              }
              alt=""
              width={20}
              height={20}
              className="bot rounded-full h-12 w-12 mr-3 object-cover"
            />
            <TypeAnimation
              sequence={[
                "Optimize for Speed and Efficiency",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Optimize for UI Experience",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Optimize for Personalization Features",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Choose the Right AI Model",
                2000,
                () => {
                  setTypingStatus("human2");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
