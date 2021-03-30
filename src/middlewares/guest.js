export default function guest({store, next}){
    if(!store.getters.isAuthenticated){
        return next()
    }
    return next({
        name: 'Home'
    })
}