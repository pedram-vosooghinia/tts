"use client";
const PreFormaTable = ({ params, order,tableRef }) => {
  const discountAmount = order.discount_amount * 1000;
 
  return (
      <div ref={tableRef} style={{ visibility: "hidden" }}> 
      <div className="flex justify-between items-center">
        <div className="m-2">شماره فاکتور : {params.id}</div>
        <div>{parseInt(order?.customer?.marketer_name.split("_")[1])}</div>
        <div className="m-4">
          نام مشتری : {order?.customer?.gender} {order?.customer?.total_name}
          {order?.customer?.mobile}
        </div>
      </div>
      <table className="rtl table-auto w-full border-collapse border border-gray-400">
        <thead>
          <tr>
            <th className="border border-gray-400 px-4 py-2">شماره</th>
            <th className="border border-gray-400 px-4 py-2">کد</th>
            <th className="border border-gray-400 px-4 py-2">نام محصول</th>
            <th className="border border-gray-400 px-4 py-2">تعداد </th>
            <th className="border border-gray-400 px-4 py-2">قیمت</th>
            <th className="border border-gray-400 px-4 py-2">قیمت کل</th>
          </tr>
        </thead>
        <tbody>
          {order.order_items.map((item, index) => (
            <tr key={item?.barcode}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">
                {item.barcode}
              </td>
              <td
                className="border border-gray-400 px-4 py-2 truncate"
                style={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {item.product_name}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {item.number_in_pack * item.quantity}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {(Number(item.price) * 1000).toLocaleString()}
              </td>
              <td className="border border-gray-400 px-4 py-2">
                {(
                  item.number_in_pack *
                  item.quantity *
                  item.price *
                  1000
                ).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex my-4">
        <div className="px-2"> تومان </div>
        <div>{(order.total_price * 1000).toLocaleString()}</div>
        <div className="px-6 rtl">جمع فاکتور:</div>
      </div>
      {discountAmount !== 0 && (
        <>
          <div className="flex mb-4">
            <div className="px-2"> تومان </div>
            <div>{discountAmount.toLocaleString()}</div>
            <div className="px-6 rtl">مبلغ تخفیف:</div>
          </div>
          <div className="flex mb-4">
            <div className="px-2"> تومان </div>
            <div>{(order.final_pay * 1000).toLocaleString()}</div>
            <div className="px-6 rtl">مبلغ پرداختی:</div>
          </div>
        </>
      )}
    </div>
  );
};

export default PreFormaTable;
