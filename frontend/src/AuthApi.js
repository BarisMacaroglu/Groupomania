import {createContext} from 'react';

const AuthApi = createContext({ auth: false, setAuth: () => {} });

export default AuthApi;