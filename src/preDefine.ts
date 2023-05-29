import { StyleSheet } from 'react-native'

export enum DtPickMode {
  DATE = "date",
  TIME = "time",
}

export enum DtPickTarget {
  START_DT,
  END_DT
}

// 发射状态类型 发射成功 / 发射失败
export type LaunchStatus = {
  launchSucc: boolean;
  launchFail: boolean;
};

// api 返回launch格式
export interface Launch {
  links: {
      patch: {
          small: string;
          large: string;
      };
      reddit: {
          campaign: any;
          launch: string;
          media: any;
          recovery: any;
      };
      flickr: {
          small: any[];
          original: any[];
      };
      presskit: any;
      webcast: string;
      youtube_id: string;
      article: any;
      wikipedia: string;
  };
  success: boolean;
  name: string;
  date_utc: string;
  id: string;
  details:string,
}

//  通用样式
export const commonStylesa = {
  flexRow:'row items-center',
  fliterButton:'py-1',
  button:'row justify-center items-center rounded-md w-60 h-34 bg-orange-200 dark:bg-white',
  textL:'py-1 text-lg dark:text-white',
  textS:'py-1 text-sm dark:text-white',
  textM:'py-1 text-base dark:text-white'
}
