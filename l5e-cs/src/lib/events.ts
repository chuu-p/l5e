// Event type discriminator
export type EntryEventType =
  | "CreateEntryEvent"
  | "UpdateEntryEvent"
  | "DeleteEntryEvent";

// Base event
export interface BaseEvent<TPayload> {
  event_type: EntryEventType;
  payload: TPayload;
  metadata: EventMetadata;
}

// ---- Payloads ----

export interface CreateEntryPayload {
  entryId: string;
  eventType: string; // e.g. "diary", "mood", "steps"
  occurredAt: string; // ISO timestamp
  data: unknown; // arbitrary JSON payload
}

export interface UpdateEntryPayload {
  entryId: string;
  newData: unknown;
  reason?: string;
}

export interface DeleteEntryPayload {
  entryId: string;
  reason?: string;
}

// ---- Concrete Events ----

export type CreateEntryEvent = BaseEvent<CreateEntryPayload> & {
  event_type: "CreateEntryEvent";
};

export type UpdateEntryEvent = BaseEvent<UpdateEntryPayload> & {
  event_type: "UpdateEntryEvent";
};

export type DeleteEntryEvent = BaseEvent<DeleteEntryPayload> & {
  event_type: "DeleteEntryEvent";
};

export type EntryEvent =
  | CreateEntryEvent
  | UpdateEntryEvent
  | DeleteEntryEvent;

