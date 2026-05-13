import LoginView
    from '../views/login-view.vue';

import RegisterSelectionView
    from '../views/register-selection-view.vue';

import RegisterClientView
    from '../views/register-client-view.vue';

import RegisterWorkerView
    from '../views/register-worker-view.vue';


const routes= [

    {
        path: '/',
        component: LoginView,
    },

    {
        path: '/register',
        component: RegisterSelectionView,
    },

    {
        path: '/register-client',
        component: RegisterClientView,
    },

    {
        path: '/register-worker',
        component: RegisterWorkerView,
    },


];

export default routes
