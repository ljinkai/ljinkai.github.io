//获取更多知识，一起学习，关注微信订阅号【前端开发知识】
//顶部导航条
var Header = React.createClass({
    render: function () {
        return (
            <header className="bar bar-nav">
                <a href="#" className={"icon icon-left-nav pull-left" + (this.props.back==="true"?"":" hidden")}></a>
                <h1 className="title">{this.props.text}</h1>
            </header>
            );
    }
});
//滚动列表元素
var ListItem = React.createClass({
    render: function () {
        return (
            <li className="table-view-cell media">
                <a href={this.props.employee.link} target="_blank" class="navigate-right">
                    {this.props.employee.title}<small> [{this.props.employee.label}]</small>
                    <p>{this.props.employee.des}</p>
                </a>
            </li>
            );
    }
});
//滚动列表布局
var List = React.createClass({
    render: function () {
        var items = this.props.employees.map(function (employee) {
            return (
                <ListItem key={employee.id} employee={employee} />
                );
        });
        return (
            <ul  className="table-view">
                {items}
            </ul>
            );
    }
});
//首页布局
var HomePage = React.createClass({
    render: function () {
        return (
            <div>
                <Header text="今天极客新闻" back="false"/>
                <div className="content">
                    <List employees={this.props.employees}/>
                </div>
            </div>
            );
    }
});
//创建App对象
var App = React.createClass({
    //react内部方法，初始化对象变量，返回值可以通过this.state调用
    getInitialState: function() {
        return {
            searchKey: '',
            employees: [
            ],
            page: null
        }
    },
    //react内部方法,初始化完成后立即调用一次
    componentDidMount: function() {
        var rssArray = [
            {"title":"业界资讯","des":"业界资讯","url":"http://cnbeta.feedsportal.com/c/34306/f/624776/index.rss","type":"rss","label":"咨询"},
            {"title":"36氪","des":"36氪","url":"http://www.36kr.com/feed/","type":"rss","label":"创业"},
            {"title":"techcrunch","des":"IT新闻","url":"http://techcrunch.cn/feed/","type":"rss","label":"IT"},
            {"title":"品玩","des":"品味把玩","url":"http://www.pingwest.com/feed/","type":"rss","label":"品玩"},
            {"title":"极客公园","des":"极客早知道","url":"http://www.geekpark.net/rss","type":"rss","label":"极客"},
            {"title":"爱范儿","des":"爱范儿","url":"http://www.ifanr.com/feed","type":"rss","label":"爱范儿"}
        ];
        var res = [];
        for (var i = 0; i < rssArray.length;i++) {
            var url = rssArray[i].url;
            // 利用Yahoo的rss解析api获取json返回值
            var yahoo = 'select * from feed where url="' + encodeURIComponent(url) + '" | truncate(count=10)';
            var api = "https://query.yahooapis.com/v1/public/yql?q=" + yahoo + "&format=json&diagnostics=true&num=4&callback=";
            var _self = this;

            // Send request
            (function(label) {
                $.getJSON(api, function(data){
                    if (data) {
                        var item = data.query.results.item;
                        for (var j = 0; j < item.length;j++) {
                            var des = "";
                            try {
                                des = $(item[j].description).text();
                            } catch (err) {
                                des = item[j].description;
                            }
                            des = des.length > 40 ? des.substring(0,40) + ".." : "";
                            des = des.replace(/<strong>/, '').replace(/<\/strong>/, '');
                            var temp = {"title":item[j].title,"link":item[j].link,"des":des,"label":label};
                            res.push(temp);
                        }
                    } else {
                        _self.setState({"employees":[]});
                    };
                    _self.setState({"employees":res});
                })
            })(rssArray[i].title);
        }
    },
    render: function() {
        return <HomePage employees={this.state.employees}/>;
    }
});
//渲染入口
React.render(<App/>, document.getElementById("container"));