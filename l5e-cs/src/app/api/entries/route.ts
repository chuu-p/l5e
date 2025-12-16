import { NextResponse } from "next/server";
import { CreateEntryEvent } from "@/lib/events";
import clientPromise from "@/lib/mongodb";

type CreateEntryRequest = {
  eventType: string;
  occurredAt: string;
  data: unknown;
};

type CreateEntryResponse = {
  id: string;
};

/**
 * Create a new life data entry
 * @description Fetches detailed user information by ID
 * @response CreateEntryResponse
 * @body CreateEntryRequest
 * @bodyDescription CreateEntryRequest with eventType, occurredAt and data: json payload
 * @openapi
 */ export async function POST(req: Request) {
  const body = await req.json();

  const entryId = crypto.randomUUID();

  const client = await clientPromise;
  const db = client.db("l5e-es");

  const event: CreateEntryEvent = {
    event_type: "CreateEntryEvent",
    payload: {
      entryId,
      eventType: body.eventType,
      occurredAt: body.occurredAt,
      data: body.data,
    },
    metadata: {
      aggregate_type: "LifeDataPoint",
      aggregate_id: entryId,
      sequence: 0,
      source: "manual",
      client: "web",
      recorded_at: new Date().toISOString(),
    },
  };

  await db.collection("events").insertOne(event);

  return NextResponse.json({ id: entryId });
}

type GetEntryResponse = {
  event: CreateEntryEvent[];
};

/**
 * Fetches all life data entries
 * @description Fetches all life data entries
 * @response GetEntryResponse
 * @openapi
 */
export async function GET() {
  const client = await clientPromise;
  const db = client.db("l5e-es");

  const entries = await db.collection("events").find({}).toArray();

  return NextResponse.json(entries);
}
