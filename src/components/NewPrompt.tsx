import Image from "next/image";
import React, { useEffect, useRef } from "react";

const NewPrompt: React.FC = () => {
      const endRef = useRef<HTMLDivElement | null>(null);

      useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth" });
      }, []);
  return (
    <>
    {/* Add new chat */}
    <div className="endChat pb-5" ref={endRef}></div>
      <form className="newForm w-1/2 absolute bottom-0 bg-[#2c2937] rounded-2xl flex items-center gap-4 px-5 mb-2">
        <label
          htmlFor="file"
          className="rounded-full bg-[#605e68] border-none p-2.5 flex items-center justify-center "
        >
          <Image src="/attachment.png" alt="" width={16} height={16} />
        </label>
        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
          placeholder="Ask Anything..."
          className="flex-1 px-5 py-3 bg-transparent border-none outline-none text-[#ececec]"
        />
        <button
          type="button"
          className="rounded-full bg-[#605e68] border-none p-2.5 flex items-center justify-center"
        >
          <Image src="/arrow.png" alt="" width={16} height={16} className="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
