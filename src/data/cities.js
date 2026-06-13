// Indian cities positioned to roughly match India's geography on an 800x500 SVG
export const CITIES = {
  mumbai: {
    id: 'mumbai',
    name: 'Mumbai',
    label: 'BOM',
    x: 250,
    y: 290,
    type: 'port',
  },
  delhi: {
    id: 'delhi',
    name: 'Delhi',
    label: 'DEL',
    x: 340,
    y: 100,
    type: 'hub',
  },
  pune: {
    id: 'pune',
    name: 'Pune',
    label: 'PNQ',
    x: 290,
    y: 330,
    type: 'warehouse',
  },
  chennai: {
    id: 'chennai',
    name: 'Chennai',
    label: 'MAA',
    x: 450,
    y: 380,
    type: 'hub',
  },
  bangalore: {
    id: 'bangalore',
    name: 'Bangalore',
    label: 'BLR',
    x: 380,
    y: 410,
    type: 'destination',
  },
};

export const CITY_LIST = Object.values(CITIES);
