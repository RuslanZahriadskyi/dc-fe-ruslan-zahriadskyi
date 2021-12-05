interface IResponse {
  air_date: string;
  characters: string[];
  created: string;
  episode: string;
  id: number;
  name: string;
  url: string;
}

interface ApiError {
  code: number;
  error: string;
}

export type { IResponse, ApiError };
