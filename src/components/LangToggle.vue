<template>
  <toggle-button
    :value="true"
    v-model="toggle"
    id="localice"
    :labels="{checked: lang, unchecked: lang}"
    :color="{checked: 'blue', unchecked: 'red'}"
    :switch-color="{checked: 'yellow', unchecked: 'white'}"
    @change="changeLang"/>
</template>

<script>
export default {
  data () {
    return {
      lang: 'UAH',
      toggle: true
    }
  },
  methods: {
    async changeLang () {
      this.lang === 'UAH' ? this.lang = 'RUS' : this.lang = 'UAH'
      const lang = this.lang === 'UAH' ? 'ukr-UKR' : 'rus-RUS'
      await this.$store.dispatch('changeLocale', lang)
    }
  },
  mounted () {
    const lang = this.$store.getters.info.locale
    lang === 'ukr-UKR' ? this.toggle = true : this.toggle = false
  }
}
</script>
