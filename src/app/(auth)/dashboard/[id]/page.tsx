"use client";
import NewPrompt from "@/components/NewPrompt";
import { usePathname } from "next/navigation";

const ChatPage = () => {
  const path = usePathname();
  const id = path.split("/")[2];
  return (
    <div className="chatPage relative h-full flex flex-col items-center ">
      <div className="wrapper h-[80vh] w-full overflow-y-auto flex justify-center">
        <div className="chat w-1/2 flex pt-3 flex-col gap-y-2">
          <div className="message px-5 py-3">Reply from AI</div>
          <div className="message user px-5 py-3 bg-[#2c2937] rounded-2xl max-w-[80%] self-end">
            Text message
          </div>
          <NewPrompt />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
