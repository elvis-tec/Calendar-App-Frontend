export const getEnvVariables = () => {
    //import.meta.env; for testing
    return {
       //...import.meta.env, For testing
       VITE_API_URL: import.meta.env.VITE_API_URL, //For production
    }
}
