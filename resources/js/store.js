import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        status: '',
        token: localStorage.getItem('token') || '',
        user : JSON.parse(localStorage.getItem('user')) || {}
    },
    mutations: {
        auth_request(state){
            state.status = 'loading'
        },
        auth_success(state, userTokenObj){
            state.status = 'success'
            state.token = userTokenObj.idToken
            state.user = userTokenObj.userProfile
        },
        auth_error(state){
            state.status = 'error'
        },
        logout(state){
            state.status = ''
            state.token = ''
        },

    },
    actions: {
        login({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                firebase.auth().signInWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then( idToken => {
                        //saving data
                        const userInfo = result.user;
                        localStorage.setItem('token', idToken)
                        axios.defaults.headers.common['Authorization'] = "Bearer " + idToken;

                        fbDb.collection("users").doc(userInfo.uid).get().then((doc) => {
                            const userProfile = doc.data();
                            localStorage.setItem('user', JSON.stringify(userProfile));
                            commit('auth_success', {userProfile, idToken})
                            resolve(idToken)
                        }).catch(error => {
                            commit('auth_error')
                            localStorage.removeItem('token')
                            reject(error)
                        })

                    }).catch(function(error) {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    });                 
                }).catch(function(error) {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(error)
                });                 
            })
        },
        register({commit}, user){
            return new Promise((resolve, reject) => {
                commit('auth_request')
                firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
                .then((result) => {
                    firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then( idToken => {
                        //saving data
                        const userInfo = result.user;
                        localStorage.setItem('token', idToken)
                        axios.defaults.headers.common['Authorization'] = "Bearer " + idToken;
                        const userProfile = {
                            name: user.name,
                            uid: userInfo.uid,
                            email: user.email,
                        };
                        localStorage.setItem('user', JSON.stringify(userProfile));
                        fbDb.collection("users").doc(userInfo.uid).set(userProfile)
                        .then(() => {
                            commit('auth_success', {userProfile, idToken})
                            resolve(idToken)
                        }).catch(error => {
                            commit('auth_error')
                            localStorage.removeItem('token')
                            reject(error)
                        })
                    }).catch(function(error) {
                        commit('auth_error')
                        localStorage.removeItem('token')
                        reject(error)
                    });                 
                }).catch(function(error) {
                    commit('auth_error')
                    localStorage.removeItem('token')
                    reject(error)
                });                 
            })
        },
        logout({commit}){
            return new Promise((resolve, reject) => {
                commit('logout')
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            })
        },
        fetchUser({ commit }, user) {
            if (user) {
            } else {
                commit("auth_error");
                localStorage.removeItem('token')
                delete axios.defaults.headers.common['Authorization']
                resolve()
            }
        }
    },
    getters : {
        isLoggedIn: state => !!state.token,
        authStatus: state => state.status,
        user: state => state.user,
    }
})