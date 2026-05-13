export class LoginUseCase {

    constructor(repository) {

        this.repository = repository;
    }

    async execute(email, password) {

        return await this.repository
            .login(email, password);
    }
}