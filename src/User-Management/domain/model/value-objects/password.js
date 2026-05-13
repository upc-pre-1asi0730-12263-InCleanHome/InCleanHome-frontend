export class Password {

    constructor(value) {

        const regex =
            /^(?=.*[A-Z])(?=.*\d).{8,}$/;

        if (!regex.test(value)) {

            throw new Error(
                'Weak password'
            );
        }

        this.value = value;
    }
}