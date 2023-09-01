import {LIGHT_MODE, DARK_MODE} from '../type';

const lightModeState = {
  //indicator
  is_light: 1,

  // background
  background_main: '#FFFFFF',
  background_main_lite: '#F8F9FE',
  background_text_input: '#F7F8FA',

  //shadow
  shadow_main: '#000000',

  //border
  border_main: '#000000a3',

  //icon
  icon_light: '#D7DCE0',

  //font
  font_main: '#000000',
  font_mainLite: '#36394B',
  font_white: '#FFFFFF',
  font_second: '#DBDBDB',
  font_litegray: '#9597A0',
  font_litegray1: '#2B2F41',
  font_litegrayunselected: '#80828D',

  //colors
  color_blue: '#1251FD',
  color_blue1: '#484C9B',
  color_darkBlue: '#474a9d',
  color_green: '#8dc0a6',
  
  color_red: '#FF0000',
  color_gray: 'gray',
  //util
  transparent: 'transparent',
};

const darkmodeModeState = {
  //indicator
  is_light: 0,

  // background
  background_main: '#000000',
  background_text_input: '#F7F8FA',

  //shadow
  shadow_main: '#FFFFFF',

  //border
  border_main: '#FFFFFFa3',

  //icon
  icon_light: '#D7DCE0',
  //font
  font_main: '#FFFFFF',
  font_white: '#000000',
  font_second: '#DBDBDB',

  //colors
  color_blue: '#1251FD',
  color_green: '#8dc0a6',
  color_red: '#FF0000',

  color_darkBlue: '#474a9d',
  color_gray: 'gray',

  //util
  transparent: 'transparent',
};

export default function theme(state = lightModeState, action) {
  switch (action.type) {
    case LIGHT_MODE:
      return lightModeState;
    case DARK_MODE:
      return darkmodeModeState;
    default:
      return lightModeState;
  }
}
