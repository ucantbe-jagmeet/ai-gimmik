'use client'
import NewPrompt from "@/components/NewPrompt";
import ReplyMessage from "@/components/ReplyMessage";
import TextMessage from "@/components/TextMessage";
import styled from "styled-components";

const ChatPage = () => {
  return (
    <ChatWrapper className="chatPage relative h-full flex flex-col items-center">
      <div className="wrapper h-[80vh] w-full overflow-y-auto flex justify-center">
        <div className="chat w-1/2 flex pt-3 flex-col gap-y-2">
          <ReplyMessage reply="Reply from Ai" />
          <TextMessage text="Text Message" />
          <NewPrompt />
        </div>
      </div>
    </ChatWrapper>
  );
};

const ChatWrapper = styled.div`
  .chat {
    p,
    li {
      margin: 10px 0px;
    }
  }
`;

export default ChatPage;
