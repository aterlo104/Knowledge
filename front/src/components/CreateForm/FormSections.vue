<template>
  <v-row>
    <v-col cols="12">
      <div class="curricula-list">
        <v-card
          outlined
          v-for="(section, k) in v.sections.$each.$iter"
          :key="section.name + k"
          class="section-card"
        >
          <v-card-title class="headline">Раздел #{{ parseInt(k) + 1 }}</v-card-title>
          
          <v-card-text>
            <v-row no-gutters>
              <v-col cols="3">
                <v-subheader>Название *</v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="section.name.$model"
                  :error-messages="nameErrors(parseInt(k))"
                  required
                  @input="section.name.$touch()"
                  @blur="section.name.$touch()"
                />
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-subheader>Цель</v-subheader>
              </v-col>
              <v-col cols="9">
                <v-text-field
                  v-model="section.goal.$model"
                />
              </v-col>
            </v-row>
            <v-card class="resources-card">
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      placeholder="Введите название ресурса"
                      v-model="section.newResource.name.$model"
                      @keyup.enter="addItem('resource', k)"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      placeholder="Введите ссылку"
                      :error-messages="sectionUrlErrors(parseInt(k), 'Resource')"
                      v-model="section.newResource.url.$model"
                      @keyup.enter="addItem('resource', k)"
                      @input="section.newResource.url.$touch()"
                      @blur="section.newResource.url.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-btn @click="addItem('resource', k)" color="secondary" class="black--text">
                      Сохранить ссылку
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="section.resources.$model.length">
                  <v-col cols="12">
                    <v-card tile>
                      <template v-for="(resource, m) in section.resources.$model">
                        <v-list-item
                          :key="resource + m"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{ resource.name }}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon>
                              <v-icon color="gray lighten-1" @click="deleteItem('resources', k, m)">
                                mdi-close
                              </v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider
                          v-if="m + 1 < section.resources.length"
                          :key="m"
                        />
                      </template>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
            <v-card class="projects-card">
              <v-card-text>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      placeholder="Введите название проекта"
                      v-model="section.newProject.name.$model"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-text-field
                      placeholder="Введите ссылку"
                      v-model="section.newProject.url.$model"
                      :error-messages="sectionUrlErrors(parseInt(k), 'Project')"
                      @keyup.enter="addItem('project', k)"
                      @input="section.newProject.url.$touch()"
                      @blur="section.newProject.url.$touch()"
                    />
                  </v-col>
                </v-row>
                <v-row no-gutters>
                  <v-col cols="12">
                    <v-btn @click="addItem('project', k)" color="secondary" class="black--text">
                      Сохранить проект
                    </v-btn>
                  </v-col>
                </v-row>
                <v-row v-if="section.projects.$model.length">
                  <v-col cols="12">
                    <v-card tile>
                      <template v-for="(project, m) in section.projects.$model">
                        <v-list-item
                          :key="project + m"
                        >
                          <v-list-item-content>
                            <v-list-item-title>{{ project.name }}</v-list-item-title>
                          </v-list-item-content>
                          <v-list-item-action>
                            <v-btn icon>
                              <v-icon color="gray lighten-1" @click="deleteItem('projects', k, m)">
                                mdi-close
                              </v-icon>
                            </v-btn>
                          </v-list-item-action>
                        </v-list-item>
                        <v-divider
                          v-if="m + 1 < section.projects.length"
                          :key="m"
                        />
                      </template>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    sections: Array,
    addItem: Function,
    deleteItem: Function,
    v: Object,
    nameErrors: Function,
    sectionUrlErrors: Function
  }  
}
</script>
