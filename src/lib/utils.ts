import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export enum TempUnitEnum {
  Celcius = "C",
  Fahrenheit = "F",
}

export type TempUnit = TempUnitEnum.Celcius | TempUnitEnum.Fahrenheit;

export function getTempUnit(): TempUnit {
  return (localStorage.getItem("tempUnit") as TempUnit) || TempUnitEnum.Celcius;
}
