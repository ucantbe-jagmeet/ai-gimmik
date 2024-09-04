import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import UploadImage from "./UploadImage";
import { IKImage } from "imagekitio-react";
import { model } from "@/lib/gemini";

const NewPrompt: React.FC = () => {
  const endRef = useRef<HTMLDivElement | null>(null);

  // State to handle image upload data
  const [imageData, setImageData] = useState<{
    isLoading: boolean;
    dbData?: any;
  }>({
    isLoading: false,
  });
  const [question, setQuestion] = useState<string>("");
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const add = async (event: FormEvent) => {
    event.preventDefault(); 
    if (!question) return; 
    const prompt: string = question;
    try {
      const result = await model.generateContent(prompt);
      console.log(result.response.text());
      setQuestion(""); 
    } catch (error) {
      console.error("Error generating content:", error);
    }
  }; 

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
      <form className="newForm w-1/2 absolute bottom-0 bg-[#2c2937] rounded-2xl flex items-center gap-4 px-5 mb-2" onSubmit={add}>
        <UploadImage setImg={setImageData} />
        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
          name="question"
          value={question}
          placeholder="Ask Anything..."
          className="flex-1 px-5 py-3 bg-transparent border-none outline-none text-[#ececec]"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="button"
          onClick={add}
          className="rounded-full bg-[#605e68] border-none p-2.5 flex items-center justify-center"
        >
          <Image src="/arrow.png" alt="" width={16} height={16} className="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
