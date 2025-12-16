export type DiaryEntry = {
  payload: {
    diary: {
      message: string;
      date: string;
    };
  };
};

export type MoodEntry = {
  payload: {
    mood: {
      value: number;
      date: string;
    };
  };
};

// Panel definitions
export type PanelType = "staticText" | "staticHtml" | "diary" | "mood";

export type Panel = {
  id: string;
  title: string;
  type: PanelType;

  // User-editable TS script
  script: string;

  // Static config
  data?: {
    text?: string;
    html?: string;
  };
};
