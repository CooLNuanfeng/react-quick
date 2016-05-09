
var Todo = React.createClass({
    getInitialState : function(){
        return {
            listWords : []
        }
    },
    render : function(){
        return (
            <div className="todo-box">
                <div className="input-box">
                    <input type="text" ref="myTextInput" placeholder="请输入" onKeyUp={this.keyupHander}/>
                </div>
                <ItemList listWords={this.state.listWords}/>
            </div>
        )
    },
    keyupHander: function(ev){
        if(ev.keyCode==13){
            var text = this.refs.myTextInput.value;
            if(text){
                var json = {};
                var nowId = new Date().getTime();
                json['id'] = nowId;
                json['text'] = text;
                //console.log(this.state.listWords);
                var arr = this.state.listWords;
                arr.push(json);
                //console.log(arr);
                this.setState({
                    listWords : arr
                });
                this.refs.myTextInput.value = '';
            }
        }
    }
});



var ItemList = React.createClass({
    getInitialState : function(){
        return {
            listData : this.props.listWords
        }
    },
    render : function(){
        var _this = this;
        return (
            <ul className="list-box">
                {
                    this.state.listData.map(function(json,key){
                        return (
                            <li className="list-item" key={key}>
                                <span className="list-txt">{json.text}</span>
                                <a href="javascript:;" data-id={json.id} onClick={_this.deleteItem}>删除</a>
                            </li>
                        )
                    })
                }
            </ul>
        )
    },
    deleteItem : function(ev){
        var id = $(ev.target).attr('data-id');
        var arr = this.state.listData;
        //console.log(id);
        $.each(arr,function(index,item){
            if(item && item.id==id){
                arr.splice(index,1);
            }

        });
        console.log(arr);
        this.setState({
            listData : arr
        });
        console.log(arr);
    }
});


ReactDOM.render(
    <Todo />,
    document.getElementById('example')
)
