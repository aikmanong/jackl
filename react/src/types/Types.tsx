export interface IFacialDataProps {
  age: number;
  dominant_emotion: string | undefined;
  gender: string | undefined;
  dominant_race: string | undefined;
}

export type AvailableFeatures =
  | "home"
  | "analyze"
  | "verify"
  | "find"
  | "streaming";

export interface FacialDetails {
  verified: string;
}

//New Type for Distance
export interface FindFaceDetails {
  distance: number;
  image: string;
}
export type currentLoadingState =
  | "not-loading"
  | "loading"
  | "loading-error"
  | "not-verified"
  | "verified";
