export class ApiUserRepository {

    apiUrl =
        'http://localhost:3000/users';


    async login(email, password) {

        const response = await fetch(
            `${this.apiUrl}?email=${email}&password=${password}`
        );

        const users =
            await response.json();

        return users[0];
    }
        
    async findByEmail(email) {

        const response = await fetch(
            `${this.apiUrl}?email=${email}`
        );

        const users =
            await response.json();

        return users[0];
    }

    

    async registerClient(user) {

        const response = await fetch(
            this.apiUrl,
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json',
                },

                body: JSON.stringify(user),
            }
        );

        return await response.json();
    }

    async registerWorker(user) {

        const response = await fetch(
            this.apiUrl,
            {
                method: 'POST',

                headers: {
                    'Content-Type':
                        'application/json',
                },

                body: JSON.stringify(user),
            }
        );

        return await response.json();
    }
}