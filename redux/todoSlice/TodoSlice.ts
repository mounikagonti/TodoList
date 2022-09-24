import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface I_initialState {
  todoData: [];
  todoError: string;
  todoLoading: boolean;
}

const initialState: I_initialState = {
  todoData: [],
  todoError: "",
  todoLoading: false,
};

export const getTodoTasks: any = createAsyncThunk(
  "todo/getTodoTasks",
  async (UserID: number, thunkApi) => {
    try {
      const res = await axios.get(`${process.env.API_BASE_URL}/todoTasks`);
      return thunkApi.fulfillWithValue(res?.data);
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

export const postTodoTasks: any = createAsyncThunk(
  "todo/postTodoTasks",
  async (postInfo: any, thunkApi) => {
    try {
      const res = await axios.post(
        `${process.env.API_BASE_URL}/todoTasks`,
        postInfo
      );
      if (res?.status === 201) {
        thunkApi.dispatch(getTodoTasks());
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const deleteTodoTasks: any = createAsyncThunk(
  "todo/deleteTodoTasks",
  async (id: number, thunkApi) => {
    try {
      const res = await axios.delete(
        `${process.env.API_BASE_URL}/todoTasks/${id}`
      );
      if (res?.status === 200) {
        thunkApi.dispatch(getTodoTasks());
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const putTodoTasks: any = createAsyncThunk(
  "todo/putTodoTasks",
  async (todoInfo: any, thunkApi) => {
    try {
      const res = await axios.put(
        `${process.env.API_BASE_URL}/todoTasks/${todoInfo?.id}`,
        todoInfo
      );
      console.log("put res", res);
      if (res?.status === 200) {
        thunkApi.dispatch(getTodoTasks());
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);
export const patchTodoTasks: any = createAsyncThunk(
  "todo/patchTodoTasks",
  async (todoInfo: any, thunkApi) => {
    try {
      const res = await axios.patch(
        `${process.env.API_BASE_URL}/todoTasks/${todoInfo?.id}`,
        {
          isCompleted: todoInfo?.isCompleted,
        }
      );
      if (res?.status === 200) {
        thunkApi.dispatch(getTodoTasks());
      }
    } catch (error: any) {
      return thunkApi.rejectWithValue(error);
    }
  }
);

const TodoSlice: any = createSlice({
  name: "todo",
  initialState,
  reducers: {},
  extraReducers: {
    [getTodoTasks.pending]: (state, action) => {
      state.todoLoading = true;
    },
    [getTodoTasks.fulfilled]: (state, action) => {
      state.todoData = action.payload;
      state.todoLoading = false;
    },
    [getTodoTasks.rejected]: (state, action) => {
      state.todoLoading = false;
      state.todoError = action.payload;
    },
    [postTodoTasks.pending]: (state, action) => {
      state.todoLoading = true;
    },
    [postTodoTasks.fulfilled]: (state, action) => {
      state.todoData = action.payload;
      state.todoLoading = false;
    },
    [postTodoTasks.rejected]: (state, action) => {
      state.todoLoading = false;
      state.todoError = action.payload;
    },
    [deleteTodoTasks.pending]: (state, action) => {
      state.todoLoading = true;
    },
    [deleteTodoTasks.fulfilled]: (state, action) => {
      state.todoData = action.payload;
      state.todoLoading = false;
    },
    [deleteTodoTasks.rejected]: (state, action) => {
      state.todoLoading = false;
      state.todoError = action.payload;
    },
    [putTodoTasks.pending]: (state, action) => {
      state.todoLoading = true;
    },
    [putTodoTasks.fulfilled]: (state, action) => {
      state.todoData = action.payload;
      state.todoLoading = false;
    },
    [putTodoTasks.rejected]: (state, action) => {
      state.todoLoading = false;
      state.todoError = action.payload;
    },
    [patchTodoTasks.pending]: (state, action) => {
      state.todoLoading = true;
    },
    [patchTodoTasks.fulfilled]: (state, action) => {
      state.todoData = action.payload;
      state.todoLoading = false;
    },
    [patchTodoTasks.rejected]: (state, action) => {
      state.todoLoading = false;
      state.todoError = action.payload;
    },
  },
});

// export const { getTodoTasks } = TodoSlice.action;
export default TodoSlice.reducer;
