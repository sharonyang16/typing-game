import { TypingTest } from "@/types/typing-test";
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

export { postTest };
