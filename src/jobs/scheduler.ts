import { scheduleJob, JobCallback, Job } from 'node-schedule';
import { ISchedulable } from '../interfaces/ISchedulable';

export class Scheduler {
    task: ISchedulable;
    job: Job;

    constructor(task: ISchedulable) {
        this.task = task;
    }

    /**
     * set the job to run in intervals of N minutes
     */
    async start(cron: string) {
        await this.task.runTask(); // run immediatly
        this.job = scheduleJob(cron, function() {
            this.task.runTask();
        });
    }
}