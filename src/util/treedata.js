import Mock from 'mockjs'

export default Mock.mock('/getDept', {
    dept: [{
        id: 1,
        name: '业务部',
        children: [{
            id: 5,
            name: '销售部',
        }, {
            id: 6,
            name: '市场开发部',
        }, {
            id: 7,
            name: '售后服务部',
        }]
    }, {
        id: 2,
        name: '工程部',
        children: [{
            id: 8,
            name: '设计部'
        }]
    }, {
        id: 3,
        name: '生产部',
        children: [{
            id: 9,
            name: '物料部'
        }, {
            id: 10,
            name: '统计部'
        }]
    }, {
        id: 4,
        name: '管理部',
        children: [{
            id: 11,
            name: '人力资源部'
        }, {
            id: 12,
            name: '总裁办'
        }]
    }],


})
