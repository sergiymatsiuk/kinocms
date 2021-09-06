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
            <input class="form-check-input" type="radio" name="AllUsers" :value='true' v-model="selectAllUsers">
            <label class="form-check-label">{{'AllUsers' | localize}}</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="Select" :value='false' v-model="selectAllUsers">
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
                  style="display: none"
                  @change="addFile">
                <label for="mail" class="btn btn-info btn-sm">{{'Load' | localize}}</label>
              </div>
            </div>
            <div class="d-flex mb-3">
              <span class="mr-3">{{'ShowLoad' | localize }}</span>
              <span v-if="mailData">{{mailData.name}}</span>
              <span v-else>НАЗВА ФАЙЛА</span>
            </div>
            <div class="d-flex mb-3">
              <span class="mr-3">{{'TemplateMail' | localize }}</span>
              <span>НАЗВА ШАБЛОН</span>
            </div>
            <div class="d-flex mb-3">
              <span class="mr-3">{{'NumberMail' | localize }}{{lengthArrOfUsers}}</span>
              <span class="mr-3">{{'MailingLoading' | localize }}0</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-footer d-flex justify-content-center">
        <button type="submit" class="btn btn-info col-sm-6" @click.prevent="addMailing">{{'StartMailing' | localize}}</button>
      </div>
    </form>
  </div>
</template>

<script>
import Module from '@/module/module'

export default {
  props: {
    users: {
      type: Array,
      required: true
    },
    allUsers: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectAllUsers: true,
      mailData: null,
      name: 'Mailing'
    }
  },
  methods: {
    selectUsers () {
      this.$emit('change-select-list', 'Mail')
    },
    addFile (event) {
      this.mailData = event.target.files[0]
      console.log(this.mailData)
    },
    async addMailing () {
      console.log('Hello')
      const id = await Module.getCounter()
      console.log(id)
      const linkFile = await Module.addFile(this.name, id, this.mailData)
      console.log(linkFile)
      if (this.selectAllUsers) {
        await Module.addMailing(this.name, id, 'Mail', { ...this.allUsers, link: linkFile })
        await Module.addCounter()
      } else if (!this.selectAllUsers && this.users.length) {
        await Module.addMailing(this.name, id, 'Mail', { ...this.users, link: linkFile })
        await Module.addCounter()
      } else {
        alert('Select user!')
      }
      alert('Your message go to DB!')
      this.selectAllUsers = true
      this.SMS = ''
    }
  },
  computed: {
    lengthOfSMS () {
      return this.maxSMS - this.SMS.length
    },
    lengthArrOfUsers () {
      if (this.selectAllUsers) {
        return this.allUsers.length
      } else {
        return this.users.length
      }
    }
  },
  mounted () {
    if (this.users.length) this.selectAllUsers = false
  }
}
</script>
