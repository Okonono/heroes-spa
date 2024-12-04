import { act, useReducer} from "react"
import { AuthContext, authReducer } from './index'
import { types } from "../types/types";


//seccion 15 mantener el usuario activo
const init = ()=> {
    const user = JSON.parse( localStorage.getItem('user') );
    return {
        logged: !!user,
        user: user,

    }

}

export const AuthProvider = ({ children }) => {

   // const [ auth, setAuth ] = useState(); lo reemplaza x un reducer
const [ authState, dispatch ] = useReducer( authReducer, {} , init );

   const login = ( name = '' ) =>{

    const user = { id:'ABC', name }
    const action = {
        type: types.login,
        payload: user
    }
    //seccion 15 mantener el usuario activo
    localStorage.setItem('user' , JSON.stringify( user ));

    dispatch(action);
   }

   const logout = ()=> {
    localStorage.removeItem('user');
    const action = { type: types.logout }
    dispatch(action);
   }


    return  (

        <AuthContext.Provider value= {{
            ...authState,
            login: login,
            logout: logout
        }}>
            {children}
        </AuthContext.Provider>


    )

}