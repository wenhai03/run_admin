<template>
  <div style="width: 50%;">
    <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
      <v-tooltip/>
      <v-axis/>
      <v-line position="year*value"/>
      <v-point position="year*value" shape="circle"/>
    </v-chart>
  </div>
</template>

<script>
const data = [
  {year: '100米', value: 80},
  {year: '200米', value: 80.8},
  {year: '400米', value: 90.4},
  {year: '800米', value: 90.5},
  {year: '1500米', value: 70.5}
]

const scale = [{
  dataKey: 'value',
  min: 0
}, {
  dataKey: 'year',
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
