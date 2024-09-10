import React, { useEffect, useState } from "react";
import LinkHelper from "./LinkHelper";
import { IChat } from "@/types/type";


const ListChat: React.FC = () => {
  const [chats, setChats] = useState<IChat[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await fetch("/api/v1/userChats", {
          credentials: "include",
        });
        const data = await res.json();
        setChats(data || []);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchChats();
  }, []); 

  return (
    <div className="chatList flex flex-col h-full w-full">
      <span className="title font-semibold text-[12px] mb-2">DASHBOARD</span>
      <LinkHelper
        href="/dashboard"
        title="Create a new Chat"
        classes="text-[14px]"
      />
      <LinkHelper
        href="https://github.com/ucantbe-jagmeet"
        title="Contact"
        classes="text-[14px]"
      />
      <hr className="border-none h-[2px] bg-[#ddd] opacity-10 mb-4" />
      <span className="title font-semibold text-[12px] mb-2">RECENT CHATS</span>

      {loading ? (
        <p className="text-[11px] text-center">Loading Chats..</p>
      ) : (
        <div className="list flex flex-col overflow-y-auto custom-scrollbar">
          {chats.length ? (
            chats.map((chat: IChat) => (
              <LinkHelper
                href={`/dashboard/${chat._id}`}
                key={chat._id}
                title={chat.title}
                classes="text-[14px]"
              />
            ))
          ) : (
            <p>No recent chats available.</p>
          )}
        </div>
      )}

      <hr className="border-none h-[2px] bg-[#ddd] opacity-10 my-4" />
      <div className="upgrade mt-auto flex items-center justify-center gap-2 ">
        <h2 className="font-mono font-bold text-xl bg-white text-black rounded-full px-2 py-1 mr-1">
          AG
        </h2>
        <div className="texts text-[12px] flex flex-col">
          <span className="font-semibold">Upgrade to AI Gimmik</span>
          <span className="text-[#888]">
            Get unlimited access to all features
          </span>
        </div>
      </div>
    </div>
  );
};

export default ListChat;
