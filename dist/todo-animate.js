//使用 pubsub 来订阅发布 监听数据

//添加 anmiate动画
var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Todo = React.createClass({
    displayName: "Todo",

    render: function () {
        return React.createElement(
            "div",
            { className: "todo-box" },
            React.createElement(InputText, null),
            React.createElement(ListBox, null)
        );
    }

});
var InputText = React.createClass({
    displayName: "InputText",

    render: function () {
        return React.createElement(
            "div",
            { className: "input-box" },
            React.createElement("input", { type: "text", placeholder: "请输入", onKeyUp: this.inputHander })
        );
    },
    inputHander: function (ev) {
        if (ev.keyCode == 13) {
            var id = new Date().getTime();
            var text = $(ev.target).val();
            if (text) {
                var json = {};
                json.id = id;
                json.todo = text;
                //事件发布
                PubSub.publish('addTodo', json);
                $(ev.target).val('');
            }
        }
    }
});

var ListBox = React.createClass({
    displayName: "ListBox",

    getInitialState: function () {
        return {
            listTodo: []
        };
    },
    render: function () {
        //var _this = this;
        var item = this.state.listTodo.map(function (json, key) {
            return React.createElement(
                "li",
                { className: "list-item", key: key },
                React.createElement(
                    "span",
                    { className: "list-txt" },
                    json.todo,
                    " "
                ),
                React.createElement(
                    "a",
                    { href: "javascript:;", "data-id": json.id, onClick: this.deleteItem },
                    "删除"
                )
            );
        }.bind(this));
        // <ReactCSSTransitionGroup /> 组件不能放在动态生成的组件里
        return React.createElement(
            "ul",
            { className: "list-box" },
            React.createElement(
                ReactCSSTransitionGroup,
                { transitionName: "slide", transitionEnterTimeout: 0, transitionLeaveTimeout: 0 },
                item
            )
        );
    },
    //订阅事件监听数据变化
    componentDidMount: function () {
        this.pusAdd = PubSub.subscribe('addTodo', function (key, item) {
            console.log(item);
            // this.state.listTodo.push(item) 返回布尔值表示十分插入成功
            this.state.listTodo.push(item);
            this.setState({
                listTodo: this.state.listTodo
            });
        }.bind(this));
        //组件自己 订阅事件
        this.pubDel = PubSub.subscribe('delTodo', function (key, item) {
            var arr = this.state.listTodo;
            $.each(arr, function (index, json) {
                if (json && json.id == item) {
                    arr.splice(index, 1);
                }
            });
            this.setState({
                listTodo: arr
            });
        }.bind(this));
    },
    //组件卸载时清除订阅事件
    componentWillUnmount: function () {
        PubSub.unsubscribe(this.pusAdd);
        PubSub.unsubscribe(this.pubDel);
    },
    deleteItem: function (ev) {
        var id = $(ev.target).attr('data-id');
        //组件自己 发送事件
        PubSub.publish('delTodo', id);
    }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('example'));