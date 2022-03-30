import DashBoard from './pages/DashbBoard.vue';

import LoginPage from  './pages/Login.vue';
import CategoryIndex from './pages/Category.vue';
import BookIndex from './pages/Book.vue';
function guardMyroute(to, from, next)
{
    var isAuthenticated= false;

    if(localStorage.getItem('access-token')){
        isAuthenticated = true;
    }else{
        isAuthenticated= false;
    }

    if(isAuthenticated){
        next(); // allow to enter route
    }
    else{
        next('/login'); // go to '/login';
    }
}

export const routes = [
    {
        path: '/login',
        name: 'login',
        component: LoginPage,
    },
   
    {
        name: 'dashboard',
        path: '/',
        beforeEnter : guardMyroute,
        component: DashBoard
    },
    {
        name: 'categories',
        path: '/categories',
        beforeEnter : guardMyroute,
        component: CategoryIndex

    },
    {
        name: 'books',
        path: '/books',
        beforeEnter : guardMyroute,
        component: BookIndex

    },
   

];
