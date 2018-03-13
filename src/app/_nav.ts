export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Manage Artists',
    url: '/manageartist',
    icon: 'icon-people',
    children: [
      {
        name: 'New Artist Requests',
        url: '/manageartist/newrequests',
        icon: 'icon-people',
      },
      {
        name: 'Registered Artists',
        url: '/manageartist/registered',
        icon: 'icon-people',
      },
      {
        name: 'Rejected Artists',
        url: '/manageartist/rejected',
        icon: 'icon-people',
      },
      {
        name: 'Add New Artist',
        url: '/manageartist/addartist',
        icon: 'icon-people',
      },
    ]
  }, 
    {
    name: 'Manage Salons',
    url: '/managesalon',
    icon: 'icon-list',
          children: [
      {
    name: 'New Salon Requests',
    url: '/managesalon/newrequests',
    icon: 'icon-list',
  },
    {
    name: 'Registered Salon',
    url: '/managesalon/registered',
    icon: 'icon-list',
  },
    {
    name: 'Rejected Salon',
    url: '/managesalon/rejected',
    icon: 'icon-list',
  },
      {
    name: 'Add New Salon',
    url: '/managesalon/addsalon',
    icon: 'icon-list',
  },
      ]
  }, 

  {
    name: 'Services',
    url: '/',
    icon: 'icon-settings',
    children: [
      {
        name: 'Makeup',
        url: '/makeup',
        icon: 'icon-list',
      },
      {
        name: 'Hair',
        url: '/hair',
        icon: 'icon-list',
      },
      {
        name: 'Nails',
        url: '/nails',
        icon: 'icon-list',
      }
    ]
  }
];

export const artistnavigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'My Services',
    url: '/myservices',
    icon: 'icon-list',
  },

 /* {
    name: 'Schedule',
    url: '/schedule',
    icon: 'icon-clock',
    children: [
  */
      {
        name: 'Work Availability',
        url: '/schedule/work',
        icon: 'icon-clock',
      },
      {
        name: 'Vacations',
        url: '/schedule/vacation',
        icon: 'icon-clock',
      },
      {
        name: 'GCC Availability',
        url: '/schedule/gcc',
        icon: 'icon-clock',
      }
  /*  ]
  }
  */
  
];