import React from "react";

const AboutUs = () => {
    return (
        <div className="container-fluid d-flex flex-column" style={{ minHeight: "90vh" }}>

            <div className="container d-flex h-100 flex-wrap align-items-center ">
                <div className="container d-flex flex-wrap justify-content-around">
                    <div className="col-12 p-3">
                        <h1 className="text-center text-vital-orange" style={{ fontSize: "100px" }}>Technologies</h1>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image">
                            <img src="https://assets.stickpng.com/thumbs/62a74dd1223343fbc2207d00.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image h-100 align-items-center d-flex">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Flask_logo.svg/1280px-Flask_logo.svg.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image">
                            <img src="https://seeklogo.com/images/P/python-logo-C50EED1930-seeklogo.com.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image">
                            <img src="https://cdn.freebiesupply.com/logos/large/2x/css3-logo-png-transparent.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image">
                            <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/postgresql_plain_wordmark_logo_icon_146390.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image">
                            <img src="https://cdn.icon-icons.com/icons2/2415/PNG/512/javascript_original_logo_icon_146455.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/1280px-Bootstrap_logo.svg.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-12 p-3">
                <h1 className="text-center text-vital-orange" style={{ fontSize: "100px" }}>APIs</h1>
            </div>
            <div className="container d-flex flex-column h-100 p-5 flex-wrap align-items-center ">
                <div className="container d-flex flex-wrap justify-content-around">

                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image h-100 align-items-center d-flex">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image h-100 align-items-center d-flex">
                            <img src="https://freelogopng.com/images/all_img/1681142382OpenAI-png.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image h-100 align-items-center d-flex">
                            <img src="https://images.squarespace-cdn.com/content/v1/598dfb06cd0f684d50f9d08d/1576224969243-2QT03Z5HL9OH09U8NZPC/Edamam_logo_full_RGB.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "250px" }}>
                        <div className="image h-100 align-items-center d-flex">
                            <img src="https://firebase.google.com/static/downloads/brand-guidelines/PNG/logo-standard.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    <div className="col-4 p-3" style={{ width: "350px" }}>
                        <div className="image h-100 align-items-center d-flex">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/62/RapidAPI_logo.svg/2560px-RapidAPI_logo.svg.png" className="img-fluid" alt="about us" />
                        </div>
                    </div>
                    
                </div>
            </div>

        </div>
    );
}

export default AboutUs;