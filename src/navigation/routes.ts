import {
  Login,
  SplashVideoScreen,
  Signup,
  ForgotPassword,
  OtpVerification,
  ResetPassword,
} from '../components/screen/auth';

import {
  FriendList,
  InviteFriend,
  Stream,
} from '../components/screen/main';

import {GoLiveTwo} from "../components/screen/main/goLiveTwo" 

import { MessagingScreen} from "../components/screen/main/chat" 

export const auhtNavigation = [
  {
    name: 'splash',
    component: SplashVideoScreen,
  },
  {
    name: 'login',
    component: Login,
  },
  {
    name: 'signup',
    component: Signup,
  },
  {
    name: 'forgot_password',
    component: ForgotPassword,
  },
  {
    name: 'opt_verification',
    component: OtpVerification,
  },
  {
    name: 'reset_password',
    component: ResetPassword,
  },
];

export const mainNavigation = [
  {
    name: 'golive',
    component: GoLiveTwo,
  },
  {
    name: 'friendlist',
    component: FriendList,
  },
  {
    name: 'invitefriend',
    component: InviteFriend,
  },
  {
    name: 'stream',
    component: Stream,
  }, 
  {
    name: 'MessagingScreen',
    component: MessagingScreen,
  },
];
