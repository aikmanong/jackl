export interface IFacialDataProps {
    age: number;
    dominant_emotion: string | undefined;
    gender: string | undefined;
    dominant_race: string | undefined;
  }

export interface FacialDetails {
    verified: string | undefined;
    distance: number | undefined;
    threshold: number | undefined;
    model: string | undefined;
    similarity_metric: string | undefined;
}