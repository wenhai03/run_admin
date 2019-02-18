<template>
  <div style="width: 50%;">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip/>
      <v-axis/>
      <v-legend/>
      <v-line position="month*value" shape="hv" color="key"/>
    </v-chart>
  </div>
</template>

<script>
const DataSet = require('@antv/data-set')

const sourceData = [
  {month: '一月', '400米': 51, '200米': 125, '800米': 85},
  {month: '二月', '400米': 91, '200米': 132, '800米': 75},
  {month: '三月', '400米': 34, '200米': 141, '800米': 45},
  {month: '四月', '400米': 47, '200米': 158, '800米': 87},
  {month: '五月', '400米': 63, '200米': 133, '800米': 55},
  {month: '六月', '400米': 58, '200米': 143, '800米': 90},
  {month: '七月', '400米': 56, '200米': 176, '800米': 85},
  {month: '八月', '400米': 77, '200米': 194, '800米': 15},
  {month: '九月', '400米': 99, '200米': 115, '800米': 88},
  {month: '十月', '400米': 106, '200米': 134, '800米': 35},
  {month: '十一月', '400米': 88, '200米': 110, '800米': 95},
  {month: '十二月', '400米': 56, '200米': 91, '800米': 35}
]

const dv = new DataSet.View().source(sourceData)
dv.transform({
  type: 'fold',
  fields: ['200米', '400米', '800米'],
  key: 'key',
  value: 'value'
})
const data = dv.rows

const scale = [{
  dataKey: 'month',
  min: 0,
  max: 1
}]

export default {
  data () {
    return {
      data,
      scale,
      height: 300
    }
  }
}
</script>
