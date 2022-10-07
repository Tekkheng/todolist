import React, {component} from "react";

class Todo extends React.Component {
    state = {
        input : "",
        items : [],
        edit : {},
    }

    doInput = (v) =>{
        this.setState({
            input : v.target.value,
        })
    }

    ToDo = (e) =>{
        e.preventDefault();

        if(this.state.edit.id){
            const itemsBaru = {
                input : this.state.input,id:this.generateId()
            };
            const cariIndex = this.state.items.findIndex((i_item)=>{
                return i_item.id === this.state.edit.id;
            })
            console.log(cariIndex);
            const cloneItems = [...this.state.items];
            console.log(cloneItems);
            cloneItems[cariIndex] = itemsBaru;
            console.log(cloneItems[cariIndex]);
            
            if(this.state.input !== ""){
                this.setState({
                    items : cloneItems,
                })
            }else{
                alert("Data masih kosong");
            }
        }else{  
            if(this.state.items.length < 10){

                if(this.state.input !== ""){
    
                    this.setState({
                        items : [...this.state.items, {input:this.state.input,id : this.generateId()}],
                        input : "",  
                    })
                }else{
                    alert("Data belum di isi");
                }
            }else{
                alert("data kepenuhan");
            }
            // console.log(this.state.items);
        }
        
    }

    generateId=()=>{
        return Date.now();
    }
    hapusBtn = (idhapus)=>{
        const filterD = this.state.items.filter((d)=>{
            return d.id !== idhapus;
        })
        // console.log(filterD);
        this.setState({
            items : filterD,
        })
    }
    editBtn = (d)=>{
        this.setState({
            input : d.input,
            edit : d,
        })
    }
    
    render(){
        // console.log(this.state.edit);
        return(
            <div className="box">
            <h1>To Do List</h1>
            <input type="text" onChange={((inpt)=>this.doInput(inpt))} value={this.state.input}/>
            <button onClick={this.ToDo}>Save</button>

            {this.state.items.map((d)=>{
                return(
                    <ol>
                        <li>{d.input}</li>
                        <button className="btn" onClick={this.editBtn.bind(this,d)}>edit</button>
                        <button className="btn2" onClick={this.hapusBtn.bind(this, d.id)}>delete</button>
                    </ol>
                )
            })}
            </div>
        )
    }
}

export default Todo;