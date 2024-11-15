// 1. Динамический импорт для ленивой загрузки страниц
const AuthPage = () => import("../components/pages/AuthPage.vue");
const ReportErrorPage = () => import("../components/pages/ReportErrorPage.vue");
const MainPage = () => import("../components/pages/MainPage.vue");
const ProfilePage = () => import("../components/pages/ProfilePage.vue");
const SubjectPage = () => import("../components/pages/SubjectPage.vue");
const DetailSubjectPage = () => import("../components/pages/DetailSubjectPage.vue");
const StudyMainPage = () => import("../components/pages/StudyMainPage.vue");
const GroupsPage = () => import("../components/pages/GroupsPage.vue");
const StudyGroupsPage = () => import("../components/pages/StudyGroupsPage.vue");
const DetailGroupPage = () => import("../components/pages/DetailGroupPage.vue");
const DetailGroupStudentsPage = () => import("../components/pages/DetailGroupStudentsPage.vue");
const ProfileUserPage = () => import("../components/pages/ProfileUserPage.vue");
const AddUserPage = () => import("../components/pages/AddUserPage.vue");
const DetailGroupSubjectsPage = () => import("../components/pages/DetailGroupSubjectsPage.vue");
const UsersPage = () => import("../components/pages/UsersPage.vue");
const CreateTimetablePage = () => import("../components/pages/CreateTimetablePage.vue");
const StoreErrorsPage = () => import("../components/pages/StoreErrorsPage.vue");
const AddSubjectPage = () => import("../components/pages/AddSubjectPage.vue");
const AddGroupPage = () => import("../components/pages/AddGroupPage.vue");
const DeleteUserPage = () => import("../components/pages/DeleteUserPage.vue");
const DeleteGroupPage = () => import("../components/pages/DeleteGroupPage.vue");
const HomePage = () => import("../components/pages/HomePage.vue");
const InstitutionsPage = () => import("../components/pages/InstitutionsPage.vue");
const AccessSystemsPage = () => import("../components/pages/AccessSystems/AccessSystemsPage.vue");
const AccessSystemsDetailPage = () => import("../components/pages/AccessSystems/AccessSystemDetailPage.vue");
const AccessSystemDisplayPage = () => import("../components/pages/AccessSystems/AccessSystemDisplayPage.vue");

// 2. Шаблоны метаданных
const requiresAuth = { requiresAuth: true };
const moderatorOnly = { requiresAuth: true, allowedRoles: ['Модератор'] };
const teacherOrModerator = { requiresAuth: true, allowedRoles: ['Преподаватель', 'Модератор'] };
const developer = { requiresAuth: true, allowedRoles: ['developer'] };

// 3. Группировка маршрутов по схожим путям и ролям
const groupRoutes = [
    {
        path: '/groups', 
        component: GroupsPage,
        name: 'Groups',
    },
    {
        path: '/groups/study-groups',
        component: StudyGroupsPage,
        name: 'StudyGroups',
    },
    {
        path: '/groups/study-groups/:id',
        component: DetailGroupPage,
        name: 'DetailGroup',
    },
    {
        path: '/groups/study-groups/:id/students',
        component: DetailGroupStudentsPage,
        name: 'DetailGroupStudents',
    },
    {
        path: '/groups/study-groups/:id/subjects',
        component: DetailGroupSubjectsPage,
        name: 'DetailGroupSubjects',
    },
].map(route => ({ ...route, meta: teacherOrModerator }));

const AccessSystemsRoutes = [
    {
        path: '/access-systems',
        component: AccessSystemsPage,
        name: 'AccessSystems',
    },
    // {
    //     path: '/access-systems/:id', // первый id может заменмить на название колледжа, не знаю как лучше
    //     component: AccessSystemsDetailPage,
    //     name: 'AccessSystemsDetail',
    //     meta: { requiresAuth: true, allowedRoles: ['developer', 'Модератор']},
    // },
    {
        path: '/access-systems/:id/detail', // первый id может заменмить на название колледжа, не знаю как лучше
        component: AccessSystemsDetailPage,
        name: 'AccessSystemsDetail',
        meta: { requiresAuth: true },
    },
    {
        path: '/access-systems/:id/display', // первый id может заменмить на название колледжа, не знаю как лучше
        component: AccessSystemDisplayPage,
        name: 'AccessSystemDisplay',
        meta: { requiresAuth: true, allowedRoles: ['developer', 'Модератор']},
    }
];

const routes = [
    {
        path: '/login',
        component: AuthPage,
        name: 'Login',
        meta: { requiresGuest: true },
    },
    {
        path: '/',
        component: HomePage,
        name: 'Home',
    },
    {
        path: '/report-error',
        component: ReportErrorPage,
        name: 'ReportError',
    },
    {
        path: '/institutions',
        component: InstitutionsPage,
        name: 'Institutions',
    },
    {
        path: '/store-errors',
        component: StoreErrorsPage,
        name: 'Errors',
        meta: moderatorOnly,
    },
    {
        path: '/main',
        component: MainPage,
        name: 'Main',
        meta: requiresAuth,
    },
    {
        path: '/study-main', 
        component: StudyMainPage,
        name: 'StudyMain',
        meta: teacherOrModerator,
    },
    {
        path: '/profile',
        component: ProfilePage,
        name: 'Profile',
        meta: requiresAuth,
    },
    {
        path: '/subject/:id',
        component: SubjectPage,
        name: 'Subject',
        meta: requiresAuth,
    },
    {
        path: '/detail-subject/:id',
        component: DetailSubjectPage,
        name: 'DetailSubject',
        meta: requiresAuth,
    },
    {
        path: '/profile/:id',
        component: ProfileUserPage,
        name: 'ProfileUser',
        meta: teacherOrModerator,
    },
    {
        path: '/add-user',
        component: AddUserPage,
        name: 'AddUser',
        meta: moderatorOnly,
    },
    {
        path: '/users',
        component: UsersPage,
        name: 'Users',
        meta: moderatorOnly,
    },
    {
        path: '/timetable/create',
        component: CreateTimetablePage,
        name: 'CreateTimetable',
        meta: moderatorOnly,
    },
    {
        path: '/add-subject',
        component: AddSubjectPage,
        name: 'AddSubject',
        meta: moderatorOnly,
    },
    {
        path: '/add-subject/:id',
        component: AddSubjectPage,
        name: 'UpdateSubject',
        meta: moderatorOnly,
    },
    {
        path: '/add-group',
        component: AddGroupPage,
        name: 'AddGroup',
        meta: moderatorOnly,
    },
    {
        path: '/user/:id/delete',
        component: DeleteUserPage,
        name: 'DeleteUser',
        meta: moderatorOnly,
    },
    {
        path: '/groups/study-groups/:id/delete',
        component: DeleteGroupPage,
        name: 'DeleteGroup',
        meta: moderatorOnly,
    },
    // сгруппированные маршруты для групп
    ...groupRoutes,
    ...AccessSystemsRoutes,
];

export default routes;
