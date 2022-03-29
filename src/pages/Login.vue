<template>
    <div class="login-template">
        <h2>Login Form</h2>
        <form @submit.prevent="login" method="post">
            <div class="imgcontainer">
                <img src="img_avatar2.png" alt="Avatar" class="avatar">
            </div>


            <div class="container">
                <div v-if="unauthorized">
                    <span class="text-danger">{{ errors}} </span>
                </div>
                <div v-else>
                    <div v-for="(errorArray, index) in errors" :key="index">
                        <div v-for="(allErrors, index) in errorArray" :key="index">
                            <span class="text-danger">{{ allErrors}} </span>
                        </div>
                    </div>
                </div>
                <label for="uname"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="uname" v-model="form.email">

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="psw" v-model="form.password">

                <button type="submit">Login</button>
                <label>
                <input type="checkbox" checked="checked" name="remember"> Remember me
                </label>
            </div>

            <div class="container" style="background-color:#f1f1f1">
                <button type="button" class="cancelbtn">Cancel</button>
                <span class="psw">Forgot <a href="#">password?</a></span>
            </div>
        </form>
    </div>
</template>
<script>
import axios from "axios";
    export default {
        name:'LoginPage',
         data(){
        return{
            form:{
                email: '',
                password: '',

            },
            errors:[],
            unauthorized: false
        }
    },
    methods:{
        login(){
            axios.post('http://192.168.0.102:80/api/auth/login', this.form).then((response) =>{
            this.$router.push({ name: "dashboard"});
            localStorage.setItem('access-token', response.data.access_token);
            }).catch((error) =>{

                if(error.response.status == 422){
                    this.unauthorized = false;
                    this.errors = error.response.data.error;
                }
                else if(error.response.status == 401){
                    this.unauthorized = true;
                    this.errors = error.response.data.error;
                }


            })
        }
    }
}
</script>
<style scoped>
.login-template{
position: fixed;
top: 10%;
left: 10%;
margin-left: -(dialogwidth/2);
margin-top: -(dialogheight/2);

}
form {border: 3px solid #f1f1f1;}

input[type=text], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  background-color: #04AA6D;
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  cursor: pointer;
  width: 100%;
}

button:hover {
  opacity: 0.8;
}

.cancelbtn {
  width: auto;
  padding: 10px 18px;
  background-color: #f44336;
}

.imgcontainer {
  text-align: center;
  margin: 24px 0 12px 0;
}

img.avatar {
  width: 40%;
  border-radius: 50%;
}

.container {
  padding: 16px;
}

span.psw {
  float: right;
  padding-top: 16px;
}

/* Change styles for span and cancel button on extra small screens */
@media screen and (max-width: 300px) {
  span.psw {
     display: block;
     float: none;
  }
  .cancelbtn {
     width: 100%;
  }
}
</style>