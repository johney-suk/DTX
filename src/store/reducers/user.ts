import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../types/index';

// 초기 상태
interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = action.payload;
      state.isAuthenticated = true;  // 로그인 상태로 변경
    },
    logout(state) {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
