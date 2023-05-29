import { LaunchStatus } from "./preDefine"

// 每次获取多少个launch
const LUNCHES_COUNT = 12

// 根据选择的过滤条件生成接口请求的body
export const bodyGenerator = (
  searchText:string,
  currentPage:number,
  isNewRequest:boolean,
  launchStatus:LaunchStatus,
  startDate:Date,
  endDate:Date,
  launchOrderDesc:boolean
) => {
  const body =  {
    "query": {
      "name": { 
        "$regex": "",
        "$options": "i"
      },
      "$and": [
        {
          "date_utc": {
            "$gte": "",
          }
        },
        {
          "date_utc": {
            "$lte": "",
          }
        },
      ],
      "success":{
        "$in":[true,false]
      }
    },
    "options": {
      "select":["name","date_utc","success","links","details"],
      "pagination":true,
      "limit": LUNCHES_COUNT,
      "page":isNewRequest ? 1 : currentPage+1,
      "sort": {
        "date_utc": launchOrderDesc ? "desc" : "asc"
      }
    }
  }

  // 关键字搜索
  if (searchText!=='') {
    body.query.name.$regex = searchText
  } else {
    delete body.query.name
  }

  // 发射成功还是失败
  if (launchStatus.launchSucc && launchStatus.launchFail) {
    body.query.success = {
      "$in":[true,false]
    }
  }

  if (!launchStatus.launchSucc && launchStatus.launchFail) {
    body.query.success = {
      "$in":[false]
    }
  }

  if (launchStatus.launchSucc && !launchStatus.launchFail) {
    body.query.success = {
      "$in":[true]
    }
  }

  if (!launchStatus.launchSucc && !launchStatus.launchFail) {
    body.query.success = {
      "$in":[]
    }
  }


  // 开始结束日期
  if (startDate !== null && endDate !== null) {
    body.query.$and = [
      {
        "date_utc": {
          "$gte": startDate.toISOString(),
        }
      },
      {
        "date_utc": {
          "$lte": endDate.toISOString(),
        }
      },
    ]
  }

  if (startDate === null && endDate!== null) {
    body.query.$and = [
      {
        "date_utc": {
          "$lte": endDate.toISOString()
        }
      }
    ]
  }

  if (startDate !== null && endDate === null) {
    body.query.$and = [
      {
        "date_utc": {
          "$gte": startDate.toISOString(),
        }
      }
    ]
  }

  if (startDate === null && endDate === null) {
    delete body.query.$and
  }

  return body
}

export const parseISODate = (isoDate:string):string => {
  return new Date(isoDate).toLocaleDateString("en-GB")
}

export const parseDate = (date:Date):string => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const formattedDate = `${year}${month}${day}`
  return formattedDate
}