<template>
  <v-form class="create-form">
    <div class="page-header">
      <h1>Создать карточку</h1>
      <v-btn color="info" @click.prevent="submit">
        Сохранить
      </v-btn>
    </div>
    <v-row>
      <v-col cols="3">
        <v-subheader>Название *</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field
          v-model="$v.petInfo.name.$model"
          :error-messages="nameErrors"
          required
          @input="$v.petInfo.name.$touch()"
          @blur="$v.petInfo.name.$touch()"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="3">
        <v-subheader>Цель</v-subheader>
      </v-col>
      <v-col cols="9">
        <v-text-field v-model="petInfo.goal" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-label>Описание</v-label>
        <v-textarea
          solo
          name="description"
          v-model="petInfo.description"
        />
      </v-col>
    </v-row>

    <FormSections
      :sections="sections"
      :addItem="addItem"
      :deleteItem="deleteItem"
      :v="$v"
      :nameErrors="sectionNameErrors"
      :sectionUrlErrors="sectionUrlErrors"
    />

    <v-row>
      <v-col cols="12">
        <v-btn color="secondary" class="black--text" @click="addSection">
          Добавить раздел
        </v-btn>
      </v-col>
    </v-row>
  </v-form>
</template>

<script>
import { required, maxLength, url } from 'vuelidate/lib/validators'
import FormSections from './FormSections.vue'

export default {
  components: {
    FormSections
  },
  props: {
    saveCurriculum: Function
  },
  data() {
    return {
      petInfo: {
        name: '',
        goal: '',
        description: ''
      },
      sections: [{
        name: '',
        goal: '',
        newResource: {
          url: '',
          name: ''
        },
        resources: [],
        newProject: {
          url: '',
          name: ''
        },
        projects: []
      }]
    }
  },
  validations: {
    petInfo: {
      name: {
        required,
        maxLength: maxLength(20)
      },
      goal: {},
      description: {}
    },
    sections: {
      $each: {
        name: {
          required,
          maxLength: maxLength(20)
        },
        goal: {},
        newResource: {
          url: {
            url
          },
          name: {}
        },
        newProject: {
          url: {
            url
          },
          name: {}
        },
        resources: {},
        projects: {}
      }
    }
  },
  computed: {
    nameErrors() {
      const errors = []
      if (!this.$v.petInfo.name.$dirty) return errors
      !this.$v.petInfo.name.maxLength && errors.push('В названии должно быть не больше 20 символов.')
      !this.$v.petInfo.name.required && errors.push('Введите название.')
      return errors
    }
  },
  methods: {
    sectionNameErrors(i) {
      const errors = []
      if (!this.$v.sections.$each.$iter[i].name.$dirty) return errors
      !this.$v.sections.$each.$iter[i].name.maxLength && errors.push('В названии должно быть не больше 20 символов.')
      !this.$v.sections.$each.$iter[i].name.required && errors.push('Введите название.')
      return errors
    },
    sectionUrlErrors(i, type) {
      const errors = []
      if (!this.$v.sections.$each.$iter[i][`new${type}`].url.$model.length) return errors
      !this.$v.sections.$each.$iter[i][`new${type}`].url.url && errors.push('Введите верный URL.')
      return errors
    },
    addSection() {
      this.sections.push({
        name: '',
        goal: '',
        newResource: {
          url: '',
          name: ''
        },
        resources: [],
        newProject: {
          url: '',
          name: ''
        },
        projects: []
      })
    },
    addItem(type, i) {
      let key = `new${type[0].toUpperCase()}${type.slice(1)}`
      const item = this.sections[i][key]

      const urlCheck = !item.url || this.$v.sections.$each.$iter[i][key].url.url
      const nameCheck = !!item.name

      if (nameCheck && urlCheck) {
        let obj = {
          name: item.name,
          url: item.url
        }
        this.sections[i][`${type}s`].push(obj)

        this.sections[i][key].name = ''
        this.sections[i][key].url = ''
      } else {
        const urlMessage = !urlCheck ? 'Введите верный URL.' : ''
        const nameMessage = !nameCheck ? 'Введите название.' : ''
        const message = `${nameMessage} ${urlMessage}`
        this.updateSnackbar({ message, show: true, variant: 'error' })
      }
    },
    deleteItem(type, sectionIndex, itemIndex) {
      this.sections[sectionIndex][type].splice(itemIndex, 1)
    },
    submit() {
      this.$v.$touch()
      if (!this.$v.$anyError) {
        this.saveCurriculum(this.petInfo, this.sections)
      }
    }
  }
}
</script>
