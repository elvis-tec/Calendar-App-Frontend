import calendarApi from '../../src/api/calendarApi';


describe('Test on CalendarApi', () => {
    
    test('must have default settings', () => {

        // console.log(calendarApi);
        // console.log(process.env);
        expect( calendarApi.defaults.baseURL ).toBe( process.env.VITE_API_URL );
    
    });

    test('must have the x-token in the header of all requests', async() => {

        const token = 'ABC-123-XYZ';
        localStorage.setItem('token', token );
        const res = await calendarApi.get('/auth');

        expect(res.config.headers['x-token']).toBe( token );
        
    });

});