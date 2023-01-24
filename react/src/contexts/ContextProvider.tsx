import {
    createContext,
    useState,
    useContext,
    Component,
    ReactElement,
} from "react";

type ContextProviderProps = {
    children: ReactElement;
};

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});

export const ContextProvider = ({ children }: ContextProviderProps) => {
    const [user, setUser] = useState();
    const [token, _setToken] = useState();

    const setToken = (token, []) => {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    };

    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
