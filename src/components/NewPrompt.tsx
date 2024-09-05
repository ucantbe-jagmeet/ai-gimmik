import Image from "next/image";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import UploadImage from "./UploadImage";
import { IKImage } from "imagekitio-react";
import { model } from "@/lib/gemini";
import ReplyMessage from "./ReplyMessage";
import TextMessage from "./TextMessage";
import { IUserChat } from "@/types/type";

export interface INewPrompt {
  data: IUserChat | null;
}

const NewPrompt: React.FC<INewPrompt> = ({ data }) => {
  const [imageData, setImageData] = useState<{
    isLoading: boolean;
    error?: string;
    dbData?: { filePath?: string };
    aiData?: any;
  }>({
    isLoading: false,
    error: "",
    dbData: {},
    aiData: {},
  });

  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const endRef = useRef<HTMLDivElement | null>(null);

  const chat = model.startChat({
    history: data?.history.map(({ role, parts }) => ({
      role,
      parts: parts.map((part) => ({ text: part.text })),
    })),
    generationConfig: {
      // maxOutputTokens: 100,
    },
  });

  const add = async (text: string) => {
    try {
      const result = await chat.sendMessageStream(
        Object.entries(imageData.aiData).length
          ? [imageData.aiData, text]
          : [text]
      );

      let accumulatedText = "";
      for await (const chunk of result.stream) {
        const chunkText = chunk.text();
        console.log(chunkText);
        accumulatedText += chunkText;
        setAnswer(accumulatedText);
      }

      setImageData({
        isLoading: false,
        error: "",
        dbData: {},
        aiData: {},
      });
    } catch (error) {
      console.error("Error generating content:", error);
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const text = (
      e.currentTarget.elements.namedItem("text") as HTMLInputElement
    ).value;
    if (!text) return;

    add(text);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [answer, question, imageData?.dbData]);

  return (
    <>
      {/* Add new chat */}
      {imageData.isLoading && <div>Loading...</div>}
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
          type="submit"
          className="rounded-full bg-[#605e68] border-none p-2.5 flex items-center justify-center"
        >
          <Image src="/arrow.png" alt="" width={16} height={16} />
        </button>
      </form>
    </>
  );
};

export default NewPrompt;
