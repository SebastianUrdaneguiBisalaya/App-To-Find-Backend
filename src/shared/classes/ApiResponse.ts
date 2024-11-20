export default class ApiResponse {
  status: number;
  data: unknown;
  error: unknown;
  constructor(params: { status: number; data?: unknown; error?: unknown }) {
    this.status = params.status;
    this.data = params.data;
    this.error = params.error;
  }
}
