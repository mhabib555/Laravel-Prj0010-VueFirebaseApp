<template>
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card">
                    <div class="card-header">Example Component</div>

                    <div class="card-body">
                        Component Home. {{ user.email }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                user: {},
            }
        },
        mounted() {
        },
        created(){
            axios.get('api/testFirebaseAuth')
            .then(data => console.log(data))
            .catch(err => console.log(err));
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                .then(() => {
                this.$router.push('/login')
                })
            }
        }
    }
</script>
