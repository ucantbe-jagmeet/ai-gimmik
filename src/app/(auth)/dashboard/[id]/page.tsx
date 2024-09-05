"use client";
import { usePathname } from "next/navigation";
import NewPrompt from "@/components/NewPrompt";
import ReplyMessage from "@/components/ReplyMessage";
import TextMessage from "@/components/TextMessage";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useUser } from "@clerk/nextjs"; // Import Clerk's useUser hook

interface IMessage {
  role: string;
  parts: Array<{ _id: string; text: string }>;
}

interface IChat {
  _id: string;
  userId: string;
  history: IMessage[];
  createdAt: string;
  updatedAt: string;
}

const ChatPage = () => {
  const { user } = useUser();
  const [loading, setLoading] = useState<boolean>(true);
  const [chat, setChat] = useState<IChat | null>(null);
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
        console.log("ddata", data);
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

  return (
    <ChatWrapper className="chatPage relative h-full flex flex-col items-center">
      <div className="wrapper h-[80vh] w-full overflow-y-auto flex justify-center">
        {loading ? (
          <p>Loading...</p>
        ) : chat ? (
          <>
            {chat.history.map((message, index) => (
              <div key={index} className="chat w-1/2 flex pt-3 flex-col gap-y-2">
                {message.role === "model" ? (
                  message.parts.map((part, i) => (
                    <ReplyMessage key={i} reply={part.text} />
                  ))
                ) : (
                  message.parts.map((part, i) => (
                    <TextMessage key={i} text={part.text} />
                  ))
                )}
              </div>
            ))}
            <NewPrompt />
            </>
        ) : (
          <p>No chat data available.</p>
        )}
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
