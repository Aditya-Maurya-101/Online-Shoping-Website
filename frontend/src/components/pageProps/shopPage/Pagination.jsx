import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import Product from "../../home/Product";
import { paginationItems } from "../../../constants";

const items = paginationItems;
function Items({ currentItems }) {
  if (!currentItems || currentItems.length === 0) {
    return (
      <div className="col-span-full text-center py-20 text-gray-500">
        No products found for this category.
      </div>
    );
  }

  return (
    <>
      {currentItems.map((item) => (
        <div key={item._id} className="w-full">
          <Product
            _id={item._id}
            img={item.img}
            productName={item.productName}
            price={item.price}
            color={item.color}
            badge={item.badge}
            des={item.des}
          />
        </div>
      ))}
    </>
  );
}

const Pagination = ({ itemsPerPage, selectedCategory }) => {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemStart, setItemStart] = useState(1);

  const filteredItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const endOffset = Math.min(itemOffset + itemsPerPage, filteredItems.length);
  const currentItems = filteredItems.slice(itemOffset, endOffset);
  const pageCount = filteredItems.length > 0 ? Math.ceil(filteredItems.length / itemsPerPage) : 1;

  useEffect(() => {
    setItemOffset(0);
    setItemStart(1);
  }, [selectedCategory, itemsPerPage]);

  const handlePageClick = (event) => {
    if (filteredItems.length === 0) return;
    const newOffset = (event.selected * itemsPerPage) % filteredItems.length;
    setItemOffset(newOffset);
    setItemStart(newOffset + 1);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 mdl:gap-4 lg:gap-10">
        <Items currentItems={currentItems} />
      </div>
      <div className="flex flex-col mdl:flex-row justify-center mdl:justify-between items-center">
        <ReactPaginate
          nextLabel=""
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel=""
          pageLinkClassName="w-9 h-9 border-[1px] border-lightColor hover:border-gray-500 duration-300 flex justify-center items-center"
          pageClassName="mr-6"
          containerClassName="flex text-base font-semibold font-titleFont py-10"
          activeClassName="bg-black text-white"
        />

        <p className="text-base font-normal text-lightText">
          Products from {itemStart === 0 ? 1 : itemStart} to {endOffset} of {filteredItems.length}
        </p>
      </div>
    </div>
  );
};

export default Pagination;
