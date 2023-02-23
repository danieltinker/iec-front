<template>
    <v-dialog v-model="dialogVisible" width="auto">
      <v-card>
        <v-btn @click="testf()">testSIDD</v-btn>
        <v-card-text>
            <v-btn color="primary" block @click="dialogVisible = false"
            >Close Dialog</v-btn>

            
            <br>
            <div style="color:blueviolet;font-size:18px">view_ID : {{ view_ID }} </div>
            
            <div>main category</div>
            <div style="color:blueviolet;font-size:18px">selected_cat_name : {{ $store.state.selected_cat_name }} </div>
            <div style="color:blueviolet;font-size:18px">selected_hq_id : {{ $store.state.selected_hq_id }} </div>
            <div>subb category</div>
            <div style="color:blueviolet;font-size:18px" v-if="$store.state.isSubCategories">sub_categories_LABEL : {{ 
                $store.state.sub_categories_json[$store.state.selected_cat_name][0].LABEL
                 }} </div>
                 <div style="color:blueviolet;font-size:18px">selected_cat_id : {{ $store.state.selected_cat_id }} </div>

          <div>
            <div style="color:blue;font-size:24px;text-align: -webkit-center;">main_params</div>
            <v-list>
              <v-list-item v-for="(value, key, index) in params" :key="key">
                <v-list-item-title>{{ key }}:</v-list-item-title>
                <v-list-item-subtitle>
                  <div class="subtitle-content" style="display: inline;">
                    
                    <v-icon
                      v-if="expandedIndex === index"
                      class="expand-icon"
                      @click="toggleExpand(index)"
                      >mdi-chevron-up</v-icon
                    >
                    <v-icon
                      v-else
                      class="expand-icon"
                      @click="toggleExpand(index)"
                      >mdi-chevron-down</v-icon
                    >
                  </div>
                  {{ value }}
                </v-list-item-subtitle>
                <v-expand-transition>
                  <div v-if="expandedIndex === index" class="expanded-content">
                    
                    <div style="display: inline;">{{ value }}</div>
                  </div>
                </v-expand-transition>
              </v-list-item>
            </v-list>







<div style="color:blue;font-size:24px;text-align: -webkit-center;">drill_down_params</div>

            <v-list>
              <v-list-item v-for="(value, key, index) in params.drill_down_params" :key="key">
                <v-list-item-title>{{ key }}:</v-list-item-title>
                <v-list-item-subtitle>
                  <div class="subtitle-content" style="display: inline;">
                    
                    <v-icon
                      v-if="expandedIndex === index"
                      class="expand-icon"
                      @click="toggleExpand(index)"
                      >mdi-chevron-up</v-icon
                    >
                    <v-icon
                      v-else
                      class="expand-icon"
                      @click="toggleExpand(index)"
                      >mdi-chevron-down</v-icon
                    >
                  </div>
                  {{ value }}
                </v-list-item-subtitle>
                <v-expand-transition>
                  <div v-if="expandedIndex === index" class="expanded-content">
                    
                    <div style="display: inline;">{{ value }}</div>
                  </div>
                </v-expand-transition>
              </v-list-item>
            </v-list>
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="dialogVisible = false"
            >Close Dialog</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>
  
  <style>
  .subtitle-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  
  .expand-icon {
    cursor: pointer;
  }
  
  .expanded-content {
    margin-top: 16px;
  }
  </style>
  
  <script>
  export default {
    props: {
      params: { type: Object, required: false },
      view_ID: { type: Number },
    },
    methods: {
      testf(){
        this.$store.state.loginStore.userInfo.sid = 'dsadsadasdsa'
      },
      testhere(item) {
        this.$refs.cardPop.dialog = true;
        this.cardData = item;
      },
      toggleExpand(index) {
        this.expandedIndex = this.expandedIndex === index ? null : index;
      },
    },
    data() {
      return {
        dialogVisible: false,
        obj: {
          name: "John Doe",
          age: 30,
          occupation: "Developer",
        },
        expandedIndex: null,
      };
    },
  };
  </script>
  