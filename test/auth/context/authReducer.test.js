import { authReducer } from "../../../src/auth/context/authReducer";
import { types } from "../../../src/auth/types/types";


describe('Pruebas en autReducer', () => { 

    test('Debe retornar el estado por defecto', () => {

        const state = authReducer( {logged: false}, { } );

        expect(state).toEqual( {logged: false}, { } );
     });

    test('Debe (login) llamar el login autenticar y establecer el user', () => {
        
        const action = {
            type: types.login,
            payload: {
                name: 'Ceci',
                id: '123'
            }
        }
        const state = authReducer( { logged: false }, action);

        expect( state ).toEqual({
            logged: true,
            user: action.payload
        });

     });

    test('Debe (logout) borrar el name del usuario y logged en false', () => {


        const state = {
            logged : true,
            user: { id:'123', name: 'Ceci tkm'}

        }
        const action = {
            type: types.logout,
        }
        
        const state2 = authReducer (state, action)
        console.log(state2);
        expect( state2 ).toEqual({
            logged: false})
     });



});