import { types } from "../../../src/auth/types/types";
//CANDADO
describe('Pruebas sobre types', () => { 

    test('debe regresar estos types', () => {

        expect( types.login ).toBe("[Auth] Login");
        expect( types.logout).toBe("[Auth] Logout");

        expect(types).toEqual({
            login: '[Auth] Login',
            logout:'[Auth] Logout'
        })

 });
})