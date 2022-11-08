<template>
  <div :style="'background-color:' + getCurrentTheme.cyber_status.color_1" style="position: relative">
    <div v-if="doneFetching">

      <div class="updateDate">
        <p v-if="lastUpdateTimestamp">
          <strong>נכון לתאריך:</strong>
          {{ lastUpdateTimestamp }}
        </p>
      </div>

      <div class="container">
        <!-- title -->
        <div class="statusBox">
          <h1 style="font-family: almoni-ultralight; font-size: 22px">
            {{ remoteUsers }}
          </h1>
        </div>
      </div>
    </div>

    <div class="loader" v-else>
        <div class="loader" v-if="!isErrorMsg">
            <v-progress-circular
            indeterminate
            color="purple"
            ></v-progress-circular>
        </div>
        <h1 style="font-family: almoni-bold;font-size:23px" v-else>  {{errorMSG}} </h1>
    </div>  


  </div>
</template>

<script>

export default {
  props: {
    params:{type:Object,required:false},
    view_ID:{type:Number},
  },
  async created() {
      await this.$myApi("tikshuv/metric/query/system/remote_users")
  .then((response) => {
      if (response) {
        // get the data
        console.log(response.data[0].last_update_timestamp);
        this.lastUpdateTimestamp = response.data[0].last_update_timestamp;

      if (response.data[0].metrics_data.length > 0) {
        this.remoteUsers = response.data[0].metrics_data[0].details.value;
      }
      this.doneFetching = true
      }
  })
  .catch((err) => {this.errorMSG = "אין מידע"
  console.log(err)});
  },
  computed:{
    isErrorMsg(){
            return this.errorMSG.length !== 0;
        }
  },
  data() {
    return {
      doneFetching:false,
      errorMSG:"",
      lastUpdateTime: "",
      lastUpdateTimestamp: true,
      remoteUsers: 0,
      
    };
  },
};
</script>


<style scoped>
.loader{
    height: 400px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    align-self: center;
}
.container {
  position: absolute;
  top: 30%;
}
.updateDate {
  height: 300px;
  margin-top: 16px;
  font-family: almoni-light;
  font-size: 16px;
  text-align: center;
  margin-bottom: 0px;
}

.statusBox {
  background-color: #ff9900;
  text-align: center;
  line-height: 50px;
  margin: auto;
  width: 50%;
  margin-top: 44px;
  width: 180px;
  height: 50px;
}

.statusBox h1 {
  color: #ffffff;
  font-size: 18px;
  text-align: center;
  justify-content: center;
  justify-items: center;
}
</style>