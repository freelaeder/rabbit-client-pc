<!-- src/views/goods/components/GoodsSku.vue -->
<script setup lang="ts">
// Spec: 在页面中展示的规格状态的类型
import type { Sku, Spec } from "@/types/Goods";
import bwPowerSet from "@/vendors/power-set";
// specs: 在页面中展示的规格状态
const props = defineProps<{ specs: Spec[]; skus: Sku[] }>();

// 定义规格选项 对应的 页面状态类型
interface UIStatus {
  selected: boolean;
  disabled: boolean;
}
// 创建规格选项的页面状态
function createUIStatue(specs: Spec[]) {
  // specs 真实的规格数据 ，遍历修改 产生映射数据
  // 存储 最终的映射数据
  const UIStatus: UIStatus[][] = [];
  // 遍历真实数据
  specs.forEach((spec) => {
    // 创建每一个规格种类对应的数组
    const group: UIStatus[] = [];
    spec.values.forEach(() => {
      // 创建规格选项的映射对象
      group.push({ selected: false, disabled: false });
    });

    // 将当前规格种类 添加到最终数据中
    UIStatus.push(group);
  });

  return UIStatus;
}

const res = reactive(createUIStatue(props.specs));
console.log(res);
// 用户点击更新 状态
function updateSelected(index: number, i: number) {
  // 获取用户点击的 规格
  const current = res[index][i];
  // 判断是否禁用  禁用 阻止
  if (current.disabled) return;
  // 如果选中
  if (current.selected) {
    // 取消选中
    current.selected = false;
  } else {
    // 没有选中
    // 先清空所有的选中状态 ，再更新状态
    res[index].forEach((item) => (item.selected = false));
    // 让当前选中
    current.selected = true;
  }
  // 用户选择规格后更新规格的禁用状态
  getSelected();
}
// 规格 查询对象的类型
interface PathMap {
  [key: string]: string | null;
}
// 创建 规格查询对象
function createPathMap(): PathMap {
  // 规格查询对象
  const pathMap: PathMap = {};
  // 过滤 有库存的规格组合
  props.skus
    .filter((item) => item.inventory > 0)
    .forEach((sku) => {
      // 获取当前组合名称
      const valueNames = sku.specs.map((spec) => spec.valueName);
      // 3 'max'
      // (3) ['蓝色', '中国', '10cm'] 'valueNames
      // console.log(valueNames);
      // 获取完整规格的长度
      const max = valueNames.length;
      // console.log(max, "max", valueNames, "valueNames");

      // 当前规格用户 可能选择的 所有规格
      const sets = bwPowerSet(valueNames).filter((item) => item.length > 0);

      sets.forEach((item) => {
        // 连接 数组的值  _  蓝色_日本_30cm
        const key = item.join("_");
        // console.log(key);
        if (!(key in pathMap)) {
          // 判断用户选择的是不是完整的规格
          if (item.length === max) {
            pathMap[key] = sku.id;
          } else {
            pathMap[key] = null;
          }
        }
      });
    });

  // 返回最终的规格查询对象
  return pathMap;
}

const result = createPathMap();
// 设置规格的禁用效果
function updateDisabled() {
  // 遍历页面中显示的规格数据 规格种类
  props.specs.forEach((spec, index) => {
    // 遍历页面中显示的 规格数据 规格选项
    spec.values.forEach((value, i) => {
      // 判断当前规格名称是否在 规格查询对象中
      // 不在 设置为 true
      // 在 设置为 false
      res[index][i].disabled = !(value.name in result);
    });
  });
}
updateDisabled();

//用户选择的规格名称数组
function getSelected() {
  //按照顺序 存储用户选择的规格
  const names: (string | undefined)[] = [];
  // 遍历真实的规格数据 ，从对应的映射数据中 判断是否选中
  props.specs.forEach((spec, index) => {
    const selectedIndex = res[index].findIndex((item) => item.selected);
    // 判断当前种类中 是否有选中的规格
    if (selectedIndex !== -1) {
      names[index] = spec.values[selectedIndex].name;
    } else {
      names[index] = undefined;
    }
  });
  console.log(names, "----------------00");

  return names;
}
</script>

<template>
  <div class="goods-sku">
    <dl v-for="(spec, index) in specs" :key="spec.id">
      <dt>{{ spec.name }}</dt>
      <dd>
        <template v-for="(item, i) in spec.values">
          <img
            :class="{
              selected: res[index][i].selected,
              disabled: res[index][i].disabled,
            }"
            v-if="item.picture"
            :src="item.picture"
            :alt="item.name"
            @click="updateSelected(index, i)"
          />
          <span
            @click="updateSelected(index, i)"
            :class="{
              selected: res[index][i].selected,
              disabled: res[index][i].disabled,
            }"
            v-else
          >
            {{ item.name }}
          </span>
        </template>
      </dd>
    </dl>
  </div>
</template>

<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  margin-bottom: 10px;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 5px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
