export class Email {

    constructor(value) {

        const regex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!regex.test(value)) {

            throw new Error(
                'Invalid email'
            );
        }

        this.value = value;
    }
}