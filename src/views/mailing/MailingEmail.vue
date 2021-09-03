<template>
  <div class="card card-info border border-secondary m-3">
    <div class="d-flex justify-content-center mb-3 mt-3">
      <h2>E-mail</h2>
    </div>
    <form class="form-horizontal">
      <div class="card-body">
        <div class="form-group d-flex justify-content-between align-items-center">
          <div class="col-sm-5">
            <span>{{'SelectUsers' | localize}}</span>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="AllUsers" :value='true' v-model="allUsers">
            <label class="form-check-label">{{'AllUsers' | localize}}</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="Select" :value='false' v-model="allUsers">
            <label class="form-check-label">{{'Select' | localize}}</label>
          </div>
          <button type="submit" class="btn btn-info col-sm-3" @click.prevent="selectUsers">{{'SelectUsersList' | localize}}</button>
        </div>
        <div class="form-group d-flex">
          <div class="form-group column col-6">
            <div class="d-flex">
              <span class="mr-5">{{'LoadMail' | localize}}</span>
              <div>
                <input
                  type="file"
                  id="mail"
                  ref="input1"
                  style="display: none">
                <label for="mail" class="btn btn-info btn-sm">{{'Load' | localize}}</label>
              </div>
            </div>
            <div class="d-flex mb-3">
              <span class="mr-3">{{'ShowLoad' | localize }}</span>
              <span>НАЗВА ФАЙЛА</span>
            </div>
            <div class="d-flex mb-3">
              <span class="mr-3">{{'TemplateMail' | localize }}</span>
              <span>НАЗВА ШАБЛОН</span>
            </div>
            <div class="d-flex mb-3">
              <span class="mr-3">{{'NumberMail' | localize }}{{users.length}}</span>
              <span class="mr-3">{{'MailingLoading' | localize }}0</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <button type="submit" class="btn btn-info col-sm-6">{{'StartMailing' | localize}}</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      allUsers: true,
      SMS: '',
      maxSMS: 50,
      users: []
    }
  },
  methods: {
    selectUsers () {
      this.$router.push({ path: '/admin/mailing-select-user' })
    }
  },
  computed: {
    lengthOfSMS () {
      return this.maxSMS - this.SMS.length
    }
  }
}
</script>
