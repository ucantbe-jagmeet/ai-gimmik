import React from "react";
import Markdown from "react-markdown";

interface IReplyMessage {
  reply: string;
}

const ReplyMessage: React.FC<IReplyMessage> = ({ reply }) => {
  return (
    <div className="message px-5 py-3">
      <Markdown>{reply}</Markdown>
    </div>
  );
};

export default ReplyMessage;
