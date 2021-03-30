export default function vendor({store, next}){
    if(store.getters.getUser.user_type === "vendor"){
        return next()
    }

    return next({
        name: 'Home'
    })
}