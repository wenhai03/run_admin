const menu = [
  {
    'entity': {
      'children': [],
      'name': 'm_plate',
      'icon': 'icon-shouye',
      'alias': '工作台',
      'id': 2,
      'url': '/admin'
    }
  },
  {
    'entity': {
      'children': [],
      'name': 'm_report',
      'icon': 'icon-baobiao',
      'alias': '报表管理',
      'id': 3,
      'url': '/admin/report'
    }
  },
  {
    'children': [
      {
        'entity': {
          'children': [],
          'name': '/admin/bodyTest',
          'icon': 'icon-huiyuanka',
          'alias': '体侧列表',
          'id': 25,
          'url': '/admin/testList'
        }
      }
    ],
    'entity': {
      'name': 'm_member',
      'icon': 'icon-huiyuanguanli',
      'alias': '体测管理',
      'id': 1
    }
  },
  {
    'children': [
      {
        'entity': {
          'children': [],
          'name': 'm_course_1_manage',
          'icon': 'icon-liebiao',
          'alias': '课程列表',
          'id': 1,
          'url': '/admin/courseList'
        }
      },
      {
        'entity': {
          'children': [],
          'name': 'm_course_1_plan',
          'icon': 'icon-paiqi',
          'alias': '训练类型设置',
          'id': 2,
          'url': '/admin/trainSet'
        }
      }
    ],
    'entity': {
      'name': 'm_course_1',
      'icon': 'icon-xunlianyingguanli',
      'alias': '课程管理',
      'id': 5
    }
  },
  {
    'children': [
      {
        'entity': {
          'children': [],
          'name': '/admin/user',
          'icon': 'icon-huiyuanka',
          'alias': '用户管理',
          'id': 10,
          'url': '/admin/user'
        }
      }
    ],
    'entity': {
      'name': 'm_user',
      'icon': 'icon-huiyuanguanli',
      'alias': '用户管理',
      'id': 8
    }
  },
  {
    'children': [
      {
        'entity': {
          'children': [],
          'name': 'm_site_site',
          'icon': 'icon-changguan',
          'alias': '场馆列表',
          'id': 11,
          'url': '/admin/venue'
        }
      },
      {
        'entity': {
          'children': [],
          'name': 'm_site_operate',
          'icon': 'icon-yunying',
          'alias': '设备佩戴设置',
          'id': 12,
          'url': '/admin/drawSet'
        }
      }
    ],
    'entity': {
      'name': 'm_site',
      'icon': 'icon-julebu',
      'alias': '俱乐部管理',
      'id': 9
    }
  }
]

export default menu
