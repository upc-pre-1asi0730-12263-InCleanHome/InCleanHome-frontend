import LoginView
    from '../views/login-view.vue';

import RegisterSelectionView
    from '../views/register-selection-view.vue';

import RegisterClientView
    from '../views/register-client-view.vue';

import RegisterWorkerView
    from '../views/register-worker-view.vue';

import EditProfile from "@/User-Management/presentation/views/edit-profile.vue";


const routes= [

    {
        path: '/login',
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

    {
        path: '/edit-profile',
        component: EditProfile,
    }
];

export default routes
