import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server"; 
import dbConnect from "@/lib/mongoDb";
import Chat from "@/utils/models/chat";
import UserChats from "@/utils/models/userChats";

export async function POST(req: NextRequest) {
    await dbConnect();

    try {
    const { userId } = getAuth(req); 
    console.log('getAuth', getAuth(req))
    if (!userId) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { text } = await req.json();
    const newChat = new Chat({
        userId: userId,
        history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    const userChats = await UserChats.find({ userId: userId });

    if (!userChats.length) {
        const newUserChats = new UserChats({
            userId: userId,
            chats: [
            {
                _id: savedChat._id,
                title: text.substring(0, 40),
            },
            ],
        });

        await newUserChats.save();
    } else {
        await UserChats.updateOne(
            { userId: userId },
            {
            $push: {
                chats: {
                _id: savedChat._id,
                title: text.substring(0, 40),
                },
            },
            }
        );
    }

    return NextResponse.json({ chatId: savedChat._id }, { status: 201 });
    } catch (err) {
        console.error(err);
        return NextResponse.json(
        { message: "Error creating chat!" },
        { status: 500 }
        );
    }
}
