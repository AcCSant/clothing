import { createContext, useState, useEffect} from "react";

import {onAuthStateChangedListener, createUserDocumentFromAuth} from '../utils/firebase/firebase.utils'

//as the actaual value you want to access
export const UserContext = createContext ({
    currentUser: null,
    setCurrentUser: () => null,
});


//provider is the actual component
//.Provider wraps around any component that needs access 
//We want to store a user object, like currentUser for example, we will need to use useState
//useState will get the actual value and the setter function
//useState was initialized as null
//we will need to generate the value(obj) that will be passed
// we want to get the value from anywhere within the children, so we pass the value

export const UserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = { currentUser, setCurrentUser};

    // signOutUser();

    useEffect(()=> {
     const unsubscribe = onAuthStateChangedListener((user) => {
        if(user) {
            createUserDocumentFromAuth(user);
        }
       setCurrentUser(user);
     });
     return unsubscribe
    }, []);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

<UserProvider>
<app />

</UserProvider>