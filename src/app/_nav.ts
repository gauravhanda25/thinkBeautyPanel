export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Manage Artists',
    url: '/artist',
    icon: 'icon-people',
    children: [
      {
        name: 'New Artist Requests',
        url: '/artist/newrequests',
        icon: 'icon-people',
      },
      {
        name: 'Registered Artists',
        url: '/artist/registered',
        icon: 'icon-people',
      },
      {
        name: 'Rejected Artists',
        url: '/artist/rejected',
        icon: 'icon-people',
      },
      {
        name: 'Add New Artist',
        url: '/artist/addartist',
        icon: 'icon-people',
      },
    ]
  }, 
    {
    name: 'Manage Salons',
    url: '/salon',
    icon: 'icon-list',
          children: [
      {
    name: 'New Salon Requests',
    url: '/salon/newrequests',
    icon: 'icon-list',
  },
    {
    name: 'Registered Salon',
    url: '/salon/registered',
    icon: 'icon-list',
  },
    {
    name: 'Rejected Salon',
    url: '/salon/rejected',
    icon: 'icon-list',
  },
      {
    name: 'Add New Salon',
    url: '/salon/addsalon',
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
    name: 'Calendar',
    url: '/calendar',
    icon: 'icon-calendar',
  },
  {
    name: 'Events',
    url: '/events',
    icon: 'icon-list',
  },
  {
    name: 'Invoices',
    url: '/invoices',
    icon: 'icon-list',
  }  
  
];