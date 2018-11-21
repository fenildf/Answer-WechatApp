import {bmob} from '@/api/bmobConfig.js'
import {Message} from 'element-ui'

import {getToken, setToken, removeToken} from '@/utils/auth'


const user = {
    state: {
        token: getToken(),
        name: '',
        avatar: '',
        roles: []
    },

    mutations: {
        SET_TOKEN: (state, token) => {
            state.token = token
        },
        SET_NAME: (statue, name) => {
            state.name = name
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles
        }
    },

    actions: {
        //登录
        Login({commit}, userInfo){
            return new Promise((resolve, reject) => {
                bmob().User.login(userInfo.username, userInfo.password).then(res => {
                    console.log(res)
                    const data = {token: 'admin'}
                    setToken(data.token)
                    commit('SET_TOKEN',data.token)
                    resolve()
                }).catch(err=>{
                    console.log(err)
                    Message.error("用户名或者密码错误")
                    reject(err);
                })
            })
        }
    }
}

export default user