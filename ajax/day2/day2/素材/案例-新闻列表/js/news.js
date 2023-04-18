$(function(){
    function padZero(n){
        if(n < 10){
            return '0'+n
        }else {
            return n
        }
    }


    // 定义时间格式
    template.defaults.imports.dataFormat= function(dtstr){
        let dt = new Date(dtstr)
        let y = dt.getFullYear()
        let m = dt.getMonth()+1
        let d = dt.getDate()
        let hh = padZero(dt.getHours())
        let mm = dt.getMinutes()
        let ss = dt.getSeconds()
        return y + '-' + m +'-' + d +' '+hh+':'+mm+':'+ss
    }
    // 获取新闻列表
    function getNewsList(){

        $.get('http://www.liulongbin.top:3006/api/news',function(res){
            if(res.status !== 200) return alert('获取失败')

            for(let i =0;i< res.data.length;i++){
                res.data[i].tags = res.data[i].tags.split(',')
                // console.log(res.data[i].tags);

                // 不使用模板过滤器转化时间的话可以先一步格式化时间
                // let time = new Date(res.data[i].time)
                // res.data[i].time = time.toLocaleString()

            }
            let htmlstr = template('tpl-news',res)
            $('#news-list').html(htmlstr)
        })


    }
    getNewsList()
})
