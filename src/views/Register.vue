<template>
  <div class="register-page">
    <div class="register-box">
      <div class="card card-outline card-info">
        <div class="card-header text-center">
          <h2>KinoCMS</h2>
        </div>
        <div class="card-body">
          <form method="post">
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Name" v-model="name">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Lastname" v-model="lastname">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-user"></span>
                </div>
              </div>
            </div>
            <div class="input-group mb-3">
              <input type="text" class="form-control" placeholder="Nickname" v-model="nickname">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="far fa-user"></span>
                </div>
              </div>
            </div>
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
            <div class="input-group mb-3">
              <input type="password" class="form-control" suggested="current-password" placeholder="Retype password" v-model="copyPassword">
              <div class="input-group-append">
                <div class="input-group-text">
                  <span class="fas fa-lock"></span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-6">
                <div class="icheck-primary">
                  <input type="checkbox" id="agreeTerms" name="terms" :value="false" v-model="agree">
                  <label for="agreeTerms">
                  Я погоджуюся
                  </label>
                </div>
              </div>
            </div>
            <div class="input-group mt-3 mb-3">
              <button type="submit" class="btn btn-info btn-block" @click.prevent="clickToRegister">Зареєструватися</button>
            </div>
          </form>
          <router-link to="/login" class="text-center text-info">Я зареєстрований, хочу ввійти</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      lastname: '',
      nickname: '',
      email: '',
      password: '',
      copyPassword: '',
      agree: false
    }
  },
  methods: {
    async clickToRegister () {
      if (!this.email || !this.password) {
        alert('Введіть пошту та пароль!')
        return
      }
      if (this.password !== this.copyPassword) {
        alert('Паролі не співпадають!')
        return
      }
      if (!this.agree) {
        alert('Потрібно погодитися з правилами!')
        return
      }
      const user = {
        name: this.name,
        lastName: this.lastname,
        nickname: this.nickname,
        mail: this.email,
        password: this.password,
        address: '',
        city: '',
        dateBD: '',
        gender: true,
        lang: true,
        phone: ''

      }
      const formData = {
        email: this.email,
        password: this.password,
        user: user
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push({ path: '/' })
      } catch (e) {}
      console.log(user)
    }
  }
}
</script>
