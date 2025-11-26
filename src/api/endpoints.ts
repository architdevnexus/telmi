export const endpoints = {
  auth: {
    loginUser: 'api/login',
    signupUser: 'api/signup',
    verifyOtp: 'api/verify-otp',
    resendOtp: '/api/resend-otp',
    forgotPassword: '/api/forgot-password',
  },
  main: {
    createRoom: 'api/rooms/create',
    getRoomList: 'api/rooms/list',
    joinRoom: 'api/rooms/join',
    roominfo: 'api/rooms/participants',
    leaveRoom: 'api/rooms/leave',
    getSingleProfile: '/api/getSingleProfile',
    inviteList:"api/users/invite-list",
    sendInvite:"api/users/invite",
    profileHighlight:"api/profile/highlights",
    nextRoom :'api/rooms/next-room',
    inviteToChat:"api/rooms/invite"
  },
};
