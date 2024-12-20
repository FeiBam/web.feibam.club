<template>
  <div>
    <div>
      <div style="display: flex; justify-content: space-between">
        <h2 class="Creator-title">
          <a class="Creator-title-a">{{ title }}</a>
        </h2>
        <a style="cursor: pointer"
          ><font-awesome-icon :icon="['fa', 'fa-globe-africa']"></font-awesome-icon
        ></a>
      </div>
      <div>
        <div class="Creator-box">
          <div class="Creator-item">
            <a class="Creator-item-Spac">
              <img class="Creator-item-Img" :src="image_feibam" />
              FeiBam
            </a>
          </div>
          <div class="Creator-item">
            <a class="Creator-item-Spac" style="cursor: pointer"
              ><i><font-awesome-icon icon="fa fa-calendar-alt"></font-awesome-icon></i>{{ date }}</a
            >
          </div>
        </div>
        <hr />
      </div>
    </div>
    <p class="Article-text">{{ introduction }}</p>
  </div>
</template>

<script setup lang="ts">
import image_feibam from '@/assets/feibam.jpg'

const props = defineProps({
  title: String,
  date: String,
  introduction: String,
  handlerViewArticle: Function,
})
</script>
