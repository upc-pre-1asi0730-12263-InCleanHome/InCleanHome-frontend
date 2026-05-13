export class RegisterClientUseCase {

    constructor(repository) {

        this.repository = repository;
    }

    async execute(user) {

        return await this.repository
            .registerClient(user);
    }
}