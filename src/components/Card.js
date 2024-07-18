import React, { useState, useEffect, useRef } from 'react'
import { useDispatchCart, useCart } from './ContextReducer'
export default function Card(props) {
    let dispatch = useDispatchCart();
    let data = useCart();
    const priceRef = useRef();
    let options = props.options;
    let priceOptions = Object.keys(options);
    const [Qty, setQty] = useState(1)
    const [Size, setSize] = useState("")
    const handleAddToCart = async () => {
        let food = []
        for (const item of data) {
            if (item.id === props.foodItem._id) {
                food = item;

                break;
            }
        }
        console.log(food)
        console.log(new Date())

        if (food.length !== 0) {
            if (food.Size === Size) {
                await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, Qty: Qty })
                return
            }
            else if (food.Size !== Size && data.length <= 7) {
                await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, Qty: Qty, Size: Size, img: props.ImgSrc })
                console.log("Size different so simply ADD one more to the list")
                return
            }
            return
        }
        if (data.length <= 7) {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, Qty: Qty, Size: Size })
        }

        // setBtnEnable(true)

    }
    let finalPrice = Qty * parseInt(options[Size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>
            <div className="card m-3" style={{ width: "18rem", height: "360px" }}>
                <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "49%", width: "100%" }} />
                <div className="card-body" style={{ height: "25%", width: "100%" }}>
                    <h5 className='card-title' style={{ marginLeft: "1.1rem" }}>{props.foodItem.name}</h5>
                    <p className='card-text'> </p>
                    <div className="container w-100">
                        <select className="m-2 h=100  " onChange={(event) => {
                            setQty(event.target.value)
                        }} >
                            {Array.from(Array(6), (e, i) => {
                                return (
                                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                                )
                            })}
                        </select>
                        <select className="m-2 h-100 rounded" ref={priceRef} onChange={(event) => {
                            setSize(event.target.value)
                        }}>
                            {priceOptions.slice(1).map((data) => {
                                return <option key={data} value={data}>{data}</option>
                            })}
                        </select>
                        <div className="d-inline h-100 fs-5">
                            Price :{finalPrice}/-
                        </div>
                        <hr />
                        <div >
                            <button className='btn btn-dark justify-center ms-1' onClick={handleAddToCart}>Add to Cart</button>

                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}
