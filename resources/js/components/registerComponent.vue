<template>
    <div class="container">
        <div class="row justify-content-center text-center">
            <div class="col-md-8">
                <div class="card" style="margin: 0 auto;margin-top:12%;">
                    <div class="card-body">
                        <form @submit.prevent='submitForm'>
                            <h3 class="m-5">Register</h3>
                            <div class="form-group mx-5">
                                <input type="name" class="form-control" placeholder="Name" v-model="form.name" :class="{ 'is-invalid': form.errors.has('name') }">                           
                                <has-error :form="form" field="name"></has-error> 
                            </div>
                            <div class="form-group mx-5">
                                <input type="email" class="form-control" placeholder="Email" v-model="form.email" :class="{ 'is-invalid': form.errors.has('email') }">                           
                                <has-error :form="form" field="email"></has-error> 
                            </div>
                            <div class="form-group mx-5">
                                <input type="password" class="form-control" placeholder="Password" v-model="form.password" :class="{ 'is-invalid': form.errors.has('password') }">
                                <has-error :form="form" field="password"></has-error>                            
                            </div>
                            <div class="form-group mx-5">
                                <input type="password" class="form-control" placeholder="Confirm Password" v-model="form.confirmPassword" :class="{ 'is-invalid': form.errors.has('confirmPassword') }" v-on:keyup="matchPasswords">
                                <has-error :form="form" field="confirmPassword"></has-error>                            
                            </div>
                            <div class="form-group mx-5">
                                <button :disabled="form.busy" type="submit" class="btn btn-block btn-outline-primary">Login</button>
                            </div>
                        </form>
                        <div class="alert alert-danger m-5" role="alert" v-if="errorShow">{{errorMsg}}</div>
                        <p>Already have an account, <router-link to="/">login here</router-link></p>
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
                    confirmPassword: '',
                    name: '',
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
            matchPasswords(){
                this.form.errors.clear('confirmPassword');
                setTimeout(()=>{
                    const password = this.form.password;
                    const confirmPassword = this.form.confirmPassword;
                    if(password!==confirmPassword){
                        this.form.errors.set('confirmPassword','The password does not match');
                    }
                }, 1000);
            },
            submitForm(){
                this.$Progress.start();
                const password = this.form.password;
                const confirmPassword = this.form.confirmPassword;

                if(password===confirmPassword){
                
                    let data = {
                        email: this.form.email,
                        password: password,
                        name: this.form.name
                    }
                    this.$store.dispatch('register', data)
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
                
                
                
                
                    // firebase.auth().createUserWithEmailAndPassword(email, password).catch((error)=> {
                    //     if(error){
                    //         var errorCode = error.code;
                    //         console.log(error.message);
                    //         this.$Progress.fail();
                    //         swal.fire(
                    //             'Error',
                    //             error.message,
                    //             'error'
                    //         );
                    //     } else {
                    //         this.$router.push('home');
                    //     }
                    // });
                } else {
                    this.form.errors.set('confirmPassword','The password does not match');
                    this.$Progress.fail();
                }
            },
        }
    }
</script>
