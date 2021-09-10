<template>
  <div class="card card-info">
    <Loader v-if="loading"/>
    <div v-else>
      <MailingSMS
        v-if="!showSelectUser"
        :users="arrUsersFromSMS"
        :allUsers="allUsers"
        @change-select-list="changePopup"/>
      <MailingEmail
        v-if="!showSelectUser"
        :users="arrUsersFromMail"
        :allUsers="allUsers"
        @change-select-list="changePopup"/>
      <UserFromMalling
        v-if="showSelectUser"
        @select-user="selectUser"
      />
    </div>
  </div>
</template>

<script>
import MailingSMS from '@/views/admin/mailing/MailingSMS'
import MailingEmail from '@/views/admin/mailing/MailingEmail'
import UserFromMalling from '@/views/admin/mailing/UserFromMailing'
import Module from '@/module/module'
import Loader from '@/components/Loader'

export default {
  data () {
    return {
      name: 'Users',
      loading: true,
      showSelectUser: false,
      typeOfMail: null,
      arrUsersFromSMS: [],
      arrUsersFromMail: [],
      allUsers: []
    }
  },
  components: {
    MailingSMS, MailingEmail, UserFromMalling, Loader
  },
  methods: {
    selectUser (arrUsers) {
      if (this.typeOfMail === 'SMS') this.arrUsersFromSMS = arrUsers
      if (this.typeOfMail === 'Mail') this.arrUsersFromMail = arrUsers

      this.showSelectUser = !this.showSelectUser
    },
    changePopup (id) {
      this.showSelectUser = !this.showSelectUser
      this.typeOfMail = id
      console.log(this.typeOfMail)
    }
  },
  async mounted () {
    this.allUsers = await Module.fetchInfo(this.name)
    console.log(this.allUsers)
    this.loading = false
  }
}
</script>
