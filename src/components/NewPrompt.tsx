import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import UploadImage from "./UploadImage";
import { IKImage } from "imagekitio-react";
import { model } from "@/lib/gemini";
import ReplyMessage from "./ReplyMessage";
import TextMessage from "./TextMessage";
import Markdown from "react-markdown";

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
  const [answer, setAnswer] = useState<string>("");
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answer, question, imageData?.dbData]);

  const add = async (text : string) => {
      try {
        const result = await model.generateContent(text);
        const answerText = result.response;
        if (!answerText) return;
        setAnswer(answerText.text());
        setQuestion(""); 
      } catch (error) {
        console.error("Error generating content:", error);
      }
  }; 

  const handleSubmit = async (e:any) => {
      e.preventDefault();
      const text = e.target.text.value
      if(!text) return
      add(text)
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
      {question && <TextMessage text={question} />}
      {answer && <ReplyMessage reply={answer} />}
      <div className="endChat pb-5" ref={endRef}></div>
      <form
        className="newForm w-1/2 absolute bottom-0 bg-[#2c2937] rounded-2xl flex items-center gap-4 px-5 mb-2"
        onSubmit={handleSubmit}
      >
        <UploadImage setImg={setImageData} />
        <input id="file" type="file" multiple={false} hidden />
        <input
          type="text"
          name="text"
          value={question}
          placeholder="Ask Anything..."
          className="flex-1 px-5 py-3 bg-transparent border-none outline-none text-[#ececec]"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-full bg-[#605e68] border-none p-2.5 flex items-center justify-center"
        >
          <Image src="/arrow.png" alt="" width={16} height={16} className="" />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
