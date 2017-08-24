/*
 调用后端接口，这里用localStorage模拟后端调用
 */

const key = "TMP_MEMBER_LIST";

function getMembers() {
  let data = localStorage[key];
  let list = [];
  if (data != null && data != "") {
    list = JSON.parse(data);
  } else {
    list = [
      {
        id: "000111",
        name: "张三",
        phone: "1812107216",
        status: 0,
        address: "上海"
      }, {
        id: "000112",
        name: "李四",
        status: 0,
        phone: "1812107216",
        address: "西安"
      }, {
        id: "000113",
        name: "王二",
        status: 1,
        phone: "1812107216",
        address: "湖北"
      }, {
        id: "000122",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "武汉"
      }, {
        id: "000125",
        name: "王二",
        status: 1,
        phone: "1812107216",
        address: "杭州"
      }, {
        id: "000121",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "苏州"
      }, {
        id: "000121",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "信阳"
      }, {
        id: "000125",
        name: "王二",
        status: 1,
        phone: "1812107216",
        address: "南阳"
      }, {
        id: "000222",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "郑州"
      }, {
        id: "000221",
        name: "王二",
        status: 1,
        phone: "1812107216",
        address: "洛阳"
      }, {
        id: "000223",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "商丘"
      }, {
        id: "000224",
        name: "王二",
        status: 1,
        phone: "1812107216",
        address: "南宁"
      }, {
        id: "000225",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "兰州"
      }, {
        id: "000229",
        name: "王二",
        status: 1,
        phone: "1812107216",
        address: "广州"
      }, {
        id: "000230",
        name: "王二",
        status: 0,
        phone: "1812107216",
        address: "深圳"
      }
    ];
    localStorage[key] = JSON.stringify(list);
  }
  return list;
}

export default {
  queryMembers(queryParams){
    let allMembers = getMembers().filter(item => {
      if (queryParams.name != "") {
        if (item.name.indexOf(queryParams.name) === -1) {
          return false;
        }
      }
      if (queryParams.address != "") {
        if (item.address.indexOf(queryParams.address) === -1) {
          return false;
        }
      }
      if (queryParams.status != null) {
        if (item.status != queryParams.status) {
          return false;
        }
      }
      if (queryParams.phone != null) {
        if (item.phone.indexOf(queryParams.phone) === -1) {
          return false;
        }
      }
      return true;
    });
    let startIdx = 0;
    if (queryParams.pageNo > 0) {
      startIdx = (queryParams.pageNo - 1) * queryParams.pageSize;
    }
    let endIdx = startIdx + queryParams.pageSize;
    let result = {};
    if (startIdx >= allMembers.length) {
      result.data = [];
    } else {
      if (endIdx > allMembers.length) {
        result.data = allMembers.slice(startIdx, allMembers.length);
      } else {
        result.data = allMembers.slice(startIdx, endIdx);
      }
    }
    result.totalRecords = allMembers.length;
    result.pageSize = queryParams.pageSize;
    result.pageNo = queryParams.pageNo;
    return result;
  },
  getMemberById(memberId){
    for (let member of getMembers()) {
      if (member.id == memberId) {
        return member;
      }
    }
    return null;
  },
  createMember(member){
    let members = getMembers();
    members.push(member);
    localStorage[key] = JSON.stringify(members);
  },

  deleteMember(memberId){
    let members = getMembers();
    let idx = null;
    for (let [index, member] of members.entries()) {
      if (member.id == memberId) {
        idx = index;

        break;
      }
    }
    if (idx != null) {
      members.splice(this.idx, 1);
    }
    localStorage[key] = JSON.stringify(members);
  }

}
