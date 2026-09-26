
import { useEffect, useRef, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);

  const recommendationRef = useRef(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/products"
      );

      setProducts(response.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const getRecommendations = async (product) => {
    try {
      setSelectedProduct(product);
      setLoading(true);

      const response = await axios.get(
        `http://localhost:5001/api/products/${product.id}/recommendations`
      );

      setRecommendations(response.data.recommendations);

      setTimeout(() => {
        recommendationRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 100);
    } catch (error) {
      console.error("Recommendation error:", error);

      alert(
        error.response?.data?.message ||
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  const getRecommendationReason = (product) => {
    if (!selectedProduct) return "";

    const selectedText =
      `${selectedProduct.name} ${selectedProduct.description}`.toLowerCase();

    const recommendedText =
      `${product.name} ${product.category}`.toLowerCase();

    if (
      selectedText.includes("gaming") &&
      recommendedText.includes("gaming")
    ) {
      return "Both products share gaming-related features.";
    }

    if (
      selectedProduct.category === product.category
    ) {
      return "Both products belong to the same category.";
    }

    return "Similar product features were detected by the recommendation model.";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* NAVBAR */}

      <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">

        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900">
              SmartCart
            </h1>

            <p className="text-xs text-slate-500">
              AI-powered shopping
            </p>
          </div>

          <div className="hidden items-center gap-8 text-sm text-slate-600 md:flex">

            <a
              href="#products"
              className="transition hover:text-slate-900"
            >
              Products
            </a>

            <a
              href="#recommendations"
              className="transition hover:text-slate-900"
            >
              Recommendations
            </a>

          </div>

          <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-slate-300 hover:bg-slate-50">
            Cart
          </button>

        </div>

      </nav>


      {/* HERO */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-16">

          <div className="max-w-2xl">

            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              Intelligent shopping
            </p>

            <h2 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              Find products
              <br />
              that fit your needs.
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-slate-500">
              Explore products and discover similar items
              using our machine learning recommendation engine.
            </p>

          </div>

        </div>

      </section>


      {/* PRODUCTS */}

      <main
        id="products"
        className="mx-auto max-w-7xl px-6 py-12"
      >

        <div className="mb-8">

          <h2 className="text-2xl font-bold tracking-tight">
            Explore products
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Choose a product to see personalized recommendations.
          </p>

        </div>


        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {products.map((product) => (

            <div
              key={product._id}
              className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
            >

              {/* IMAGE */}

              <div className="h-52 overflow-hidden bg-slate-100">

                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

              </div>


              {/* CONTENT */}

              <div className="p-5">

                <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                  {product.category}
                </p>

                <h3 className="mt-2 text-lg font-semibold text-slate-900">
                  {product.name}
                </h3>

                <p className="mt-2 line-clamp-2 min-h-10 text-sm leading-5 text-slate-500">
                  {product.description}
                </p>


                <div className="mt-5 flex items-center justify-between">

                  <span className="text-lg font-bold text-slate-900">
                    ₹{product.price.toLocaleString("en-IN")}
                  </span>

                  <button
                    onClick={() =>
                      getRecommendations(product)
                    }
                    className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-indigo-600 active:scale-95"
                  >
                    View product
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>


        {/* RECOMMENDATIONS */}

        {selectedProduct && (

          <section
            id="recommendations"
            ref={recommendationRef}
            className="mt-20 scroll-mt-24"
          >

            {/* SELECTED PRODUCT */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

              <div className="grid md:grid-cols-2">

                {/* IMAGE */}

                <div className="h-80 bg-slate-100 md:h-full">

                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="h-full w-full object-cover"
                  />

                </div>


                {/* INFO */}

                <div className="flex flex-col justify-center p-8 md:p-10">

                  <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                    Selected product
                  </p>

                  <h2 className="mt-3 text-3xl font-bold tracking-tight">
                    {selectedProduct.name}
                  </h2>

                  <p className="mt-4 leading-7 text-slate-500">
                    {selectedProduct.description}
                  </p>

                  <div className="mt-7 flex items-center gap-5">

                    <span className="text-2xl font-bold">
                      ₹{selectedProduct.price.toLocaleString("en-IN")}
                    </span>

                    <button className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600">
                      Add to cart
                    </button>

                  </div>

                </div>

              </div>

            </div>


            {/* RECOMMENDATION HEADER */}

            <div className="mb-7 mt-14">

              <p className="text-xs font-semibold uppercase tracking-wider text-indigo-600">
                Machine learning
              </p>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                You may also like
              </h2>

              <p className="mt-2 text-sm text-slate-500">
                Products ranked by similarity to your selection.
              </p>

            </div>


            {/* LOADING */}

            {loading && (

              <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center">

                <div className="mx-auto h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

                <p className="mt-4 text-sm text-slate-500">
                  Finding similar products...
                </p>

              </div>

            )}


            {/* EMPTY */}

            {!loading &&
              recommendations.length === 0 && (

                <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500">
                  No recommendations found.
                </div>

              )}


            {/* RECOMMENDATION CARDS */}

            {!loading &&
              recommendations.length > 0 && (

                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

                  {recommendations.map((product) => (

                    <div
                      key={product.id}
                      className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >

                      {/* IMAGE */}

                      <div className="h-44 overflow-hidden bg-slate-100">

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                        />

                      </div>


                      {/* INFO */}

                      <div className="p-5">

                        <p className="text-xs font-semibold uppercase tracking-wide text-indigo-600">
                          {product.category}
                        </p>

                        <h3 className="mt-2 font-semibold">
                          {product.name}
                        </h3>

                        <p className="mt-2 text-lg font-bold">
                          ₹{product.price.toLocaleString("en-IN")}
                        </p>


                        {/* MATCH */}

                        <div className="mt-5">

                          <div className="mb-2 flex items-center justify-between text-xs">

                            <span className="font-medium text-slate-500">
                              AI match
                            </span>

                            <span className="font-bold text-emerald-600">
                              {Math.round(
                                product.similarity * 100
                              )}
                              %
                            </span>

                          </div>

                          <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">

                            <div
                              className="h-full rounded-full bg-emerald-500 transition-all"
                              style={{
                                width: `${Math.max(
                                  product.similarity * 100,
                                  5
                                )}%`,
                              }}
                            />

                          </div>

                        </div>


                        {/* WHY */}

                        <div className="mt-5 border-t border-slate-100 pt-4">

                          <p className="text-xs font-semibold text-slate-700">
                            Why recommended
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            {getRecommendationReason(product)}
                          </p>

                        </div>

                      </div>

                    </div>

                  ))}

                </div>

              )}

          </section>

        )}

      </main>


      {/* FOOTER */}

      <footer className="mt-20 border-t border-slate-200 bg-white">

        <div className="mx-auto max-w-7xl px-6 py-8">

          <div className="flex flex-col justify-between gap-3 text-sm text-slate-500 md:flex-row">

            <p>
              SmartCart — AI-powered product discovery
            </p>

            <p>
              Built with React, Node.js, MongoDB & Python
            </p>

          </div>

        </div>

      </footer>

    </div>
  );
}

export default App;
