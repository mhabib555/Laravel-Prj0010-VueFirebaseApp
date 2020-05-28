<template>
    <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-md-8">
                <div class="card" style="margin: 0 auto;margin-top:12%;">
                    <div class="card-body">
                        <form @submit.prevent='submitForm'>
                            <h3 class="m-5">Login</h3>
                            <div class="form-group m-5">
                                <input type="email" class="form-control" placeholder="Email" v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }">                           
                                <has-error :form="form" field="email"></has-error> 
                            </div>
                            <div class="form-group m-5">
                                <input type="password" class="form-control" placeholder="Password" v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>                            
                            </div>
                            <div class="form-group m-5">
                                <button :disabled="form.busy" type="submit" class="btn btn-block btn-outline-primary">Login</button>
                            </div>
                        </form>
                        <div class="alert alert-danger m-5" role="alert" v-if="errorShow">{{errorMsg}}</div>
                        <p>Don't have an account, <router-link to="/register">Register here</router-link></p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script scoped>
    export default {
        data(){
            return {
                form : new Form({
                    email: '',
                    password: '',
                }),
                errorShow: false,
                errorMsg: '',
        
            }
        },
        mounted() {
            console.log('Component mounted.')
        }, 
        created(){
        },
        methods: {
            submitForm(){
                this.$Progress.start();
                const email = this.form.email;
                const password = this.form.password;

                this.$store.dispatch('login', { email, password })
                    .then(() => {
                        this.$Progress.finish();
                        this.$router.push('/home')
                    })
                    .catch(err => {
                        this.$Progress.fail();
                        console.log(err);
                        this.errorShow = true;
                        this.errorMsg = err.message;
                    });

                // firebase.auth().signInWithEmailAndPassword(email, password)
                // .then((result) => {
                //     console.log(result);
                //     firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
                //         console.log(idToken);
                //     }).catch(function(error) {
                //         console.log(error);
                //     });                 
                // })
                // .catch((error) => {
                //     var errorCode = error.code;
                //     if(error){
                //         console.log(error.message);
                //         this.$Progress.fail();
                //         swal.fire(
                //             'Error',
                //             error.message,
                //             'error'
                //         );
                //     } else {
                //         this.$router.push('/home');
                //     }
                // });
            },
        }
    }
</script>
