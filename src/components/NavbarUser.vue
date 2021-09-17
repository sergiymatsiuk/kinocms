<template>
  <div class="wrapper z-idx">
    <nav class="navbar navbar-expand-md navbar-light navbar-white">
      <div class="container not-margin border border-info rounded">
        <router-link to='/login' class="navbar-brand ml-2">
          <span class="brand-text font-weight-700" @click.prevent="logout"><h4>KinoCMS</h4></span>
        </router-link>
        <div class="d-flex flex-column col-10">
          <div class="d-flex justify-content-end">
            <form class="form-inline ml-0 ml-md-3">
              <div class="input-group input-group-sm">
                <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
                <div class="input-group-append">
                  <button class="btn btn-navbar" type="submit">
                    <i class="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </form>
            <ul class="navbar-nav ml-5 mt-1">
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-facebook-square fa-lg"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-twitter-square fa-lg"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-vk fa-lg"></i>
                </a>
              </li>
              <li class="nav-item">
                <a href="#" class="nav-link">
                  <i class="fab fa-instagram-square fa-lg"></i>
                </a>
              </li>
            </ul>
            <div class="ml-5">
              <div class="">(048) 777-77-77</div>
              <div class="">(097) 777-77-77</div>
            </div>
            <div class="d-flex align-items-center justify-content-center col-1 ml-5">
              <router-link to="/user-page" v-if="nickname" style="color: black"><h5>{{nickname}}</h5></router-link>
              <router-link v-else to="/login" style="color: black"><h5>{{ 'Exit' | localize }}</h5></router-link>
            </div>
          </div>
          <div class="d-flex justify-content-end">
            <ul class="navbar-nav">
              <li class="nav-item">
                <router-link to="/poster" href="#" class="nav-link">{{ 'Poster' | localize }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/soon-film" class="nav-link">{{ 'Soon' | localize }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/actions" href="#" class="nav-link">{{ 'Schedule' | localize }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/cinemas" class="nav-link">{{ 'Cinemas' | localize }}</router-link>
              </li>
              <li class="nav-item">
                <router-link to="/actions" class="nav-link">{{ 'Actions' | localize }}</router-link>
              </li>
              <li class="nav-item dropdown z-idx">
                <router-link
                  to="/about-cinema"
                  id="dropdownSubMenu1"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  class="nav-link dropdown-toggle">{{ 'AboutCinema' | localize }}</router-link>
                <ul aria-labelledby="dropdownSubMenu1" class="dropdown-menu border-0 shadow">
                  <li><a href="#" class="dropdown-item">{{ 'News' | localize }}</a></li>
                  <li><a href="#" class="dropdown-item">{{ 'Advertising' | localize }}</a></li>
                  <li><a href="#" class="dropdown-item">{{ 'Cafe' | localize }}</a></li>
                  <li><a href="#" class="dropdown-item">{{ 'MobApp' | localize }}</a></li>
                  <li><a href="#" class="dropdown-item">{{ 'Contacts' | localize }}</a></li>
                </ul>
              </li>
            </ul>
            <div class="ml-5 d-flex flex-column">
              <toggle-button
                :value="true"
                id="localice"
                :labels="{checked: lang, unchecked: lang}"
                :color="{checked: 'blue', unchecked: 'red'}"
                :switch-color="{checked: 'yellow', unchecked: 'white'}"
                @change="changeLang"/>
            </div>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  props: {
    nickname: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      lang: 'UAH'
    }
  },
  computed: {
  },
  methods: {
    async changeLang () {
      this.lang === 'UAH' ? this.lang = 'RUS' : this.lang = 'UAH'
      const lang = this.lang === 'UAH' ? 'ukr-UKR' : 'rus-RUS'
      await this.$store.dispatch('changeLocale', lang)
    },
    async logout () {
      this.$router.push({ path: '/' })
      await this.$store.dispatch('logout')
    },
    clickToLogin () {
      this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
  .not-margin {
    max-width: 1000px;
    margin: 0 auto
  }
  .login {
    color: black
  }
  .z-idx {
    z-index: 10;
  }
</style>
