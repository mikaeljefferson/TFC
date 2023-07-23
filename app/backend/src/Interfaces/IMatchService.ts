export default interface IModel<T> {
  findAll(): Promise<T[]>;
  findById(id: T[keyof T]): Promise<T | null>;
  findByField?(field: keyof T, value: T[typeof field]): Promise<T | null>
  findAllByField?(field: keyof T, value: T[typeof field] | undefined): Promise<T[] | null>
}
