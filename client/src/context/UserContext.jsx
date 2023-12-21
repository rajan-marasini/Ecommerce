import { createContext } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const user = {
        name: "Admin",
        email: "admin@admin.com",
        role: "Admin",
    };

    return (
        <UserContext.Provider value={{ user }}>{children}</UserContext.Provider>
    );
};

export default UserContext;
