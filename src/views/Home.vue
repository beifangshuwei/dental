<template>
  <div id="home">
    <div class="mainmenu">
      <menu-vue
        :logo="logo"
        :menus="menus"
      ></menu-vue>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      logo: {
        path: '/index',
        img: '@/assets/logo.png',
      },
      menus: [
        {
          path: '/Nearby Dental Help',
          name: 'Nearby Dental Help',
          children: [
            {
              title: 'Dental Clinics',
              path: '/Dental-Clinics',
              name: 'Dental Clinics'
            },
            {
              title: 'Dental Offices',
              path: '/Dental-Offices',
              name: 'Dental Offices'
            },
            {
              title: 'Dental Service',
              path: '/Dental-Service',
              name: 'Dental Service'
            },
            {
              title: 'Near Me',
              path: '/Near-Me',
              name: 'Near Me'
            }

          ]
          // icon: require('@/assets/image/live.png')
        },
        {
          path: '/news',
          name: 'Free Legal Advice',
          children: [
            {
              title: 'Dental Implants',
              path: '/news',
              name: 'Dental Implants'
            },
            {
              title: 'Dentures',
              path: '/news',
              name: 'Dentures'
            },
            {
              title: 'Orthodontics',
              path: '/news',
              name: 'Orthodontics'
            }, {
              title: 'Dental Insurance',
              path: '/news',
              name: 'Dental Insurance'
            }
          ]
        },
        // {
        //   path: '/Free-Legal-Advice ',
        //   name: 'Free Legal Advice ',
        //   children: [
        //     {
        //       title: 'Pro Bono Services',
        //       path: '/Pro-Bono-Services',
        //       name: 'Pro Bono Services'
        //     },
        //     {
        //       title: 'Unemployment Benefits',
        //       path: '/Unemployment-Benefits',
        //       name: 'Unemployment Benefits'
        //     },
        //     {
        //       title: 'Free Legal Aid',
        //       path: '/Free-Legal-Aid',
        //       name: 'Free Legal Aid'
        //     },{
        //       title: 'Retaining a Lawyer',
        //       path: '/Retaining-a-Lawyer',
        //       name: 'Retaining a Lawyer'
        //     },{
        //       title: 'ACLU',
        //       path: '/ACLU',
        //       name: 'ACLU'
        //     },{
        //       title: 'Types of Lawyers',
        //       path: '/Types-of-Lawyers',
        //       name: 'Types of Lawyers'
        //     },
        //   ]
        // },
      ]
    }
  },
  mounted () {
    // function createNotify (title, options) {
    //
    //   var PERMISSON_GRANTED = 'granted'
    //   var PERMISSON_DENIED = 'denied'
    //   var PERMISSON_DEFAULT = 'default'
    //
    //   if (Notification.permission === PERMISSON_GRANTED) {
    //     notify(title, options)
    //   } else {
    //     Notification.requestPermission(function (res) {
    //       if (res === PERMISSON_GRANTED) {
    //         notify(title, options)
    //       }
    //     })
    //   }
    //
    //   function notify ($title, $options) {
    //     var notification = new Notification($title, $options)
    //   }
    // }
    //
    // createNotify('测试通知', { body: '啊啊啊啊啊啊啊啊啊啊啊啊' })
    // this.init()
  },
  methods: {
    init () {
    },
    setPopClass (item) {
      // this.popclass = true;
      this.popclass = item.path
    },
    closePopClass (item) {
      this.selectName = item.name
      this.popclass = false
    }
  }

}
</script>

<style lang="less" scoped>
#home {
  width: 100%;
  display: flex;

  .mainmenu {
    width: 100%;
  }
}
</style>
