export interface SyllabusData {
  [subject: string]: {
    [standard: string]: {
      [chapter: string]: string[];
    };
  };
}

export interface CheckedItems {
  items: Set<string>;
  chapters: Set<string>;
}