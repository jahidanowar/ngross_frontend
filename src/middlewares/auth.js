export default function auth({store, next}){
    if(store.getters.isAuthenticated){
        return next();
    }

    return next({
        name: 'Login'
    })
}