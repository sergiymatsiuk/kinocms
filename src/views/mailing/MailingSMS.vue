<template>
  <div class="card card-info border border-secondary m-3">
    <div class="d-flex justify-content-center mb-3 mt-3">
      <h2>SMS</h2>
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
            <div class="d-flex justify-content-between mb-3">
              <span>Текст SMS</span>
              <span>{{'Symbols' | localize}}{{lengthOfSMS}}</span>
            </div>
            <div>
            <textarea
              type="text"
              class="form-control"
              id="inputSMS"
              placeholder="Текст"
              v-model="SMS"
              maxlength="50"
            />
          </div>
          </div>
          <div class="form-group col-6">
            <div class="d-flex flex-column mt-3 ml-3">
              <span>{{'NumberSMS' | localize }}{{lengthArrOfUsers}}</span>
              <span>{{'MailingLoading' | localize}} 0%</span>
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
      name: 'Mailing',
      SMS: '',
      maxSMS: 50
    }
  },
  methods: {
    selectUsers () {
      this.$emit('change-select-list', 'SMS')
    },
    async addMailing () {
      console.log('Hello')
      const id = await Module.getCounter()
      console.log(id)
      if (this.selectAllUsers) {
        await Module.addMailing(this.name, id, 'SMS', { ...this.allUsers, text: this.SMS })
        await Module.addCounter()
      } else if (!this.selectAllUsers && this.users.length) {
        await Module.addMailing(this.name, id, 'SMS', { ...this.users, text: this.SMS })
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
