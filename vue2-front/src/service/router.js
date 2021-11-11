// import { createRouter, createWebHistory } from 'vue-router'
// vue2에서는 import vue 가져와야함.
import Vue from 'vue'
import VueRouter from 'vue-router'

import Detail from "../components/pages/Detail";
import Main from "../components/main/main.vue";
import TourList from "../components/list/TourList";
import ReviewList from "@/components/list/ReviewList";
import Review from "../components/review/ReviewWrite";
import ReviewDetail from "../components/review/ReviewDetail";
import Login from "../components/common/Login";
import Create from "../components/pages/Create";
import Register from "../components/common/Register";
import DetailPlanPage from "../components/detail/DetailPlan/DetailPlanPage";
import MyPageList from "../components/mypage/MyPageList";

import UnkownPlanDetail from "../components/detail/CreatePage/UnkownPlanDetail";
import MyPageListTest from "../components/mypage/MyPageListTest";

import AdminPage from "../components/common/admin/AdminPage";

Vue.use(VueRouter)

// 인증
// const requireAuth = () => (from, to, next) => {
//     const isAuthenticated = false
//     if (isAuthenticated) return next()
//     next('/login?returnPath=mypage')
// }

const route = [
    // 김제민
    {
        path: '/detail',
        name: 'Datail',
        component: Detail,
        // children: [
        //     {
        //         path: "create",
        //         component: Create,
        //         name: "create"
        //     }
        // ]
    },
    {
        path: '/create/:region',
        name: 'regionList',
        component: Create

    },

    // // DB 넘어오는 디테일 페이지 확인
    // {
    //     path: '/planDetail/:planId',
    //     name: 'regionList',
    //     component: UnkownDetail
    //
    // },
    // DB 넘어오는 디테일 페이지 확인
    {
        path: '/planDetail/:planId',
        name: 'plandetail',
        component: UnkownPlanDetail

    // DB 넘어오는 디테일 페이지 확인
    {
        path: '/planDetail/:region',
        name: 'regionList',
        component: Create

    },
    // // DB 넘어오는 디테일 페이지 확인
    // {
    //     path: '/userdetail/:planId',
    //     name: 'regionList',
    //     component: UnkownPlanDetail
    //
    // },
    // 김제민
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    // 김제민
    {
        path: '/detailplan',
        name: 'DetailPlanPage',
        component: DetailPlanPage
    },
    {
        path: '/tourlist',
        name: 'TourList',
        component: TourList
    },
    {
        path: '/reviewList',
        name: 'ReviewList',
        component: ReviewList
    },
    {
        path: '/review',
        name: 'Review',
        component: Review
    },
    {
        path: '/reviewDetail/:reviewId',
        name: 'ReviewDetail',
        component: ReviewDetail
    },
    {
        path: '/',
        component: Main
    },
    {
        path: '/login',
        component: Login
    },
    // 김제민
    {
        path: '/mypagelist',
        component: MyPageList
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },

    //mypage 테스트
    {
        path: '/TT',
        name: 'TT',
        component: MyPageListTest
    },

    {
        path: '/adminpage',
        name: 'AdminPage',
        component: AdminPage
    },
]

const router = new VueRouter({
    mode: 'history',
    routes: route
})

export default router