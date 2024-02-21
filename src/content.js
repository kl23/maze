const graph = [
  {
    "areaId": 1,
    "areaName": "Area 1",
    "destinations": [
      {
        "targetAreaId": 6,
        "color": "Blue"
      },
      {
        "targetAreaId": 5,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 2,
    "areaName": "Area 2",
    "destinations": [
      {
        "targetAreaId": 13,
        "color": "Green"
      },
      {
        "targetAreaId": 3,
        "color": "Blue"
      },
      {
        "targetAreaId": 10,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 3,
    "areaName": "Area 3",
    "destinations": [
      {
        "targetAreaId": 11,
        "color": "Green"
      },
      {
        "targetAreaId": 2,
        "color": "Blue"
      },
      {
        "targetAreaId": 5,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 4,
    "areaName": "Area 4",
    "destinations": [
      {
        "targetAreaId": 11,
        "color": "Green"
      },
      {
        "targetAreaId": 13,
        "color": "Blue"
      },
      {
        "targetAreaId": 6,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 5,
    "areaName": "Area 5",
    "destinations": [
      {
        "targetAreaId": 3,
        "color": "Green"
      },
      {
        "targetAreaId": 1,
        "color": "Blue"
      },
      {
        "targetAreaId": 7,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 6,
    "areaName": "Area 6",
    "destinations": [
      {
        "targetAreaId": 4,
        "color": "Green"
      },
      {
        "targetAreaId": 1,
        "color": "Blue"
      },
      {
        "targetAreaId": 14,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 7,
    "areaName": "Area 7",
    "destinations": [
      {
        "targetAreaId": 5,
        "color": "Green"
      },
      {
        "targetAreaId": 15,
        "color": "Blue"
      },
      {
        "targetAreaId": 14,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 8,
    "areaName": "Area 8",
    "destinations": [
      {
        "targetAreaId": 12,
        "color": "Green"
      },
      {
        "targetAreaId": 10,
        "color": "Blue"
      },
      {
        "targetAreaId": 16,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 9,
    "areaName": "Area 9",
    "destinations": [
      {
        "targetAreaId": 11,
        "color": "Green"
      }
    ]
  },
  {
    "areaId": 10,
    "areaName": "Area 10",
    "destinations": [
      {
        "targetAreaId": 13,
        "color": "Green"
      },
      {
        "targetAreaId": 8,
        "color": "Blue"
      },
      {
        "targetAreaId": 2,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 11,
    "areaName": "Area 11",
    "destinations": [
      {
        "targetAreaId": 3,
        "color": "Green"
      },
      {
        "targetAreaId": 9,
        "color": "Blue"
      },
      {
        "targetAreaId": 4,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 12,
    "areaName": "Area 12",
    "destinations": [
      {
        "targetAreaId": 8,
        "color": "Green"
      }
    ]
  },
  {
    "areaId": 13,
    "areaName": "Area 13",
    "destinations": [
      {
        "targetAreaId": 4,
        "color": "Green"
      },
      {
        "targetAreaId": 2,
        "color": "Blue"
      },
      {
        "targetAreaId": 10,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 14,
    "areaName": "Area 14",
    "destinations": [
      {
        "targetAreaId": 6,
        "color": "Green"
      },
      {
        "targetAreaId": 7,
        "color": "Blue"
      },
      {
        "targetAreaId": 15,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 15,
    "areaName": "Area 15",
    "destinations": [
      {
        "targetAreaId": 7,
        "color": "Green"
      },
      {
        "targetAreaId": 14,
        "color": "Pink"
      }
    ]
  },
  {
    "areaId": 16,
    "areaName": "Area 16",
    "destinations": [
      {
        "targetAreaId": 8,
        "color": "Green"
      }
    ]
  }
]

graph.forEach(area => {
  area.destinations.forEach(dest => {
    dest.area = graph.filter(a => a.areaId == dest.targetAreaId)[0]
  })
})



export default graph