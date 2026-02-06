
export interface ImagePrompts {
  portuguese: string;
  english: string;
  json: string;
}

export interface GenerationConfig {
  temperature: number;
  maxOutputTokens: number;
}

export interface CharacterConfig {
  style: string;
  hair: string;
  eyes: string;
  outfit: string;
  primaryColor: string;
}

export interface CharacterImages {
  face: string;
  halfBody: string;
  fullBody: string;
}
