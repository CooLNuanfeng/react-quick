
var Todo = React.createClass({
    displayName: "Todo",

    getInitialState: function () {
        return {
            listWords: []
        };
    },
    render: function () {
        return React.createElement(
            "div",
            { className: "todo-box" },
            React.createElement(
                "div",
                { className: "input-box" },
                React.createElement("input", { type: "text", ref: "myTextInput", placeholder: "请输入", onKeyUp: this.keyupHander })
            ),
            React.createElement(ItemList, { listWords: this.state.listWords })
        );
    },
    keyupHander: function (ev) {
        if (ev.keyCode == 13) {
            var text = this.refs.myTextInput.value;
            if (text) {
                var json = {};
                var nowId = new Date().getTime();
                json['id'] = nowId;
                json['text'] = text;
                //console.log(this.state.listWords);
                var arr = this.state.listWords;
                arr.push(json);
                //console.log(arr);
                this.setState({
                    listWords: arr
                });
                this.refs.myTextInput.value = '';
            }
        }
    }
});

var ItemList = React.createClass({
    displayName: "ItemList",

    getInitialState: function () {
        return {
            listData: this.props.listWords
        };
    },
    render: function () {
        var _this = this;
        return React.createElement(
            "ul",
            { className: "list-box" },
            this.state.listData.map(function (json, key) {
                return React.createElement(
                    "li",
                    { className: "list-item", key: key },
                    React.createElement(
                        "span",
                        { className: "list-txt" },
                        json.text
                    ),
                    React.createElement(
                        "a",
                        { href: "javascript:;", "data-id": json.id, onClick: _this.deleteItem },
                        "删除"
                    )
                );
            })
        );
    },
    deleteItem: function (ev) {
        var id = $(ev.target).attr('data-id');
        var arr = this.state.listData;
        //console.log(id);
        $.each(arr, function (index, item) {
            if (item && item.id == id) {
                arr.splice(index, 1);
            }
        });
        console.log(arr);
        this.setState({
            listData: arr
        });
        console.log(arr);
    }
});

ReactDOM.render(React.createElement(Todo, null), document.getElementById('example'));