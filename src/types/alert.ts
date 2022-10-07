import { IAlertTypes } from "@/components/Alert/alert.style";

export enum Time {
  SUPERLONG = 10000,
  LONG = 5000,
  SHORT = 1000,
  MEDIUM = 3000,
  INFINITE = 0,
}

export interface IAlert {
  time: Time;
  message?: string;
  link?: string;
  linkMessage?: string;
  notificationType: IAlertTypes;
}
