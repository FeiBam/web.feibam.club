<template>
  <div>
    <div style="display: flex; justify-content: space-between">
      <h2 @click="ViewArticle" class="Creator-title">
        <a class="Creator-title-a">{{ Title }}</a>
      </h2>
      <slot name="head"></slot>
    </div>
    <div>
      <div class="Creator-box">
        <div class="Creator-item">
          <a class="Creator-item-Spac">
            <img class="Creator-item-Img" :src="require('@/assets/feibam.jpg')" />
            {{ Creator.Name }}
          </a>
        </div>
        <div class="Creator-item">
          <a class="Creator-title-a" style="cursor: pointer" @click="ViewArticleByDate"
            ><font-awesome-icon icon="fa fa-calendar-alt"></font-awesome-icon>{{ Creator.Date }}</a
          >
        </div>
      </div>
      <hr />
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseHead',
  props: {
    Title: {
      type: String,
      default: '我可是标题！',
    },
    Creator: {
      type: Object,
      default: () => ({
        Name: 'null',
        Date: '0000-00-00',
      }),
    },
    ArticleID: {
      Type: Number,
    },
  },
  methods: {
    ViewArticle() {
      console.log(this.ArticleID)
    },
    ViewArticleByDate() {
      console.log(this.Creator.Date)
    },
  },
}
</script>
