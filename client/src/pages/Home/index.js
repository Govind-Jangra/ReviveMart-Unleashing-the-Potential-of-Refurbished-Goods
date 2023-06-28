import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetProducts } from "../../apicalls/products";
import { SetLoader } from "../../redux/loadersSlice";
import { message } from "antd";
import Divider from "../../components/Divider";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";
import moment from "moment";
import ImageSlider from './ImageSlider'
function Home() {

  const [showFilters, setShowFilters] = React.useState(true);
  const [products, setProducts] = React.useState([]);
  const [filters, setFilters] = React.useState({
    status: "approved",
    category: [],
    age: [],
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);
  const getData = async () => {
    try {
      dispatch(SetLoader(true));
      const response = await GetProducts(filters);
      dispatch(SetLoader(false));
      if (response.success) {
        setProducts(response.data);
      }
    } catch (error) {
      dispatch(SetLoader(false));
      message.error(error.message);
    }
  };
 const slides = [
    { url: "https://media.istockphoto.com/id/1372577388/photo/old-electronic-devices-on-a-dark-background-the-concept-of-recycling-and-disposal-of.jpg?s=612x612&w=0&k=20&c=RGm3eCA76Y_IJJYGCLWS9acSR39Gb7iqsC_DIhJyG2g=", title: "beach" },
    { url: "https://c8.alamy.com/comp/KREYJ9/picture-of-household-appliances-on-a-black-background-KREYJ9.jpg", title: "boat" },
    { url: "https://png.pngtree.com/background/20230414/original/pngtree-cosmetics-make-up-skin-care-products-simple-fashion-advertising-background-picture-image_2424132.jpg", title: "forest" },
    { url: "https://us.123rf.com/450wm/romastudio/romastudio1812/romastudio181200216/117004062-sports-equipment-on-a-black-background-top-view-motivation.jpg", title: "city" },
    { url: "https://img.freepik.com/premium-photo/stack-old-books-isolated-dark-background_118047-7620.jpg", title: "italy" },
  ];
  const containerStyles = {
    width: "100%",
    height: "500px",
    margin: "0 auto",
  };
  useEffect(() => {
    getData();
  }, [filters]);

  return (
    <div className="flex gap-5">
      {showFilters && (
        <Filters
          showFilters={showFilters}
          setShowFilters={setShowFilters}
          filters={filters}
          setFilters={setFilters}
        />
      )}
      <div className="flex flex-col gap-5 w-full">
        <div className="flex gap-5 items-center">
          {!showFilters && (
            <i
              className="ri-equalizer-line text-xl cursor-pointer"
              onClick={() => setShowFilters(!showFilters)}
            ></i>
          )}
          <input
            type="text"
            placeholder="Search Products  here..."
            className="border border-gray-300 rounded border-solid px-2 py-1 h-14 w-full"
          />
        </div>
        

        <div style={containerStyles}>
        <ImageSlider slides={slides} />
      </div>



        <div
          className={`
        grid gap-5 ${showFilters ? "grid-cols-4" : "grid-cols-5"}
      `}
        >
          {products?.map((product) => {
            return (
              <div
                className="border border-gray-300 rounded border-solid flex flex-col gap-2 pb-2 cursor-pointer"
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
              >
                <img
                  src={product.images[0]}
                  className="w-full h-52 p-2 rounded-md object-cover"
                  alt=""
                />
                <div className="px-2 flex flex-col">
                  <h1 className="text-lg font-semibold">{product.name}</h1>
                  <p className="text-sm">
                    {product.age} {' '}
                    {product.age === 1 ? " year" : " years"} {' '}
                    old
                  </p>
                  <Divider />
                  <span className="text-xl font-semibold text-green-700">
                    $ {product.price}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Home;
