import {
  createAsyncThunk,
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";
import type { AIPayload } from "../type/AIPayload";
import axios from "axios";

interface ChatState {
  messages: AIPayload[];
  loading: boolean;
}

export const fetchMessageByConversationId = createAsyncThunk(
  "chat",
  async (_, { rejectWithValue }) => {}
);
export const submitRequest = createAsyncThunk(
  "ask",
  async (
    { history, text }: { history: AIPayload[]; text: string },
    { rejectWithValue, dispatch }
  ) => {
    dispatch(setUserSubmit(text));
    const formattedHistory = history.map(
      ({ role, text }: { role: string; text: string }) => ({
        role,
        parts: [{ text }],
      })
    );
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent",
      { contents: formattedHistory },
      {
        headers: { "Content-Type": "application/json" },
        params: { key: "AIzaSyDC7W0zDLfunzMLqAIIIcM-J90b-J9fFd8" },
      }
    );
    if (!response.data) rejectWithValue("Gửi yêu cầu không thành công");
    const data = response.data.candidates[0].content.parts[0].text.trim();
    console.log("Respone:" + data);
    return data;
  }
);

const initialState: ChatState = {
  messages: [],
  loading: true,
};

const chatSlice = createSlice({
  name: "chat-reducer",
  initialState,
  reducers: {
    setUserSubmit(state, action: PayloadAction<string>) {
      state.messages = [
        ...state.messages,
        { role: "user", text: action.payload },
      ];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitRequest.pending, (state, action) => {})
      .addCase(submitRequest.fulfilled, (state, action) => {
        state.messages = [
          ...state.messages,
          { role: "model", text: action.payload },
        ];
      })
      .addCase(submitRequest.rejected, (state, action) => {});
    builder
      .addCase(fetchMessageByConversationId.pending, (state) => {})
      .addCase(fetchMessageByConversationId.fulfilled, (state) => {})
      .addCase(fetchMessageByConversationId.rejected, (state) => {});
  },
});

export const { setUserSubmit } = chatSlice.actions;
export default chatSlice.reducer;
