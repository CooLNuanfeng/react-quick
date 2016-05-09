var Todo = React.createClass({
    getInitialState : function(){
        return {
            'todos' : []
        }
    },
    render : function(){
        return (
            <div className="todo-box">
                <InputText todoInput={this.todoHander}/>
                <ListBox todos={this.state.todos}/>
            </div>
        )
    },
    todoHander : function(todo){
        this.state.todos.push(todo);
        this.setState({
            'todos' : this.state.todos
        })
    }
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
                //通过 props 的函数参数 实现反向数据传递
                this.props.todoInput(json);
                $(ev.target).val('');
            }
        }
    }
});

var ListBox = React.createClass({
    getInitialState : function(){
        return {
            listTodo : this.props.todos
        }
    },
    render : function(){
        var _this = this;
        return (
            <ul className="list-box">
                {
                    this.state.listTodo.map(function(json,key){
                        return (
                            <li className="list-item" key={key}><span className="list-txt">{json.todo} </span><a href="javascript:;" data-id={json.id} onClick={_this.deleteItem}>删除</a></li>
                        )
                    })
                }
            </ul>
        )
    },
    deleteItem: function(ev){
        var id = $(ev.target).attr('data-id');
        var arr = this.state.listTodo
        $.each(arr,function(index,json){
            if(json && json.id == id){
                arr.splice(index,1)
            }
        });
        this.setState({
            listTodo : arr
        });
    }
});


ReactDOM.render(
    <Todo />,
    document.getElementById('example')
)
