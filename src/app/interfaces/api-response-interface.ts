export interface ApiResponse<T> {
  response: Array<T>;
  errors?: string[];
}
