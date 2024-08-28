'use client'
import { usePathname } from "next/navigation";

const ChatPage = () => {
  const path = usePathname();
  const id = path.split('/')[2]; 
  return (
    <div>
      <h1>Chat ID: {id}</h1>
    </div>
  );
};

export default ChatPage;
