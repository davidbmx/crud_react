
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
        return fetch(`${this.url}/api/users/login`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(this.handleErrors)
        .then(res => res.json())
        .then(data => {
            if (data.token) {
                return this.handleData(data);
            }
            return data;
        })
        .catch((error) => {
            console.log(error);
        });
    }

    handleData(data) {
        localStorage.setItem('user', JSON.stringify(data));
        return null;
    }
}

export default AuthService;
