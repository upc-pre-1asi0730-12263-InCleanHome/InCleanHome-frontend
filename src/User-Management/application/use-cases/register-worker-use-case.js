export class RegisterWorkerUseCase {

    constructor(repository) {

        this.repository = repository;
    }

    async execute(user) {

        return await this.repository
            .registerWorker(user);
    }
}