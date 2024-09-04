import React from "react";

interface ITextMessage {
  text: string;
}
const TextMessage: React.FC<ITextMessage> = ({ text }) => {
  return (
    <div className="message user px-5 py-3 bg-[#2c2937] rounded-2xl max-w-[80%] self-end">
      {text}
    </div>
  );
};

export default TextMessage;
