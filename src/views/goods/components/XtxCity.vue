<!-- src/components/XtxCity.vue -->
<script setup lang="ts">
import type { Status } from "@/types/Status";
import axios from "axios";
// 提示用户操作的文字
const props = withDefaults(
  defineProps<{ placeholder?: string; fullLocation: string }>(),
  {
    placeholder: "请选择收货地址",
  }
);
// 声明当前组件
const emit = defineEmits<{
  (e: "onChanged", addressCode: AddressCode): void;
}>();

const selectCity = useVModel(props, "fullLocation");

// 控制弹框的显示隐藏
const visible = ref(false);
// 用于储存城市选择组建的外层元素
const target = ref<HTMLDivElement>();
// 声明城市数据类型
interface City {
  code: string;
  level: number;
  name: string;
  areaList: City[];
}
// 声明城市数据
let cachedCities: City[] = [];
// 城市数据的加载状态
const loading = ref<Status>("idle");
const cities = ref<City[]>([]);
//控制弹框显示
async function show() {
  visible.value = true;
  // 如果城市数据不存在
  if (cachedCities.length === 0) {
    // 更新城市数据加载状态
    loading.value = "loading";
    // 发送请求获取城市数据
    let response = await axios.get(
      "https://yjy-oss-files.oss-cn-zhangjiakou.aliyuncs.com/tuxian/area.json"
    );
    // 存储城市数据
    cachedCities = response.data;
    // 更新城市数据加载状态
    loading.value = "success";
  }
  cities.value = cachedCities;
}
// 控制弹框隐藏
function hide() {
  visible.value = false;
}
// 控制弹框切换
function toggle() {
  visible.value ? hide() : show();
}

// 在城市选择组件外部 点击时隐藏该组件
onClickOutside(target, hide);
interface AddressCode {
  provinceCode: string;
  cityCode: string;
  countyCode: string;
}
interface AddressName {
  provinceName: string;
  cityName: string;
  countyName: string;
}
// 存储省市区 编码
const addressCode: Partial<AddressCode> = {};
// 存储省市区 名字
const addressName: Partial<AddressName> = {};

function updateCities(code: string, level: number, name: string) {
  // 更新城市内容
  cities.value = cities.value.find((city) => city.code === code)?.areaList!;
  // 匹配城市级别
  switch (level) {
    case 0:
      // 省
      addressCode.provinceCode = code;
      addressName.provinceName = name;
      break;
    case 1:
      //市
      addressCode.cityCode = code;
      addressName.cityName = name;
      break;
    case 2:
      //区
      addressCode.countyCode = code;
      addressName.countyName = name;
      // console.log(addressCode);
      // 通过自定义事件 触发 传递 选择的  Required 必选
      emit("onChanged", addressCode as Required<AddressCode>);
      selectCity.value =
        addressName.provinceName! +
        "  " +
        addressName.cityName! +
        "   " +
        addressName.countyName!;
      hide();
  }
}
</script>

<template>
  <div class="xtx-city" ref="target">
    <div class="select" @click="toggle" :class="{ active: visible }">
      <span class="placeholder" v-if="!selectCity">{{ placeholder }}</span>
      <span class="value" v-else>{{ selectCity }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="option" v-if="visible">
      <template v-if="loading === 'success'">
        <span
          @click="updateCities(i.code, i.level, i.name)"
          class="ellipsis"
          v-for="i in cities"
          :key="i.code"
        >
          {{ i.name }}
        </span>
      </template>
      <template v-if="loading === 'loading'">
        <div class="loading"></div>
      </template>
    </div>
  </div>
</template>

<style scoped lang="less">
.xtx-city {
  display: inline-block;
  position: relative;
  z-index: 400;
  .select {
    border: 1px solid #e4e4e4;
    height: 30px;
    padding: 0 5px;
    line-height: 28px;
    cursor: pointer;
    &.active {
      background: #fff;
    }
    .placeholder {
      color: #999;
    }
    .value {
      color: #666;
      font-size: 12px;
    }
    i {
      font-size: 12px;
      margin-left: 5px;
    }
  }
  .option {
    width: 542px;
    border: 1px solid #e4e4e4;
    position: absolute;
    left: 0;
    top: 29px;
    background: #fff;
    min-height: 30px;
    line-height: 30px;
    display: flex;
    flex-wrap: wrap;
    padding: 10px;
    > span {
      width: 130px;
      text-align: center;
      cursor: pointer;
      border-radius: 4px;
      padding: 0 3px;
      &:hover {
        background: #f5f5f5;
      }
    }
    .loading {
      height: 290px;
      width: 100%;
      background: url(@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
