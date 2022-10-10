import { hasSelectionSupport } from "@testing-library/user-event/dist/utils";
import React, {useState,useEffect,useRef} from "react"

const Todolist = () =>{
    const [data,setData] = useState("");
    const [items,setItems] = useState([]);
    const [edit,setEdit] = useState({});
    const [pesanError,setPesanError] = useState("");

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
                setPesanError("");
            }else{
                setPesanError("Error, isi data untuk edit dulu! ");
            }

        }else if(items.length < 10 ){    
            if(data !== ""){
                setPesanError("");
                setItems([...items, { data, id:generateid() }]); 
                setData("");    
            }else{
                return setPesanError("Error, Data belum di isi");
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
        setPesanError("");
    }

    const Cancel = () =>{
        setData("");
        setEdit({});
        setPesanError("");
    }

    return(
        <>
        <div className="box">
            <h1>To Do List</h1>
            <p style={{position:"relative",bottom:"10%"}}> Data : {items.length} <h6 style={{position:"absolute",top:"-5px",color:"tomato",textShadow:"none"}}>{pesanError}</h6></p>
            <div className="inptData">
                <input className="inpt1" type="text" onChange={((inpt)=>inputData(inpt.target.value))} value={data} placeholder="Isi Data ..."/>
                {edit.id ? (<button className="btnAdd" type="submit" onClick={ToDo}>Edit</button>) : (<button className="btnAdd" type="submit" onClick={ToDo}>Add</button>)}
                {edit.id && <button className="btnAdd" type="submit" onClick={Cancel}>Cancel</button>}
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