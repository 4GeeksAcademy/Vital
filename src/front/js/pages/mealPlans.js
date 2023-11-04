import React from "react";

export const MealPlans = () => {
    return(
      
        <div className="container bg-success p-4 ">
          <div className="row">
            <div className="col-12">
            <div class="input-group mb-3">
              <input type="text" className="form-control rounded-pill" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2"/>
            </div>
            </div>
          </div>
          <h1 className="text-vital-orange">Lunch</h1>
            <div className="card" style={{width: "18rem"}}>
              <img src="https://i.pinimg.com/originals/04/5c/9b/045c9ba208eaf5ba961923a8774c470b.jpg" className="card-img-top" alt="..."/>
              <div className="card-body">
                <h5 className="card-title">Card title</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary">Go somewhere</a>
              </div>
            </div>
        </div>
      
    )
}