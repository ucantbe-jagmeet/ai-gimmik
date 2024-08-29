'use client'
import { usePathname } from "next/navigation";

const ChatPage = () => {
  const path = usePathname();
  console.log(path)
  const id = path.split('/')[2]; // `id` is the dynamic part of the route
  return (
    <div>
      <h1>Chat ID: {id}</h1>
    </div>
  );
};

export default ChatPage;
