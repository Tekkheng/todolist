import React, {useState,useEffect,useRef} from "react"

const Todolist = () =>{
    const [data,setData] = useState("");
    const [items,setItems] = useState([]);
    const [edit,setEdit] = useState({});

    const inputData = ((inpt)=>{
       setData(inpt);  
    })
// s
    const ToDo = (event)=>{
        event.preventDefault();
        if(edit.id){
            const itemsBaru = {
                data,id:generateid()
            };
            const cariIndex = items.findIndex((i)=>{
                return i.id === edit.id;
            })
            console.log(cariIndex);
            const cloneItems = [...items];
            cloneItems[cariIndex] = itemsBaru;
            if(data !== ""){
                setItems(cloneItems);
                setData("");
                setEdit("");
            }else{
                alert("isi Data");
            }

        }else if(items.length < 10 ){    
            if(data !== ""){
                setItems([...items, { data, id:generateid() }]); 
                setData("");    
            }else{
                alert("data kosong");
            }
        }else{
            alert("Data Kepenuhan");
        }
    
    }

    const hapusItems = (id)=>{
        const filterItems =  items.filter((item)=>{
            return id != item.id;
        })
        console.log(filterItems);
        setItems(filterItems);
    }

    const generateid=(()=>{
        return Date.now();
    })

    const editItems = (argumentItems) => {
        setData(argumentItems.data);
        setEdit(argumentItems);
    }


    return(
        <>
        <div className="box">
            <h1>To Do List</h1>
            <p style={{position:"relative",bottom:"10%"}}> Data : {items.length}</p>
            <div className="inptData">
                <input className="inpt1" type="text" onChange={((inpt)=>inputData(inpt.target.value))} value={data} placeholder="Isi Data ..."/>
                <button className="btnAdd" type="submit" onClick={ToDo}>Save</button>
            </div>
            
            {items.map((item)=>{
                return (
                    <ol>
                        <li>
                            {item.data}
                        </li>
                        <button className="btn" onClick={hapusItems.bind(this, item.id)}>Hapus</button>
                        <button className="btn2" onClick={editItems.bind(this, item)}>Edit</button>
                        <input className="cekbox" type="checkbox" style={{float:"right"}}/>
                    </ol>
                )
            })}
            
        </div>
        </>
    )
}

export default Todolist;