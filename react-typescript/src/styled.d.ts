import 'styled-components';

declare module 'styled-components' {
	export interface DefaultTheme {
	  bgColor: string;
	  textColor: string;
	  accentColor: string;
	  upwardColor: string;
	  downwardColor: string;
	  mainTextColor: string;
	  cardColor: string;
		mainBgColor: string,

		sideTextColor: string,
		sideColor: string,
		sideColor2: string,

		sideOpacityAccent: string,

		sideOpacityColor: string,

		toggleColor: string;

		upColor: string;
		downColor: string;
	}
  }