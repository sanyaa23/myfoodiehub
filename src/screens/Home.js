import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/Card';

export default function Home() {
    const [search, setSearch] = useState('');
    const [foodCat, setFoodCat] = useState([]);
    const [foodItem, setFoodItem] = useState([]);

    const loadData = async (req, res) => {
        try {
            const res = await fetch("http://localhost:5000/api/foodData", {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                }
            });
            const json = await res.json();
            setFoodItem(json[0]);
            setFoodCat(json[1]);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div style={{ backgroundColor: "#eee" }}>
            <Navbar />
            <div id="carouselExampleCaptions" className="carousel slide" style={{ objectFit: "contain !important" }} data-bs-ride="carousel">
                <div className="carousel-caption d-none d-md-block" style={{ zIndex: "10" }} >
                    <div class="d-flex justify-content-center">
                        <input class="form-control me-2" type="search" placeholder="Search" value={search} onChange={(event) => {
                            setSearch(event.target.value)
                        }} aria-label="Search" />
                        {/* <button class="btn btn-outline-success" type="submit">Search</button> */}
                    </div>
                </div>
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="https://picsum.photos/id/312/1350/950" className="d-block w-100 carousel-img" alt="..." />
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/id/312/1350/950" className="d-block w-100 carousel-img" alt="..." />
                        {/* <div className="carousel-caption d-none d-md-block">
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div> */}
                    </div>
                    <div className="carousel-item">
                        <img src="https://picsum.photos/id/312/1350/950" className="d-block w-100 carousel-img" alt="..." />
                        {/* <div className="carousel-caption d-none d-md-block">
                            <form class="d-flex">
                                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">Search</button>
                            </form>
                        </div> */}
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
            <div className='container'>
                {foodCat.length !== 0 ?
                    foodCat.map((category) => {
                        return (
                            <div className='row mb-3'>
                                <div key={category._id}>{category.categoryName}</div>
                                <hr />
                                {
                                    foodItem.length !== 0 ?
                                        foodItem.filter((item) =>
                                            (item.categoryName === category.categoryName) && (item.name.toLowerCase().includes(search.toLocaleLowerCase()))
                                        ).map((filterItems) => {
                                            return (
                                                <div key={filterItems._id} className='col-12 col-md-6 col-lg-3'>
                                                    <Card foodItem={filterItems} options={filterItems.options[0]} />
                                                </div>
                                            )
                                        }) :
                                        (
                                            <div>Items not found</div>
                                        )
                                }

                            </div>

                        )
                    })
                    : (
                        <div>No categories found</div>
                    )}
            </div>
            <Footer />
        </div>
    );
}
