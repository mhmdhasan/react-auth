import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

function Users() {
    const [users, setUsers] = useState([]);
    const axiosPrivate = useAxiosPrivate();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        const getUsers = async () => {
            try {
                const res = await axiosPrivate.get('/users', { signal: controller.signal });
                console.log(res?.data);
                isMounted && setUsers(res?.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUsers();

        return () => {
            isMounted = false;
            controller.abort();
        };

        //eslint-disable-next-line
    }, []);
    return (
        <article>
            <h2>Users List</h2>
            {users?.length ? (
                <ul>
                    {users.map((user, i) => {
                        return <li key={i}>{user.username}</li>;
                    })}
                </ul>
            ) : (
                <p>No users to display</p>
            )}
        </article>
    );
}

export default Users;
