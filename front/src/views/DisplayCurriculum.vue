<template>
  <v-row no-gutters class="display-curriculum-page">
    <v-col
      md="6"
      offset-md="3"
      sm="8"
      offset-sm="2"
    >
      <v-row>
        <v-col>
          <h1 class="hover-icon-container">
            {{ selectedCurriculum.name }}
            <v-icon color="gray lighten-1 editable-icon">
              mdi-pencil-box-outline
            </v-icon>
          </h1>
          <p class="hover-icon-container">
            {{ selectedCurriculum.description }}
            <v-icon color="gray lighten-1 editable-icon">
              mdi-pencil-box-outline
            </v-icon>
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-expansion-panels multiple>
            <v-expansion-panel
              v-for="(section, i) in selectedCurriculum.sections"
              :key="i"
            >
              <v-expansion-panel-header>
                Раздел {{ i + 1 }} - {{ section.name }}
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-list
                  subheader
                  two-line
                  flat
                >
                  <v-subheader>Ресурсы</v-subheader>

                  <v-list-item-group
                    multiple
                  >
                    <v-list-item
                      v-for="(resource, j) in section.resources"
                      :key="resource + j"
                    >
                      <v-checkbox
                        color="secondary"
                        v-model="resource.isCompleted"
                        @change="toggleComplete('resources', i, j)"
                      />

                      <v-list-item-content>
                        <v-list-item-title>
                          <a v-bind:href="resource.url">
                            {{ resource.name }}
                          </a>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
                <v-list
                  subheader
                  two-line
                  flat
                >
                  <v-subheader>Проекты</v-subheader>

                  <v-list-item-group
                    multiple
                  >
                    <v-list-item
                      v-for="(project, k) in section.projects"
                      :key="project + k"
                    >
                      <v-checkbox
                        color="secondary"
                        v-model="project.isCompleted"
                        @change="toggleComplete('projects', i, k)"
                      />

                      <v-list-item-content>
                        <v-list-item-title>
                          <a v-bind:href="project.url">
                            {{ project.name }}
                          </a>
                        </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                  </v-list-item-group>
                </v-list>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'DisplayCurriculum',
  data() {
    return {
      selectedCurriculum: {}
    }
  },
  computed: {
    ...mapState(['curricula'])
  },
  methods: {
    ...mapActions(['patchType']),
    toggleComplete(type, sectionIndex, typeIndex) {
      const { sections, _id } = this.selectedCurriculum
      const section = sections[sectionIndex]
      const payload = {
        curriculum: this.selectedCurriculum,
        type,
        sectionId: section._id,
        item: section[type][typeIndex]
      }
      this.patchType(payload)
    }
  },
  mounted() {
    this.selectedCurriculum = this.curricula.find((curriculum) => {
      return curriculum._id === this.$route.params.id
    })
  }
}
</script>
