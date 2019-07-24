### 页面适配使用的是 lib-flexible 插件
使用方式:
在index.html 添加javascript
```javascript
<script>
      /(iPhone|iPad|iPhone OS|Phone|iPod|iOS)/i.test(navigator.userAgent)&&(head=document.getElementsByTagName('head'),viewport=document.createElement('meta'),viewport.name='viewport',viewport.content='target-densitydpi=device-dpi, width=480px, user-scalable=no',head.length>0&&head[head.length-1].appendChild(viewport));
</script>
```
