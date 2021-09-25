<template>
  <div class="m-3">
    <div class="booked">
      <p class="booked-list">{{ 'BookedTicket' | localize }}
        <span>{{bookedPlace}}</span>
      </p>
      <p class="booked-list">{{ 'YourOrder' | localize }}
        <span class="booked-list-box">
          {{ 'Tickets' | localize }}
          <span class="booked-list-box-item">{{tickets}}</span>
          {{ 'Sum' | localize }}
          <span class="booked-list-box-item">{{ticketsSum}}</span>
          </span>
      </p>
    </div>
    <hall-places
      :places="places"
      @change-places="changePlaces"/>
    <div class="booked-btn-box">
      <button type="submit" class="btn btn-info px-5" @click.prevent="bookTickets">{{'Save' | localize}}</button>
    </div>
  </div>
</template>

<script>
import HallPlaces from '@/components/session/HallPlaces'

export default {
  props: {
    session: {
      type: Object,
      required: true
    }
  },
  components: {
    HallPlaces
  },
  data () {
    return {
      tickets: 0
    }
  },
  methods: {
    changePlaces (places) {
      this.session.places = places
      this.tickets = 0
      places.forEach(el => {
        el.forEach(item => {
          if (item) this.tickets = this.tickets + 1
        })
      })
      this.tickets = this.tickets - this.bookedPlace
    },
    bookTickets () {
      this.$emit('change-session', this.session)
    }
  },
  computed: {
    bookedPlace () {
      let book = 0
      const places = [...this.session.places]
      places.forEach(el => {
        el.forEach(item => {
          if (item) book++
        })
      })
      return book
    },
    ticketsSum () {
      return this.tickets * this.session.price
    },
    places () {
      return this.session.places
    }
  },
  mounted () {
  }
}
</script>

<style scoped>
  .booked {
    margin-top: 50px;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
  .booked-list {
    padding-left: 50px;
    text-transform: uppercase;
    font-weight: 700;
    color: lightslategrey;
  }
  .booked-list-box {
    padding: 10px;
    border: solid 5px gold;
  }
  .booked-list-box-item {
    margin-right: 15px;
    color: maroon;
  }
  .booked-btn-box {
    display: flex;
    justify-content: center;
  }
</style>
