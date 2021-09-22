<template>
  <toggle-button
    :value="true"
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
      lang: 'UAH'
    }
  },
  methods: {
    async changeLang () {
      this.lang === 'UAH' ? this.lang = 'RUS' : this.lang = 'UAH'
      const lang = this.lang === 'UAH' ? 'ukr-UKR' : 'rus-RUS'
      await this.$store.dispatch('changeLocale', lang)
    }
  }
}
</script>
