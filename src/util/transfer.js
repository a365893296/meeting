import Mock from 'mockjs'

export default Mock.mock('/getUsers', {
  "users|2-10": [
    {
      'id': '@id',
      'name': '@cname',
    }
  ]
})
