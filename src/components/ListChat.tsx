import React from "react";
import LinkHelper from "./LinkHelper";

const ListChat = () => {
  return (
    <div className="chatList flex flex-col h-full w-full">
      <span className="title font-semibold text-[12px] mb-2">DASHBOARD</span>
      <LinkHelper href="/" title="Create a new Chat" />
      <LinkHelper href="/" title="Explore" />
      <LinkHelper href="/" title="Contact" />
      <hr className="border-none h-[2px] bg-[#ddd] opacity-10 my-4" />
      <span className="title font-semibold text-[12px] mb-2">RECENT CHATS</span>
      <div className="list flex flex-col overflow-y-auto text-[14px]">
        <LinkHelper href="/" title="My chat title" />
        <LinkHelper href="/" title="My chat title" />
        <LinkHelper href="/" title="My chat title" />
        <LinkHelper href="/" title="My chat title" />
        <LinkHelper href="/" title="My chat title" />
        <LinkHelper href="/" title="My chat title" />
      </div>
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
