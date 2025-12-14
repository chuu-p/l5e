import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function GET() {
  const client = await clientPromise;
  const db = client.db("testdb");
  const collection = db.collection("messages");

  // write
  await collection.insertOne({ text: "hello world", createdAt: new Date() });

  // read
  const messages = await collection.find().toArray();

  return NextResponse.json({
    ok: true,
    messages,
  });
}
