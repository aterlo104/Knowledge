<template>
  <v-row no-gutters class="display-curricula-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <div class="page-header">
        <h1>Все карточки</h1>
        <v-btn @click="$router.push('/curricula/create')">
          Создать новую
        </v-btn>
      </div>

      <div class="curricula-list">
        <v-card
          class="curriculum-card d-inline-block"
          outlined
          v-for="curriculum in curricula"
          :key="curriculum._id"
        >
          <v-btn class="button" outlined x-small absolute right fab color="info">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-img
          src="https://images-na.ssl-images-amazon.com/images/I/51Q62aryNKL._SY355_.jpg"
        height="200px"
          ></v-img>
          <v-card-title class="headline">
            <router-link :to="`/curricula/${curriculum._id}`">{{ curriculum.name }}</router-link>
          </v-card-title>
          
          <v-card-subtitle>
            {{ curriculum.description }}
          </v-card-subtitle>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DisplayCurricula',
  data() {
    return {}
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['getCurricula'])
  },
  mounted() {
    this.getCurricula()
  }
}
</script>
