"use client";
import { usePathname } from "next/navigation";
import NewPrompt from "@/components/NewPrompt";
import ReplyMessage from "@/components/ReplyMessage";
import TextMessage from "@/components/TextMessage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook
import { IKImage } from "imagekitio-react";
import { IUserChat } from "@/types/type";

const ChatPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [chat, setChat] = useState<IUserChat | null>(null);
  const path = usePathname();
  const id = path.split("/")[2];

  useEffect(() => {
    const fetchChat = async () => {
      if (!user) return;

      try {
        const res = await fetch(`/api/v1/singleChats?id=${id}`, {
          credentials: "include",
        });
        const data = await res.json();
        setChat(data);
      } catch (error) {
        console.error("Failed to fetch chat:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchChat();
    }
  }, [id, user]);

  if (loading) return (
    <div className="wrapper h-[80vh] w-full overflow-y-auto flex flex-col items-center justify-center">
      Loading ...
    </div>
  );

  return (
    <ChatWrapper className="chatPage relative h-full flex flex-col items-center">
      <div className="wrapper h-[80vh] w-full overflow-y-auto flex flex-col items-center justify-center custom-scrollbar">
        {chat &&
          chat.history.map((message, index) => (
            <div
              key={index}
              className="chat h-full pt-2 w-1/2 flex flex-col gap-y-2 custom-scrollbar"
            >
              {message?.img && (
                <IKImage
                  urlEndpoint={process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT!}
                  path={message.img}
                  height={300}
                  width={400}
                  className="object-contain w-[300px] h-[400px] m-5 self-end"
                  loading="lazy"
                />
              )}
              {message.role === "model"
                ? message.parts.map((part, i) => (
                    <ReplyMessage key={i} reply={part.text} />
                  ))
                : message.parts.map((part, i) => (
                    <TextMessage key={i} text={part.text} />
                  ))}
            </div>
          ))}
        <div className="chat w-1/2 flex flex-col gap-y-2 ">
          {chat && <NewPrompt data={chat} />}
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
