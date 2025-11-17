import { PopulatedTypingTest, TypingTest } from "@/types/typing-test";
import api from "@/config/axios";

const BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/typing-tests`;

const postTest = async (test: TypingTest) => {
  try {
    const response = await api.post(`${BASE_URL}/`, { ...test });
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }
};

const getAllTests = async (): Promise<PopulatedTypingTest[]> => {
  try {
    const response = await api.get(`${BASE_URL}/`);
    return response.data;
  } catch (e) {
    if (e instanceof Error) {
      throw e;
    }
  }

  return [];
};

export { postTest, getAllTests };
