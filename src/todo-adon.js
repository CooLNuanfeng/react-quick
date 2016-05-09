//使用 pubsub 来订阅发布 监听数据
var Todo = React.createClass({
    render : function(){
        return (
            <div className="todo-box">
                <InputText />
                <ListBox />
            </div>
        )
    },

});
var InputText = React.createClass({
    render : function(){
        return (
            <div className="input-box">
                <input type="text" placeholder="请输入" onKeyUp={this.inputHander}/>
            </div>
        )
    },
    inputHander : function(ev){
        if(ev.keyCode==13){
            var id = new Date().getTime();
            var text = $(ev.target).val();
            if(text){
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
    getInitialState : function(){
        return {
            listTodo : []
        }
    },
    render : function(){
        //var _this = this;
        return (
            <ul className="list-box">
                {
                    this.state.listTodo.map(function(json,key){
                        return (
                            <li className="list-item" key={key}><span className="list-txt">{json.todo} </span><a href="javascript:;" data-id={json.id} onClick={this.deleteItem}>删除</a></li>
                        )
                    }.bind(this))
                }
            </ul>
        )
    },
    //订阅事件监听数据变化
    componentDidMount : function(){
        this.pusAdd = PubSub.subscribe('addTodo',function(key,item){
            console.log(item);
            // this.state.listTodo.push(item) 返回布尔值表示十分插入成功
            this.state.listTodo.push(item);
            this.setState({
                listTodo : this.state.listTodo
            })
        }.bind(this));
        //组件自己 订阅事件
        this.pubDel = PubSub.subscribe('delTodo',function(key,item){
            var arr = this.state.listTodo
            $.each(arr,function(index,json){
                if(json && json.id == item){
                    arr.splice(index,1)
                }
            });
            this.setState({
                listTodo : arr
            });
        }.bind(this));
    },
    //组件卸载时清除订阅事件
    componentWillUnmount : function(){
        PubSub.unsubscribe(this.pusAdd);
        PubSub.unsubscribe(this.pubDel);
    },
    deleteItem: function(ev){
        var id = $(ev.target).attr('data-id');
        //组件自己 发送事件
        PubSub.publish('delTodo', id);
    }
});


ReactDOM.render(
    <Todo />,
    document.getElementById('example')
)
