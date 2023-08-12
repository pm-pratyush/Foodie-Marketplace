import React from "react";
import "./Landingpage.css";

export const Landingpage = () => {
  return (
    <div>
      <div>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content />
        <meta
          name="author"
          content="Mark Otto, Jacob Thornton, and Bootstrap contributors"
        />
        <meta name="generator" content="Hugo 0.88.1" />
        <title>Product example · Bootstrap v5.1</title>
        <link
          rel="canonical"
          href="https://getbootstrap.com/docs/5.1/examples/product/"
        />
        {/* Bootstrap core CSS */}
        <link href="../assets/dist/css/bootstrap.min.css" rel="stylesheet" />
        <style
          dangerouslySetInnerHTML={{
            __html:
              "\n      .bd-placeholder-img {\n        font-size: 1.125rem;\n        text-anchor: middle;\n        -webkit-user-select: none;\n        -moz-user-select: none;\n        user-select: none;\n      }\n\n      @media (min-width: 768px) {\n        .bd-placeholder-img-lg {\n          font-size: 3.5rem;\n        }\n      }\n    ",
          }}
        />
        {/* Custom styles for this template */}
        <link href="product.css" rel="stylesheet" />
        <main>
          <div className="custom1">
            <div className="position-relative overflow-hidden p-3 p-md-5 m-md-3 text-center">
              <div className="col-md-8 p-lg-5 mx-auto my-5">
                <h1 className="display-4 fw-normal">Welcome Foodiez</h1>
                <p className="lead fw-normal">
                  And an even wittier subheading to boot. Jumpstart your
                  marketing efforts with this example based on Apples marketing
                  pages.And an even wittier subheading to boot. Jumpstart your
                  marketing efforts with this example based on Apples marketing
                  pages.
                </p>
              </div>
              <div className="product-device shadow-sm d-none d-md-block" />
              <div className="product-device product-device-2 shadow-sm d-none d-md-block" />
            </div>
          </div>

          <div className="custom2">
            <div className="d-md-flex flex-md-equal w-100 my-md-3 ps-md-3">
              <div className="bg-primary me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div>
                  <h6 className="display-5">Juice Canteen</h6>
                  <p className="lead">And an even wittier subheading.</p>
                </div>
                <div
                  className="bg-light shadow-sm mx-auto"
                  style={{
                    width: "80%",
                    // height: "300px",
                    borderRadius: "21px 21px 0 0",
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="random"
                />
              </div>
              <div className="bg-light me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center overflow-hidden">
                <div>
                  <h6 className="display-5">BBC</h6>
                  <p className="lead">And an even wittier subheading.</p>
                </div>
                <div
                  className="bg-dark shadow-sm mx-auto"
                  style={{
                    width: "80%",
                    // height: "300px",
                    borderRadius: "21px 21px 0 0",
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="random"
                />
              </div>
              <div className="bg-info me-md-3 pt-3 px-3 pt-md-5 px-md-5 text-center text-white overflow-hidden">
                <div>
                  <h6 className="display-5">Vindhya Canteen</h6>
                  <p className="lead">And an even wittier subheading.</p>
                </div>
                <div
                  className="bg-light shadow-sm mx-auto"
                  style={{
                    width: "80%",
                    // height: "300px",
                    borderRadius: "21px 21px 0 0",
                  }}
                />
                <img
                  src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                  alt="random"
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Landingpage;
