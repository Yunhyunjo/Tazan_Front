<template>
  <div>
    <div class="main">
      <div class="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light"
           data-src="https://photo.coolenjoy.net/data/editor/1707/Bimg_20170718024901_dhqkcnyb.png"
           data-srcset="https://photo.coolenjoy.net/data/editor/1707/Bimg_20170718024901_dhqkcnyb.png 650w,
                  https://photo.coolenjoy.net/data/editor/1707/Bimg_20170718024901_dhqkcnyb.png 1300w"
           data-sizes="(min-width: 650px) 650px, 100vw" uk-img>
        <div class="container px-4 px-lg-5">
          <div class="text-center text-white">
            <h1 class="display-4 fw-bolder">
              <span id="userName">{{ userName }}</span>님의 여행 계획표
            </h1>
            <br>

            <div class="wrap">
              <div class="sub_title">
                <b-form-input
                    v-model="text"
                    size="sm"
                    class="w-25 p-3 mb-1 text-black"
                    placeholder="여행 제목 ( 공백 포함 1자 이상 45자 이하)"
                ></b-form-input>
              </div>
            </div>
          </div>
        </div>
      </div>

      <h1 class="uk-heading-line"><span></span></h1>

      <div class="save_plan">
        <div class="sub_main">
          <v-card class="left_container">
            <div class="left">
              <div class=""
              >
                <h2 class="region_f">
                  {{ this.region }}
                </h2>

              </div>
              <date-picker
                  class="datepicpick"
                  v-model="mydate"
                  type="date"
                  :lang="lang"
                  range
                  confirm
                  format="YYYY-MM-DD"
                  placeholder="Select date range"
              >
                여행일자
              </date-picker>
              <div>

              </div>
            </div>
            <div>
            </div>
            <br>
            <br>
            <v-card
                class="left_container_img"
            >
              <img
                  max-height="300"
                  max-width="300"
                  :src="require(`/src/assets/yacht_tazan_logo.png`)"
              >
            </v-card>
          </v-card>
          <v-card class="thr_main">
            <!--            -->
            <v-col
                class="thr_main_sub"
                v-for="(plan,index) in totalPlan"
                :key="index"
            >
              <div class="thr_main_day">
                <v-avatar
                    class="thr_main_day_list"
                >
                  {{ index + 1 }} 일차
                </v-avatar>
              </div>

              <DayList
                  id="scrollDiv"
                  :daylist="plan"
                  class="thr_main_list"
                  :index1="index"
                  @tourListDelete="DeleteList"
              >
              </DayList>
            </v-col>

            <div class="uk-margin">
              <b-button pill variant="outline-primary" type="submit" @click="dayList_add">일정 추가</b-button>
              &nbsp;
              <b-button pill variant="outline-danger" type="submit" @click="dayList_delete">일정 삭제</b-button>
            </div>
          </v-card>

          <v-card class="right">
            <div class="recom_f">추천 장소</div>
            <div>
              <RecomPlace
                  :recomList="recomList"
                  @recived="planList_add"
                  class="right_list"/>
            </div>
          </v-card>
        </div>
      </div>
      <div class="save_plan_button">
        <b-button variant="primary" @click="SavePlan">Save</b-button>
      </div>
    </div>
  </div>
</template>

<script>
import RecomPlace from "./RecomPlace";
import DayList from "./DayList";
import DatePicker from 'vue2-datepicker';
import 'vue2-datepicker/index.css';
import 'vue2-datepicker/locale/ko';

export default {
  name: "Unkown",
  data() {
    return {
      lang: {
        formatLocale: {
          firstDayOfWeek: 1,
        },
        monthBeforeYear: false,
      },
      recomList: [],
      totalPlan: [[]],
      totalPlan_tour: [[]],
      cnt: 0,
      userName: '',
      userID: '',
      mydate: '',
      datetime: '',
      date: '',
      range: '',
      text: '',

    }
  },
  methods: {
    planList_add(result) {
      if (this.mydate == '') {
        alert('날짜를 먼저 선택해주세요')
      } else {
        this.totalPlan[this.cnt].push(result) // object
        this.totalPlan_tour[this.cnt].push(result.tourId)

      }
    },
    dayList_add() {
      if (this.mydate == '') {
        alert('날짜를 먼저 선택해주세요')
      } else {
        var test = new Date(this.mydate[0])
        test.setDate((test.getDate() + (this.cnt) + 1))
        if (test > this.mydate[1]) {
          alert('일정 길이를 초과합니다!')
        } else {
          this.cnt += 1
          this.totalPlan.push([])
          this.totalPlan_tour.push([])
        }
      }
    },
    dayList_delete() {
      if (this.totalPlan_tour.length<=1) {
        alert('일정은 1일차부터 시작입니다.!')
      } else {
        this.cnt -= 1
        this.totalPlan.pop()
        this.totalPlan_tour.pop()

      }
    },
    DeleteList(listObject) {
      this.totalPlan[listObject.index1].splice(listObject.index2, 1)
      this.totalPlan_tour[listObject.index1].splice(listObject.index2, 1)
    },
    SavePlan() {
      var calc=(new Date(this.mydate[1])-new Date(this.mydate[0]))/86400000
      if (calc+1<this.totalPlan_tour.length){
        alert("일정의 길이가 총 일정 수 보다 많습니다!")
      }
      else if (calc+1>this.totalPlan_tour.length){
        alert("일정의 길이가 총 일정 수 보다 적습니다!")
      }
      else if(this.totalPlan_tour.length<1){
        alert("일정이 입력되지 않았습니다!")
      }
      else {
        let planVO = {};
        planVO.userID = localStorage.getItem("id");

        planVO.region = this.region;
        planVO.startDate = this.mydate[0];
        planVO.endDate = this.mydate[1];

        planVO.planTitle = this.text;
        planVO.planList = this.totalPlan_tour;
        if (confirm("저장 하시겠습니까?")) {
          this.$axios.post('/api/user/plan/create', planVO,{
            headers : {
              'Content-Type': 'application/json; charset=utf-8'
            }
          }).then(request => {
            if (request.status === 200) {

              this.$router.push(`/planDetail/${request.data}`)
            }
          }).catch(function () {
            alert("제목 길이는 공백포함 1자이상 45자이하 입니다!");
            // alert("제목 길이는 공백포함 1자이상 45자이하 입니다!");
          })
        }
      }
    },
  },
  components: {

    DayList,
    RecomPlace,
    DatePicker
  },
  props: {
    region: String,
  },
  created() {
    this.userName = localStorage.getItem('nickname')
    this.userID = localStorage.getItem('id')

    this.$axios.get(`/api/user/search/${this.region}`)
        .then(response => {
          this.recomList = response.data;
        })
        .catch(err => {
          if (err.response.status == 403) {
            alert("로그인 후 이용해주시기 바랍니다.");
            this.$router.push('/login')
          }
        })
  },
  mounted() {
  }
}
</script>
<style scoped>
.region_f {
  font-size: 5em;
  font-weight: 1000 !important;
}
.recom_f {
  font-weight: 1000 !important;
}
.text-black {
  text-align: left;
}
.w-25 {
  width: 35% !important;
}
.p-3 {
  padding: 1rem !important;
}
.sub_main {
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  /*  */
  border: 1px solid black;
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
  justify-content: space-around;
  flex: 1;
}

.thr_main_day {
  font-size: 1rem;
  font-weight: 700;
  color: #237380;
  display: flex;
  position: relative;

}

.thr_main_day_list {
  color: #5dc9dd;
  font-size: 18px !important;
  font-weight: 900 !important;
  margin-right: auto;
  text-align: center;
  width:100%
}

.sub_title {
  display: flex;
  justify-content: center;

}

.main {
  text-align: center;
}

.datepicpick {
  width: 95%;
  height: 100%;
}

.left_container {
  display: flex;
  width: 25%;
  height: 100%;
  flex-direction: column;
  /**/
  /*border: 1px solid black;*/
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
}

.left {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;
  /**/
  /*border: 1px solid black;*/
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
}

.thr_main {
  display: flex;
  flex-direction: column;
  width: 65%;
  height: 100%;
  /**/
  /*border: 1px solid black;*/
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
}

.right {
  width: 20%;
  height: 100%;
  /**/
  /*border: 1px solid black;*/
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
}

.right_list {
  width: 100%;
  height: 100%;
  /*justify-content: left;*/

}


/*리스트*/
.thr_main_sub {
  display: flex;
  width: 100%;
}

.thr_main_day {
  display: flex;
  width: 100px;
  text-align: center;
  flex-wrap: nowrap;
  /*justify-content: space-around;*/
  font-size: 1rem;
  font-weight: 700;
  color: #5dc9dd;
  display: flex;
  position: relative;
}

.thr_main_list {
  overflow-x: auto;
  display: flex;
  width: 100%;
  text-align: left;
  height: inherit;
  /**/
  /*border: 0px 0px 1px 1px solid black;*/
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
  box-shadow: 0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%);

}

.DayList {
  overflow: hidden;
}

.thr_main_list::-webkit-scrollbar {
  height: 5px;
}

.thr_main_list::-webkit-scrollbar-track {
  background: #f1f1f1;
}

.thr_main_list::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 5px;
}

.thr_main_list::-webkit-scrollbar-thumb:hover {
  background: #555;
}

.save_plan {
  display: flex;
  /*width: 1000px;*/
  justify-content: space-between;
  /**/
  /*border: 1px solid black;*/
  padding: 0.25em;
  margin: 0.25em;
  border-radius: 0.25em;
}

</style>