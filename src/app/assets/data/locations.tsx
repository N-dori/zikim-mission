function makeId(length = 6) {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  var txt = ''
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length))
  }
  return txt
}
type loc = {
    id: string | null,
    lat: number,
    lng: number
    name: string
  };
  // בארי, נירים, אורים, כפר דרום, חצרים, נבטים, משמר הנגב, תקומה, שובל, משמר הנגב, גלאון, קדמה מבטחים, עלומים גבולות רביבים ובית אשל  נגבה, גת, גברעם, יד מרדכי, דורות, ניצנים, רוחמה, בארות יצחק

export const locations: loc[] = [
    {
      id: makeId(),
      lat: 31.604737581,
      lng: 34.519742921,
      name: 'זיקים'
    },
    {
      id: makeId(),
      lat: 31.4245,
      lng: 34.4926,
      name: 'בארי_(קיבוץ)'
    },
    {
      id: makeId(),
      lat:31.334940,
      lng: 34.397011,
      name: 'נירים'
    },
    {
      id: makeId(),
      lat:31.305759,
      lng: 34.526020,
      name: 'אורים'
    },
    {
      id: makeId(),
      lat:31.418301,
      lng: 34.570110,
      name: 'כפר דרום'
    },
    {
      id: makeId(),
      lat:31.239670,
      lng: 34.715050,
      name:'חצרים'
    },
    {
      id: makeId(),
      lat:31.220249,
      lng: 34.877010,
      name:'נבטים'
    },
    {
      id: makeId(),
      lat:31.36410453600858,
      lng: 34.716977835933235,
      name:'משמר הנגב'
    },
    {
      id: makeId(),
      lat:31.448524582355688,
      lng: 34.57769851234511,
      name:'תקומה'
    },
    {
      id: makeId(),
      lat: 31.41348925468616,
      lng:34.74545371809306,
      name:'שובל (קיבוץ)'
    },
    {
      id: makeId(),
      lat: 31.633185152109537,
      lng: 34.84844476566817,
      name:'גלאון'
    },
    {
      id: makeId(),
      lat:  31.242273997985663,
      lng: 34.40731378560217,
      name:'מבטחים (מושב)'
    },
    {
      id: makeId(),
      lat:31.451649792078832,
      lng: 34.51564791426969,
      name:'עלומים (קיבוץ)'
    },
    {
      id: makeId(),
      lat:31.210175038663127,
      lng: 34.46662145438365,
      name:'גבולות'
    },
    {
      id: makeId(),
      lat:31.044448778782815,
      lng: 34.72164291130312,
      name:'רביבים'
    },
    {
      id: makeId(),
      lat:31.66146521750331,
      lng: 34.68043532422413,
      name:'נגבה'
    },
    {
      id: makeId(),
      lat:31.627707206720316,
      lng: 34.79373183301319,
      name:'גת (קיבוץ)'
    },
    {
      id: makeId(),
      lat:31.590956051312126,
      lng:  34.61205017239709,
      name:'גברעם'
    },
    {
      id: makeId(),
      lat:31.58917394695533,
      lng:34.56217288970947,
      name:'יד מרדכי'
    },
    {
      id: makeId(),
      lat:31.507041963932316,
      lng:34.645784555601395,
      name:'דורות '
    },
    {
      id: makeId(),
      lat:31.717523633206163,
      lng: 34.635158879852234,
      name:'ניצנים '
    },
  
    {
      id: makeId(),
      lat:31.496751463645616,
      lng:34.70526782164692,
      name:'רוחמה '
    },
    {
      id: makeId(),
      lat:31.496751463645616,
      lng:34.70526782164692,
      name:'בארות יצחק '
    },

    // {
    //   id: makeId(),
    //   lat: 31.483611,
    //   lng: 34.533889,
    //   name: 'כפר עזה'
    // },
    // {
    //   id: makeId(),
    //   lat:31.522694,
    //   lng:34.595581,
    //   name: 'שדרות'
    // },
    // {
    //   id: makeId(),
    //   lat:31.572041,
    //   lng:34.540150,
    //   name: 'נתיב העשרה'
    // },
    // {
    //   id: makeId(),
    //   lat:31.471970,
    //   lng:34.499729,
    //   name: 'נחל עוז'
    // }
  ]