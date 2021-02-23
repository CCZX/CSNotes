function ajax(method, url, reqHeader) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.open(method, url)

    Object.keys(reqHeader).forEach(key => {
      xhr.setRequestHeader(key, reqHeader[key])
    })
    xhr.responseType = 'json'

    /**
     * 1. 未初始化，还为调用send方法
     * 2. 载入，已调用send方法，正在发送请求
     * 3. 载入完成，send方法执行完成，已收到响应内容
     * 4. 交互，正在解析响应内容
     * 5. 完成，响应内容解析完成
     */
    xhr.onreadystatechange = () => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          resolve(xhr.response)
        }
      }
    }

    xhr.send()
  })
}