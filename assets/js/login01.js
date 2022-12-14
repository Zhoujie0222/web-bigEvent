/*
 * @Author: zhoujie 18326485422@163.com
 * @Date: 2022-09-25 20:22:07
 * @LastEditors: zhoujie 18326485422@163.com
 * @LastEditTime: 2022-09-27 15:34:36
 * @FilePath: \大事件自己尝试\assets\js\login01.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
$(function () {
  // 点击"去注册账号"的链接
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击"去登录"的链接
  $('#link-login').on('click', function () {
    $('.login-box').show()
    $('.reg-box').hide()
  })

  // 从 layui 中获取 form 对象
  let form = layui.form
  let layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    // 自定义了一个叫做pwd校验规则
    pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
    // 校验两次密码是否一致的规则
    // value用户输入的值
    repwd: function (value) {
      //通过形参拿到的是确认密码框中的内容
      // 还需要拿到密码框中的内容
      // 然后进行一次等于的判断
      // 如果判断失败，则return一个提示的消息即可
      let pwd = $('.reg-box [name=password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册表单的提交事件
  // const baseUrl = 'http://www.liulongbin.top:3007'
  // const baseUrl = 'http://big-event-api-t.itheima.net'
  $('#form_reg').on('submit', function (e) {
    // 阻止表单默认提交事件
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/reguser',
      data: {
        username:$('#form_reg [name=username]').val(),
        password:$('#form_reg [name=password]').val()
      },
      success(res) {
        if (res.status !== 0) {
          // return alert(res.message)
          return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        // console.log('注册成功！')
      }
    })
    // $.post(`${baseUrl}/api/reguser`, { username: $('#form_reg [name=username]').val(), password: $('#form_reg [name=password]').val() }, function (res) {
    //   if (res.status !== 0) {
    //     return console.log(res.message)
    //   }
    //   console.log('注册成功！');
    // })
    // 模拟人的点击行为
    $('#link-login').click()
  })

  // 监听登录表单的提交事件 
  $('#form_login').on('submit', function (e) {
    // 阻止表单的默认提交行为
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/api/login',
      // this 表示当前表单对象
      // 快速获取表单中的数据
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          return layer.msg('登录失败！')
        }
        layer.msg('登录成功！')
        // 将登录成功得到的 token 字符串，保存到localStorage中
        localStorage.setItem('token', res.token)
        // 跳转到后台主页
        location.href = '/index.html'
      }
    })
  })
})