import {createContext, useContext, useState} from 'react'

const AuthContext = createContext({isLoggedIn: null, changeIsLoggedIn:() => {}, userId: null, changeUserId:() => {}});


function AuthProvider({children}){
    const [isLoggedIn, setIsLoggedIn] = useState(null);
    const [userId, setUserId] = useState(null);

    const changeIsLoggedIn = (stateIn) => {
        setIsLoggedIn(stateIn)
        
    }
    

    const changeUserId = (stateIn) => {
        setUserId(stateIn)
        
    }

    return(
        <AuthContext.Provider value={{isLoggedIn, changeIsLoggedIn, userId, changeUserId}}>
            {children}
        </AuthContext.Provider>
    )

}

function useAuth(){
    const context = useContext(AuthContext);
  
    if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
    }
  
    return context;
  }

export const Auth = {AuthContext, AuthProvider, useAuth}