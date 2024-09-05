import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongoDb";
import Chat from "@/utils/models/chat";
import UserChats from "@/utils/models/userChats";

export async function GET(req: NextRequest) {
    await dbConnect();
    console.log('api called');
    
    const { userId } = getAuth(req);

        if (!userId) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }
            const { searchParams } = new URL(req.url);
            const chatId = searchParams.get("id");

            if (!chatId) {
            return NextResponse.json(
                { message: "Chat ID not provided" },
                { status: 400 }
            );
            }

        try {
        const chat = await Chat.findOne({ _id: chatId, userId });

        if (!chat) {
        return NextResponse.json({ message: "Chat not found" }, { status: 404 });
        }

        return NextResponse.json(chat, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
        { message: "Error fetching chat!" },
        { status: 500 }
        );
    }
}
