<script setup lang="ts">
import {ref} from "vue";

const props = defineProps<{
  title: string,
  timeFrom: string,
  timeTo: string,
  color: string,
  description: string
}>()

const collapsedEventId = ref<boolean>(false);
</script>

<template>
  <div class="event__wrapper">
    <span class="__heading">Предпросмотр</span>

    <div :class="{'event': true, '__active': collapsedEventId && description }" :style="{'border-left-color': color}">
      <div class="__info">
        <div class="__name">
          <span class="__title font-weight-medium">{{title || 'Название'}}</span>
          <span class="calendar__date-time __mth">{{`${timeFrom || '9:00'} - ${timeTo || '18:00'}`}}</span>
        </div>

        <v-btn v-if="description" class="transition-all" icon variant="plain" density="compact"
               @click="description ? collapsedEventId = !collapsedEventId : false"
        >
          <v-icon>{{collapsedEventId ? 'mdi-chevron-up' : 'mdi-chevron-down'}}</v-icon>
        </v-btn>
      </div>

      <v-scroll-y-transition>
        <div class="__short-desc" v-if="collapsedEventId">
          <span class="text__wrap">{{description}}</span>
        </div>
      </v-scroll-y-transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.event__wrapper{
  box-shadow: 0 0 2px currentColor;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 5px;
  .__heading{
    text-align: center;
    color: #777777;
    font-weight: 600;
  }
}

.event{
  margin: 5px;
  padding: 0 10px;
  border-left-width: 2px;
  border-left-style: solid;

  display: flex;
  flex-direction: column;
  background-color: inherit;
  transition: .3s;

  &.__active{
    background-color: #393838;
    border-radius: 5px;
  }

  .__info{
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    .__name{
      display: flex;
      flex-direction: column;
    }
  }
  .__short-desc{
    font-size: 14px;
  }
}
</style>