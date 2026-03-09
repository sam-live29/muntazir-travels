export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  location: string;
  category: 'nature' | 'culture' | 'adventure' | 'monuments';
}

export const galleryImages: GalleryImage[] = [
  {
    id: '1',
    url: '/images/240_F_1177250477_I728pe1U9q5nIfINKmdNzNvjJmnCJCEA.jpg',
    title: 'Dal Lake Shikara',
    location: 'Srinagar',
    category: 'nature'
  },
  {
    id: '2',
    url: '/images/240_F_1305283767_27cPMdIZ12Lxv6ZydDhDSe8DakR5DxAo.jpg',
    title: 'Gulmarg Gondola',
    location: 'Gulmarg',
    category: 'adventure'
  },
  {
    id: '3',
    url: '/images/240_F_140460454_eL1z7uTVLTtChNKl4lROMgREpFuKOQzs.jpg',
    title: 'Pahalgam Valley',
    location: 'Pahalgam',
    category: 'nature'
  },
  {
    id: '4',
    url: '/images/240_F_140942008_ijFhOJsfuJvbZ75YMBIy1lo8mTJVbxRA.jpg',
    title: 'Sonamarg Glaciers',
    location: 'Sonamarg',
    category: 'nature'
  },
  {
    id: '5',
    url: '/images/240_F_1595478347_bZyE9gCgcmw7BP8BVkhLC1uCM0u5cuEN.jpg',
    title: 'Mughal Gardens',
    location: 'Srinagar',
    category: 'culture'
  },
  {
    id: '6',
    url: '/images/240_F_1874103866_AYrfFad7ySsXdyP0386aXz7evPYFkaVJ.jpg',
    title: 'Betaab Valley',
    location: 'Pahalgam',
    category: 'nature'
  },
  {
    id: '7',
    url: '/images/240_F_206889994_0xgVzUjEhVn48Hy1ukTPsgOCcKCUwXim.jpg',
    title: 'Shankaracharya Temple',
    location: 'Srinagar',
    category: 'monuments'
  },
  {
    id: '8',
    url: '/images/240_F_236611875_ANGCk2f7TEEFwcRevQ8OdKGklDdfp1Up.jpg',
    title: 'Wular Lake',
    location: 'Bandipora',
    category: 'nature'
  },
  {
    id: '9',
    url: '/images/240_F_279806096_AYwHPGk3R89VfwI7KAAEKZA0YyVNAZyB.jpg',
    title: 'Local Culture',
    location: 'Srinagar',
    category: 'culture'
  },
  {
    id: '10',
    url: '/images/240_F_316902872_1vCzXTYdvOFt5hcoc8r8udpyCuMm4ahv.jpg',
    title: 'Mountain Peak',
    location: 'Gulmarg',
    category: 'nature'
  },
  {
    id: '11',
    url: '/images/240_F_316902896_BNL6XraHTVEz8DLfTvmBZBAN5yBewSvy.jpg',
    title: 'Serene River',
    location: 'Pahalgam',
    category: 'nature'
  },
  {
    id: '12',
    url: '/images/240_F_437917209_fZPcDkpnEpZJ2oWFpNbqYATQ39UJFcZl.jpg',
    title: 'Snowy Trail',
    location: 'Gulmarg',
    category: 'adventure'
  }
];
