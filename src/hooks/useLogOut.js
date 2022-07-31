import axios from '../api/axios';
import useAuth from './useAuth';

const useLogOut = () => {
    const { setAuth } = useAuth();

    const logOut = async () => {
        setAuth({});

        try {
            const res = await axios('/logout', { withCredentials: true });
            console.log(res);
        } catch (error) {
            console.error(error);
        }
    };

    return logOut;
};

export default useLogOut;
