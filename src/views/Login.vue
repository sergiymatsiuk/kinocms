<template>
  <div class="login-page">
    <div class="login-box">
      <div class="card card-outline card-info">
        <div class="card-header text-center">
          <h2>KinoCMS</h2>
        </div>
        <div class="card-body">
          <form action="../../index3.html" method="post">
            <div class="input-group mb-3">
              <input type="email" class="form-control" placeholder="Email" v-model="email">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-envelope"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="password" class="form-control" suggested="current-password" placeholder="Password" v-model="password">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <button type="submit" class="btn btn-info btn-block" @click.prevent="clickToLogin">Вхід</button>
              </div>
            </div>
          </form>
          <p class="mt-3">
            <router-link to="/register" class="text-center text-info">Зареєструватися</router-link>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async clickToLogin () {
      if (!this.email || !this.password) {
        alert('Заповніть форму!')
        return
      }
      console.log(this.email, this.password)
      const formData = {
        email: this.email,
        password: this.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push({ path: '/' })
      } catch (e) {}
    }
  }
}
</script>
