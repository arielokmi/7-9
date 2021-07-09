import { useEffect, useState } from "react";

export const useGithubUser = (userName) => {
    const [user,setUser] = useState(null);

    // check if the userName exists
    useEffect(() => {
        if (localStorage.getItem(userName)) {
            setUser(userName);
        } else {
            setUser(null);
        }
    }, [userName]);
    
    return user;
}