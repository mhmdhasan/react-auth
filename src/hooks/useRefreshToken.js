import axios from '../api/axios';
import useAuth from './useAuth';

function useRefreshToken() {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const res = await axios.get('/refresh', { withCredentials: true });
        setAuth((prev) => {
            console.log(prev);
            console.log(res?.data.accessToken);
            return {
                ...prev,
                accessToken: res?.data.accessToken,
                roles: res.data.roles,
            };
        });

        return res?.data.accessToken;
    };

    return refresh;
}

export default useRefreshToken;
