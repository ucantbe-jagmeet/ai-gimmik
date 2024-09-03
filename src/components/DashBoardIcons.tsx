import Image from 'next/image';
import React from 'react'

interface IDashboardIcons {
  imgSrc: string;
  title: string;
}
const DashBoardIcons:React.FC<IDashboardIcons> = ({imgSrc, title}) => {
  return (
    <div className="option flex items-center flex-col gap-2.5 border-[#555] border-[1px] rounded-xl p-5">
      <Image
        src={imgSrc}
        alt={title}
        width={40}
        height={40}
        className="object-cover"
      />
      <span className="text-[12px]">Create a New Chat</span>
    </div>
  );
}

export default DashBoardIcons