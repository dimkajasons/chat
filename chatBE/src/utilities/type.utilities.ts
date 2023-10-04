export type EnumFromKeys<T> = T extends object ? T[keyof T] : never;
