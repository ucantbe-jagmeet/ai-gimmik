import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import dbConnect from "@/lib/mongoDb";
import Chat from "@/utils/models/chat";

export async function PUT(req: NextRequest) {
    await dbConnect();

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
        const { question, answer, img } = await req.json();

        const newItems = [
        ...(question
            ? [{ role: "user", parts: [{ text: question }], ...(img && { img }) }]
            : []),
        { role: "model", parts: [{ text: answer }] },
        ];

        const updatedChat = await Chat.updateOne(
        { _id: chatId, userId },
        {
            $push: {
            history: {
                $each: newItems,
            },
            },
        }
        );

        if (updatedChat.modifiedCount > 0) {
        return NextResponse.json(
            { message: "Chat updated successfully" },
            { status: 200 }
        );
        } else {
        return NextResponse.json(
            { message: "Chat not found or no update made" },
            { status: 404 }
        );
        }
    } catch (err) {
        console.error(err);
        return NextResponse.json(
        { message: "Error updating conversation!" },
        { status: 500 }
        );
    }
}
