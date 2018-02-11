export const navigation = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    icon: 'icon-speedometer',
  },
  {
    name: 'Artist',
    url: '/artist',
    icon: 'icon-people ',
      children: [
      {
    name: 'Artist Requests',
    url: '/artist/newrequests',
    icon: 'icon-list',
  },
    {
    name: 'Artist Approved',
    url: '/artist',
    icon: 'icon-list',
  },
      {
    name: 'Add Artist',
    url: '/artist/addartist',
    icon: 'icon-list',
  },
      ]
  }, 
    {
    name: 'Salon',
    url: '/salon',
    icon: 'icon-people ',
          children: [
      {
    name: 'Salon Requests',
    url: '/salon/newrequests',
    icon: 'icon-list',
  },
    {
    name: 'Salon Approved',
    url: '/artsalonist',
    icon: 'icon-list',
  },
      {
    name: 'Add Salon',
    url: '/salon/addsalon',
    icon: 'icon-list',
  },
      ]
  }, 
  
  {
    name: 'Emails',
    url: '/emails',
    icon: 'icon-speech',
  },
  {
    name: 'Global Properties',
		url: '/',
    icon: 'icon-settings',
	children: [
	  {
		name: 'OEM',
		url: '/oem',
		icon: 'icon-list',
	  },
	  {
		name: 'Brands',
		url: '/brand',
		icon: 'icon-list',
	  },
	  {
		name: 'Centers',
		url: '/center',
		icon: 'icon-list',
	  },
	  {
    name: 'MR',
    url: '/mr',
    icon: 'icon-list',
    },
    {
		name: 'Auto Groups',
		url: '/auto-group',
		icon: 'icon-list',
	  },
	  
	  {
		name: 'Advertising Agency',
		url: '/advertisingagency',
		icon: 'icon-list',
	  },
	  
	  {
		name: 'Contact Role',
		url: '/contactrole',
		icon: 'icon-list',
	  }
	  
	]
	}
  
];

export const staffnavigation = [
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