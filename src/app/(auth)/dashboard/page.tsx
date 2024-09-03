import DashBoardIcons from '@/components/DashBoardIcons';
import Image from 'next/image';
import React from 'react'

const Page = () => {
  return (
    <div className="dashboardPage h-full flex flex-col items-center">
      <div className="texts flex-1 flex items-center justify-center flex-col w-1/2 gap-10">
        <div className="text-6xl cursor-pointer font-bold opacity-20">
          <h2>AI Gimmik</h2>
        </div>
        <div className="options  w-full flex items-center justify-between capitalize gap-12">
          <DashBoardIcons imgSrc="/chat.png" title="Create a New Chat" />
          <DashBoardIcons imgSrc="/image.png" title="Analyze Images" />
          <DashBoardIcons imgSrc="/code.png" title="Help me with my Code" />
        </div>
      </div>
      <div className="formContainer mt-auto w-1/2 bg-[#2c2937] rounded-2xl flex">
        <form className="w-full h-full flex items-center justify-between gap-5 mb-2.5">
          <input
            type="text"
            placeholder="Ask me anything..."
            className="flex-1 px-5 py-3 bg-transparent border-none outline-none text-[#ececec]"
          />
          <button className="bg-[#605e68] cursor-pointer p-2.5 justify-center items-center flex mr-5 rounded-full">
            <Image
              src="/arrow.png"
              alt="help me image"
              width={16}
              height={16}
            />
          </button>
        </form>
      </div>
    </div>
  );
}

export default Page
