import { createContext,useContext, useReducer, useState } from "react";
const AuthContext = createContext();
const intitalState = {
    user:null,
    isAuthenticated:false
}
const reducer = (state,action) =>{
    switch(action.type){
        case "login":
            return {...state,user: action.payload,isAuthenticated:true};
        case "logout":
            return {...state,user:null,isAuthenticated:false};
    }
}

function AuthProvider({children}){
    const [users,setUsers] = useState([]);
    const [{user,isAuthenticated},dispatch] = useReducer(reducer,intitalState);
    async function fetchUser() {
        const res = await fetch("http://localhost:8080/user")
        const data = res.json();
        setUsers(data);
    }
    function login(username,password){
        fetchUser();
        const foundUser = users.find((user) => user.username === username && user.password === password);
        if(foundUser) dispatch({type:"lgin",payload:foundUser});
        else alert("Invalid username or password");
    }
    function logout(){
        dispatch({type:"logout"});
    }

    return (<AuthProvider.Provider value={{user,isAuthenticated,login,logout}}>
            {children}
    </AuthProvider.Provider>)
}

function useAuth(){
    const context = useContext(AuthContext);
    if(context === undefined) throw new Error("AuthContext was used outside AuthProvider")
    return context;
}

export {AuthProvider,useAuth};