
class AuthService {
    constructor() {
        this.url = 'http://localhost:3001';
    }

    validateData({username, password}) {
        const errors = {};
        if (!username) {
            errors.username = 'This field is required';
        }

        if (!password) {
            errors.password = 'This field is required';
        }

        return errors;
    }

    login(body) {
        fetch(`${this.url}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(data => {
            console.log(0, data);
        })
        .catch(error => {
            console.log(1, error);
        });
    }
}

export default AuthService;
