import dayjs from 'dayjs'
const utils = {
  today (params) {
    params['sdt'] = dayjs().format('YYYY-MM-DD 00:00')
    params['edt'] = dayjs().add(1, 'day').format('YYYY-MM-DD 00:00')
  },
  week (params) {
    let weekStart = dayjs().date() - dayjs().day();
    params['sdt'] = dayjs().set('day', weekStart).format('YYYY-MM-DD 00:00')
    params['edt'] = dayjs().set('day', weekStart - 7).format('YYYY-MM-DD 00:00')
  },
  month (params) {
    params['sdt'] = dayjs().startOf('month').format('YYYY-MM-DD 00:00');
    params['edt'] = dayjs().startOf('month').add(1, 'month').format('YYYY-MM-DD 00:00');
  },
  year (params) {
    params['sdt'] = dayjs().startOf('year').format('YYYY-MM-DD 00:00');
    params['edt'] = dayjs().startOf('year').add(1, 'year').format('YYYY-MM-DD 00:00');
  }
}
export default utils
