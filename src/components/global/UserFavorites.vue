<template>
    <div dir="rtl" class="mb-10 container">
    <div>
        <v-btn v-for="item in getUserFavData" :key="item.template_id"
              color="#935287"
              outlined
              fab
              class="ml-4 story"
              @click="openQuickView(item)"
              ><img v-if="item.icon != ''" :src="getImg(item.icon)" /></v-btn>
        
    </div>
    <QuickViewPopup v-if="$store.state.quick_view" :mydata="data" @closeQuickView="closeQuickView" />
    </div>
</template>


<script>
import QuickViewPopup from './QuickViewPopup.vue';
export default {
    methods: {
        openQuickView(data){
            console.log(data);
            this.data = data
            this.$store.state.quick_view = !this.$store.state.quick_view
        },
        closeQuickView(){
            this.$store.state.quick_view = !this.$store.state.quick_view

        },
        getImg(img) {
            try {
                return require(`@/assets/FavBar/${img}.svg`);
            }
            catch (e) {
                //defaultImage
                return require("@/assets/FavBar/bar.svg");
            }
        }
    },
    data: () => ({
        data:"",
        QuickViewState:false,
        getUserFavData: [{ template_id: 11, parameters: "Dsadsa", icon: "bar", state: "", title: "test1" }, { template_id: 22, parameters: "", icon: "pie", state: "", title: "test2" }, { template_id: 33, parameters: "Dsadsa", icon: "bar", state: "" }, { template_id: 44, parameters: "Dsadsa", icon: "bar", state: "" }]
    }),
    components: { QuickViewPopup }
}
</script>

<style scoped>

.container {
  background-color: rgb(244, 244, 244);
  display: flex;
  overflow-x: auto;
  height: 80px;
  width: auto;
}

.container div:first-child {
  display: flex;
  align-self: center;
}
.favContainer {
  direction: rtl;
  right: 0;
  display: grid;
}

.story {
  box-shadow: none;
  height: 58px;
  width: 58px;
}

.favoriteLabels {
  font-family: almoni;
  size: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  /* word-wrap: break-word; */
  text-overflow: ellipsis;
}
</style>