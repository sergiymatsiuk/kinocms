<template>
  <div>
    <MailingSMS />
    <MailingEmail />
  </div>
</template>

<script>
import MailingSMS from '@/views/mailing/MailingSMS'
import MailingEmail from '@/views/mailing/MailingEmail'

export default {
  components: {
    MailingSMS, MailingEmail
  }
}
</script>
