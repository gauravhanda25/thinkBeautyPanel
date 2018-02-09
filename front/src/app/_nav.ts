export const navigation = [
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
    icon: 'icon-notebook',
  },
  {
    name: 'Dealers',
    url: '/dealers',
    icon: 'icon-user',
  },
  {
    name: 'Artist',
    url: '/artist',
    icon: 'icon-people ',
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