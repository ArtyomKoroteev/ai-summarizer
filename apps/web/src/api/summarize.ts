import axios from 'axios';
import type { SummarizeRequest, SummarizeResponse } from '@repo/shared';

const API_URL = import.meta.env.VITE_API_URL;

export const summarize = async (data: SummarizeRequest): Promise<SummarizeResponse> => {
  const response = await axios.post(`${API_URL}/ai/summarize`, {
    ...data,
  });
  return response.data;
}