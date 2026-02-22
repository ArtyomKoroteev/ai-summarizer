export type SummarizeMode = "bullets" | "short" | "detailed";
export type SummarizeLanguage = "auto" | "en" | "ru";

export type SummarizeRequest = {
  text: string;
  mode: SummarizeMode;
  language: SummarizeLanguage;
};

export type SummarizeResponse = {
  title?: string;
  summary: string[];
  tags: string[];
};
