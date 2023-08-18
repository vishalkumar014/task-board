import { createContext, useEffect, useState} from 'react';
import {setAuthDetails,getAuthDetails,deleteAuthDetails} from '../utils/Storage'
const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [isLoggedIn,setLogin] = useState(false)
    useEffect(() => {
        const token = getAuthDetails('token')
        if (token && token !== undefined){
            setLogin(true)
        }
    }, []);

    useEffect(() => {
        const token = getAuthDetails('token')
        if (token){
            setLogin(true)
        }
    }, [isLoggedIn]);


    const register = async (username, password) => {    
        try {
            const response = await fetch('https://tiny-cyan-vulture-veil.cyclic.app/registerTest', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            let data = await response.json()
            if (response.ok) {
                setLogin(true)
                setAuthDetails('token',data.accessToken)
                setAuthDetails('user_details',data.chatUsername)
                setAuthDetails('board',JSON.stringify([]))
                return true
            } else {
                return {'message':'error'}
            }
        } catch (error) {
            return {'message':'error'}
        }
    };

    const login = async (username, password) => {    
        try {
            const response = await fetch('https://tiny-cyan-vulture-veil.cyclic.app/loginTest', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            let data = await response.json()
            if (response.ok) {
                setLogin(true)
                setAuthDetails('token',data.accessToken)
                setAuthDetails('user_details',data.chatUsername)
                setAuthDetails('board',JSON.stringify([]))
                return true
            } else {
                return {'message':'error'}
            }
        } catch (error) {
            return {'message':'error'}
        }
    };

    const logout = () => {
        deleteAuthDetails()
    };



    return <AuthContext.Provider value={{ isLoggedIn, login, register,logout }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
