import {createSlice} from '@reduxjs/toolkit';
import {Constants} from '@videosdk.live/react-native-sdk';

const initialState = {
  createdRoom: {},
  streamMode: Constants.modes.CONFERENCE,
  selectedRoomAsViewer: {},
};

const stream = createSlice({
  name: 'stream',
  initialState,
  reducers: {
    setCreateRoom: (state, {payload}) => {
      state.createdRoom = payload;
    },
    setStreamMode: (state, {payload}) => {
      state.streamMode = payload;
    },
    setSelectedRoomAsViewer: (state, {payload}) => {
      state.selectedRoomAsViewer = payload;
    },
    resetStream: () => initialState,
  },
});

// Action creators are generated for each case reducer function
export const {
  setCreateRoom,
  setStreamMode,
  setSelectedRoomAsViewer,
  resetStream,
} = stream.actions;

export const streamReducer = stream.reducer;
