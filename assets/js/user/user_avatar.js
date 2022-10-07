$(function () {
  const layer = layui.layer
  
   // 1.1 获取裁剪区域的 DOM 元素
   let $image = $('#image')
   // 1.2 配置选项
   const options = {
     // 纵横比,裁剪框
     aspectRatio: 1,
     // 指定预览区域
     preview: '.img-preview'
   }
   // 1.3 创建裁剪区域
  $image.cropper(options)
  
  // 为 上传 按钮绑定点击事件
  $('#btnChooseImage').on('click', function () {
    // 调用元素，绑定click()方法
    $('#file').click()
  })

  // 为文件选择框绑定change事件
  $('#file').on('change', function (e) {
    // console.log(e);
    let fileList = e.target.files
    // console.log(fileList)
    if (fileList.length === 0) return layer.msg('请选择图片！')
    
    // 1、拿到用户选择的文件
    let file = e.target.files[0]
    // 2、根据选择的文件，创建一个对应的 URL 地址：
    let newImgURL = URL.createObjectURL(file)
    // 3、重新初始化裁剪区域
    $image
    .cropper('destroy')      // 销毁旧的裁剪区域
    .attr('src', newImgURL)  // 重新设置图片路径
    .cropper(options)        // 重新初始化裁剪区域

  })

  //为 确定 按钮绑定点击事件
  $('#btnUpload').on('click', function () {
    // 1、拿到用户裁剪之后的图像
    let dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png')  // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
    // 2、调用接口，把头像上传到服务器
    $.ajax({
      method: 'POST',
      url: '/my/update/avatar',
      data: {
        avatar:dataURL
      },
      success(res) {
        if (res.status !== 0) return layer.msg('更新头像失败！')
        layer.msg('更新头像成功!')
        window.parent.getUserInfo()
      }
    })
  })
})