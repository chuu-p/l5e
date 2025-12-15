export interface EventMetadata {
  aggregate_type: "LifeDataPoint";
  aggregate_id: string; // == entryId
  sequence: number;

  source?: string;      // manual | android | google | plugin
  client?: string;      // web | mobile | script
  correlation_id?: string;
  causation_id?: string;

  recorded_at?: string; // ISO timestamp
}

