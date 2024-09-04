import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import UploadImage from "./UploadImage";
import { IKImage } from "imagekitio-react";

const NewPrompt: React.FC = () => {
  const endRef = useRef<HTMLDivElement | null>(null);

  // State to handle image upload data
  const [imageData, setImageData] = useState<{
    isLoading: boolean;
    dbData?: any;
  }>({
    isLoading: false,
  });

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  console.log("imageData", imageData);
  
  return (
    <>
      {/* Add new chat */}
      {imageData.isLoading && <div className="">Loading...</div>}
      {!imageData.isLoading && imageData.dbData?.filePath && (
        <IKImage
          urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
          path={imageData.dbData.filePath}
          width={300}
          height={400}
          className="object-contain"
        />
      )}
      <div className="endChat pb-5" ref={endRef}></div>
      <form className="newForm w-1/2 absolute bottom-0 bg-[#2c2937] rounded-2xl flex items-center gap-4 px-5 mb-2">
        <UploadImage setImg={setImageData} />
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
