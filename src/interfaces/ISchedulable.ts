export interface ISchedulable {
    runTask(): Promise<any>;
}