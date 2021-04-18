import mock from '@/@fake-db/mock'
// import { paginateArray, sortCompare } from '@/@fake-db/utils'

/* eslint-disable global-require */
const data = {
  tasks: [
    {
      id: 1,
      title: 'Xây dựng chương trình CRM cho CVV và ANT',
      dueDate: '2020-11-25',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Jacob Ramirez',
        avatar: require('@/assets/images/avatars/12.png'),
      },
      tags: ['update'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 2,
      title: 'Công dân đứng hành chính bước cơ quan thế kỷ.',
      dueDate: '2020-12-14',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Andrew Anderson',
        avatar: '',
      },
      tags: ['team', 'medium'],
      isCompleted: true,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 3,
      title: 'Gặp Jane và mời cà phê ❤️',
      dueDate: '2020-11-25',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Benjamin Jacobs',
        avatar: '',
      },
      tags: ['high'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 4,
      title: 'Trả lời các vé hỗ trợ và đóng các vé đã hoàn thành. ',
      dueDate: '2020-11-20',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Curtis Schmidt',
        avatar: require('@/assets/images/avatars/9.png'),
      },
      tags: ['medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true,
    },
    {
      id: 5,
      title: 'Kiểm tra chức năng của các ứng dụng do nhóm nhà phát triển phát triển để có các cải tiến. ',
      dueDate: '2020-12-06',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Katherine Perkins',
        avatar: require('@/assets/images/avatars/9.png'),
      },
      tags: ['medium'],
      isCompleted: true,
      isDeleted: false,
      isImportant: true,
    },
    {
      id: 6,
      title: 'Conduct a mini awareness meeting regarding health care. ',
      dueDate: '2020-12-06',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'David Murphy',
        avatar: '',
      },
      tags: ['high', 'medium'],
      isCompleted: true,
      isDeleted: true,
      isImportant: false,
    },
    {
      id: 7,
      title: 'Lên kế hoạch thiết kế trang tổng quan mới với nhóm thiết kế cho cửa hàng ứng dụng của Google. ',
      dueDate: '2020-12-05',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Karina Miller',
        avatar: require('@/assets/images/avatars/1.png'),
      },
      tags: ['medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true,
    },
    {
      id: 8,
      title: 'Đón Nats từ trường của cô ấy và đến lớp học khiêu vũ😁 ',
      dueDate: '2020-12-08',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Thomas Moses',
        avatar: require('@/assets/images/avatars/7.png'),
      },
      tags: ['low', 'medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 9,
      title: 'Finish documentation and make it live',
      dueDate: '2020-11-25',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Angel Morrow',
        avatar: '',
      },
      tags: ['high', 'update'],
      isCompleted: false,
      isDeleted: true,
      isImportant: false,
    },
    {
      id: 10,
      title: 'Liệt kê tất cả các tài nguyên SEO và gửi nó cho nhóm SEO mới. ',
      dueDate: '2020-12-09',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Karen Carrillo',
        avatar: '',
      },
      tags: ['low'],
      isCompleted: true,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 11,
      title: 'Refactor Code và sửa lỗi và kiểm tra nó trên máy chủ',
      dueDate: '2020-12-01',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Timothy Brewer',
        avatar: require('@/assets/images/avatars/1.png'),
      },
      tags: ['low'],
      isCompleted: true,
      isDeleted: false,
      isImportant: true,
    },
    {
      id: 12,
      title: 'Nhắc nhở khách hàng qua thư cho ngày lễ',
      dueDate: '2020-12-09',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Brian Barry',
        avatar: '',
      },
      tags: ['team'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 13,
      title: "Gửi báo giá cho trang web thương mại điện tử của Abid và dự án quản trị",
      dueDate: '2020-12-01',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Joshua Golden',
        avatar: require('@/assets/images/avatars/5.png'),
      },
      tags: ['team'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 14,
      title: 'Gửi PPT với báo cáo thời gian thực',
      dueDate: '2020-11-29',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Paula Hammond',
        avatar: require('@/assets/images/avatars/5.png'),
      },
      tags: ['medium'],
      isCompleted: true,
      isDeleted: false,
      isImportant: true,
    },
    {
      id: 15,
      title: 'Skype Tommy để biết tình trạng dự án và báo cáo',
      dueDate: '2020-11-29',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Tyler Garcia',
        avatar: '',
      },
      tags: ['medium'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 16,
      title: 'Thuê 5 nhà phát triển mới hoặc có kinh nghiệm, giao diện người dùng và phụ trợ mới',
      dueDate: '2020-12-12',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Darlene Shields',
        avatar: require('@/assets/images/avatars/1.png'),
      },
      tags: ['low'],
      isCompleted: true,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 17,
      title: 'Lập kế hoạch tổ chức tiệc cho nhóm phát triển 🎁',
      dueDate: '2020-12-04',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Destiny Michael',
        avatar: '',
      },
      tags: ['medium', 'low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: false,
    },
    {
      id: 18,
      title: 'Sửa khả năng đáp ứng cho cấu trúc mới 💻',
      dueDate: '2020-11-18',
      description:
        '<p>Nội dung demo của phần CRM Todo : ANT -CVV</p>',
      assignee: {
        fullName: 'Danielle Anderson',
        avatar: require('@/assets/images/avatars/12.png'),
      },
      tags: ['low'],
      isCompleted: false,
      isDeleted: false,
      isImportant: true,
    },
  ],
}
/* eslint-enable */

// ------------------------------------------------
// GET: Return Tasks
// ------------------------------------------------
mock.onGet('/apps/todo/tasks').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', filter, tag, sortBy: sortByParam = 'latest' } = config.params
  /* eslint-enable */

  // ------------------------------------------------
  // Get Sort by and Sort Direction
  // ------------------------------------------------
  let sortDesc = true

  const sortBy = (() => {
    if (sortByParam === 'title-asc') {
      sortDesc = false
      return 'title'
    }
    if (sortByParam === 'title-desc') return 'title'
    if (sortByParam === 'assignee') {
      sortDesc = false
      return 'assignee'
    }
    if (sortByParam === 'due-date') {
      sortDesc = false
      return 'dueDate'
    }
    return 'id'
  })()

  // ------------------------------------------------
  // Filtering
  // ------------------------------------------------
  const queryLowered = q.toLowerCase()

  const hasFilter = task => {
    if (filter === 'important') return task.isImportant && !task.isDeleted
    if (filter === 'completed') return task.isCompleted && !task.isDeleted
    if (filter === 'deleted') return task.isDeleted
    return !task.isDeleted
  }
  /* eslint-disable no-confusing-arrow, implicit-arrow-linebreak, arrow-body-style */
  const filteredData = data.tasks.filter(task => {
    return task.title.toLowerCase().includes(queryLowered) && hasFilter(task) && (tag ? task.tags.includes(tag) : true)
  })
  /* eslint-enable  */

  // ------------------------------------------------
  // Perform sorting
  // ------------------------------------------------
  const sortTasks = key => (a, b) => {
    let fieldA
    let fieldB

    // If sorting is by dueDate => Convert data to date
    if (key === 'dueDate') {
      fieldA = new Date(a[key])
      fieldB = new Date(b[key])
      // eslint-disable-next-line brace-style
    }

    // If sorting is by assignee => Use `fullName` of assignee
    else if (key === 'assignee') {
      fieldA = a.assignee ? a.assignee.fullName : null
      fieldB = b.assignee ? b.assignee.fullName : null
    } else {
      fieldA = a[key]
      fieldB = b[key]
    }

    let comparison = 0

    if (fieldA === fieldB) {
      comparison = 0
    } else if (fieldA === null) {
      comparison = 1
    } else if (fieldB === null) {
      comparison = -1
    } else if (fieldA > fieldB) {
      comparison = 1
    } else if (fieldA < fieldB) {
      comparison = -1
    }

    return comparison
  }

  // Sort Data
  const sortedData = filteredData.sort(sortTasks(sortBy))
  if (sortDesc) sortedData.reverse()

  return [200, sortedData]
})

// ------------------------------------------------
// POST: Add new task
// ------------------------------------------------
mock.onPost('/apps/todo/tasks').reply(config => {
  // Get event from post data
  const { task } = JSON.parse(config.data)

  const { length } = data.tasks
  let lastIndex = 0
  if (length) {
    lastIndex = data.tasks[length - 1].id
  }
  task.id = lastIndex + 1

  data.tasks.push(task)

  return [201, { task }]
})

// ------------------------------------------------
// POST: Update Task
// ------------------------------------------------
mock.onPost(/\/apps\/todo\/tasks\/\d+/).reply(config => {
  const { task: taskData } = JSON.parse(config.data)

  // Convert Id to number
  taskData.id = Number(taskData.id)

  const task = data.tasks.find(e => e.id === Number(taskData.id))
  Object.assign(task, taskData)

  return [200, { task }]
})

// ------------------------------------------------
// DELETE: Remove Task
// ------------------------------------------------
mock.onDelete(/\/apps\/todo\/tasks\/\d+/).reply(config => {
  // Get task id from URL
  let taskId = config.url.substring(config.url.lastIndexOf('/') + 1)

  // Convert Id to number
  taskId = Number(taskId)

  const task = data.tasks.find(t => t.id === taskId)
  Object.assign(task, { isDeleted: true })
  return [200]
})
