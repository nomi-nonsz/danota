export type BooleanProperties<T> = {
  [K in keyof T]: T[K] extends boolean ? K : never
}[keyof T];