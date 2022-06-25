import React, { useState, useEffect } from "react"
import Draggable from "react-draggable"
import { v4 as uuidv4 } from "uuid"
import randomColor from 'randomcolor'
import MouseParticles from "react-mouse-particles"

const Main = () => {
    const initialState = JSON.parse(localStorage.getItem("items")) || []
    const [items, setItems] = useState(initialState)
    const [item, setItem] = useState("")

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items))
    }, [items])

    const addItem = () => {
        if (item.trim() !== "") {
            // input が空白でない場合、新しいアイテムオブジェクトを作成
            const newItem = {
                id: uuidv4(),
                item: item,
                color: randomColor({ luminosity: "light" }),
                defaultPos: { x: 100, y: 0 },
            }
            // 新しいアイテムオブジェクトをアイテム配列に追加
            setItems((items) => [...items, newItem])
            // 項目の値をリセット
            setItem("")
        } else {
            alert("Enter a item")
            setItem("")
        }
    }

    const deleteItem = (id) => {
        setItems(items.filter(item => item.id !== id))
    }

    const handleKeyPress = (e) => {
        let code = e.keyCode || e.which
        if (code === 13) { addItem() } // Press Return or Enter key
    }

    const updatePosition = (data, index) => {
        let newArr = [...items]
        newArr[index].defaultPos = {
            x: data.x,
            y: data.y
        }
        setItems(newArr)
    }

    return (
        <main>
            <MouseParticles
                g={1}
                number={200}
                color={["blue", "aqua"]}
                radius={7}
                cull="MuiSvgIcon-root,MuiButton-root"
                level={7}
            />
            <div className="flex justify-center py-3 bg-gray-200">
                <input
                    className="rounded-l-md py-2 px-3"
                    value={item}
                    placeholder="入力してください..."
                    onChange={ e => setItem(e.target.value) }
                    onKeyDown={ e => handleKeyPress(e) }
                />
                <button
                    className="bg-red-400 rounded-r-md text-white py-2 px-3"
                    onClick={addItem}
                >追加</button>
            </div>
            <ul>
                {items &&
                    items.map((item, index) => {
                        return (
                            <Draggable
                                key={item.id}
                                defaultPosition={item.defaultPos}
                                onStop={(e, data) => {
                                    updatePosition(data, index)
                                }}
                            >
                                <li
                                    style={{backgroundColor: item.color}}
                                    className="flex justify-between w-80 p-3 rounded-xl"
                                >
                                    {`${item.item}`}
                                    <button
                                        className="delete rounded-full font-bold text-gray-400 bg-white hover:bg-red-500 hover:text-white px-2"
                                        onClick={ e => deleteItem(item.id) }
                                    >×</button>
                                </li>
                            </Draggable>
                        )
                    })
                }
            </ul>
        </main>
    )
}

export default Main
