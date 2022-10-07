/*
 * @Author: zhoujie 18326485422@163.com
 * @Date: 2022-10-06 20:14:53
 * @LastEditors: zhoujie 18326485422@163.com
 * @LastEditTime: 2022-10-07 19:02:53
 * @FilePath: \大事件自己尝试\assets\js\user\user_info.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function () {
  const form = layui.form
  const layer = layui.layer
  // 创建自定义的规则
  form.verify({
    nickname: function (value) {
      if (value.length > 6) {
        return '昵称长度必须在1-6个字符之间！'
      }
    }
  })

  initUserInfo()
  // 初始化用户的基本信息
  function initUserInfo() {
    $.ajax({
      method:'GET',
      url:'/my/userinfo',
      success(res) {
        // console.log(res);
        if (res.status !== 0) {
          return layer.msg('获取用户信息失败！')
        }
        console.log(res)
        // 调用 form.val() 快速为表单赋值
        form.val('formUserInfo',res.data)
      }
    })
  }

  // 重置 表单的数据
  $('#btnReset').on('click', function (e) {
    // 阻止表单的默认行为
    e.preventDefault()
    initUserInfo()
  })

  // 监听表单的提交事件
  $('.layui-form').on('submit', function (e) {
    // 阻止表单的默认行为
    e.preventDefault()
    // 发起ajax数据请求
    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data:form.val('formUserInfo'),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('更新用户信息失败！')
        }
        layer.msg('更新用户信息成功！')
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        // 在子页面调用父页面的函数 通过window.parent
        window.parent.getUserInfo()
      }
    })
  })
})