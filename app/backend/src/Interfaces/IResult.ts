export default interface Result<T> {
  status: number;
  data: T | {
    message: string;
  };
}
