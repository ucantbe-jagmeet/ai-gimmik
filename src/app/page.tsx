import Image from "next/image";
import botImg from "../../public/images/bot.png"
export default function Home() {
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
          <Image src={botImg} alt="" width={400} height={500} className="bot" />
        </div>
      </div>
    </div>
  );
}
