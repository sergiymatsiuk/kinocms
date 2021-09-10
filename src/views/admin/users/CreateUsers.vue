<template>
  <div class="card card-info">
    <Loader v-if="loading"/>
    <form class="form-horizontal"  v-else>
      <div class="card-body row mt-5">
        <div class="form-group column col-6">
          <div class="col row">
            <label for="inputEmail3" class="col-4 col-form-label"><h6>{{ 'NameUsers' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.name"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'LastNameUsers' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.lastName"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'NickName' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.nickname"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'Email' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.mail"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'Address' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.address"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'Password' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.password"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'CardId' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.cardId"
              />
            </div>
          </div>
        </div>
        <div class="form-group column col-6">
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'Sex' | localize }}</h6></label>
            <div class="col-8 row mt-1">
              <div class="form-check ml-3 mr-3">
                <input class="form-check-input" type="radio" name="radio1" :value='true' v-model="user.gender" >
                <label class="form-check-label">{{ 'Man' | localize }}</label>
              </div>
              <div class="form-check ml-3">
                <input class="form-check-input" type="radio" name="radio1" :value='false' v-model="user.gender">
                <label class="form-check-label">{{ 'Woman' | localize }}</label>
              </div>
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'Lang' | localize }}</h6></label>
            <div class="col-8 row mt-1">
              <div class="form-check ml-3 mr-3">
                <input class="form-check-input" type="radio" name="radio2" :value='true' v-model="user.lang" >
                <label class="form-check-label">{{ 'ua' | localize }}</label>
              </div>
              <div class="form-check ml-3">
                <input class="form-check-input" type="radio" name="radio2" :value='false' v-model="user.lang">
                <label class="form-check-label">{{ 'rus' | localize }}</label>
              </div>
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'Phone' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.phone"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{'Date' | localize}}</h6></label>
            <div class="input-group date col-8">
                <input type="date" class="form-control datetimepicker-input" v-model="user.dateBD"/>
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'City' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.city"
              />
            </div>
          </div>
          <div class="col row">
            <label class="col-4 col-form-label"><h6>{{ 'AgainPassword' | localize }}</h6></label>
            <div class="col-8">
              <input
                type="text"
                class="form-control"
                v-model="user.againPassword"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-center mb-5">
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="saveUser">{{'Save' | localize}}</button>
      </div>
    </form>
  </div>
</template>

<script>
/* eslint-disable */
import Loader from '@/components/Loader'
import Module from '@/module/module'

export default {
  components: {
    Loader
  },
  data () {
    return {
      title: 'Users',
      id: 0,
      loading: true,
      user: {
        lastName: ''
      }
    }
  },
  methods: {
    async saveUser () {
      this.loading = true
      await Module.addInfoByIdUsers(this.title, this.user, this.id)
      this.loading = false
      this.$router.push({ path: '/admin/users'})
    }
  },
  async mounted () {
    this.id = this.$route.params.id
    this.user = await Module.fetchInfoById( this.title, this.id)
    await this.$store.dispatch('changeLocale', 'rus-RUS')
    this.loading = false
  }
}
</script>