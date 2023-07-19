import Loader from '@/components/Loading';
import { IOrderDetails, IOrders } from '@/interface/order.interface';
import { getOrderDetails, getOrders } from '@/services/order.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { format, parseISO } from 'date-fns';
import React, { useState } from 'react'
import OrderDetailModal from '../order-detail-modal';

const OrderTable = () => {
    const [showModal, setShowModal] = useState<boolean>(false);
    const [orderDetails, setOrderDetails] = useState<IOrderDetails>();
    const [pageNumber, setPageNumber] = useState(1);
    const perPage = 10;

    const { data: orders, isLoading, error } = useQuery(
        ["getOrder", pageNumber, perPage], async () =>
        await getOrders(pageNumber, perPage)
            .then(response => {
                return response;
            })
    )

    const mutation = useMutation({
        mutationFn: getOrderDetails,
        onSuccess: (data) => {
            setOrderDetails(data?.data);
        }
    })
    const changeDateFormat = (dateString: string) => {
        const date = parseISO(dateString);
        return <span>{format(date, 'yyyy MMMM d hh:MM a')}</span>
    }

    const handleOrderDetail = (showOrder: boolean, orderId: number) => {
        setShowModal(showOrder);
        mutation.mutate(orderId);
    }
    return (
        <div className="overflow-x-auto">
            <table className="table table-zebra">
                {/* head */}
                <thead>
                    <tr>
                        <th className="table-header">Orders</th>
                        <th className="text-center table-header">Date</th>
                        <th className="text-center table-header">Status</th>
                        <th className="text-center table-header">Total</th>
                        <th className="text-center table-header">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {isLoading && (
                        <tr>
                            <td colSpan={5}>
                                <Loader />
                            </td>
                        </tr>
                    )}
                    {
                        orders && orders?.data?.length === 0 ? (
                            <tr>
                                <td colSpan={5} className='text-center'>
                                    {/* <EmptyOrder /> */}
                                    No order history available.
                                </td>
                            </tr>
                        ) :
                            (
                                orders?.data.map((order: IOrders) => (
                                    <tr key={`app-order-$${order?.id}`}>
                                        <td className="text-[14px] text-light-black px-5 py-5">
                                            #{order?.orderNumber}
                                        </td>
                                        <td className="px-5 py-5 text-center whitespace-nowrap">
                                            {changeDateFormat(order?.orderDate)}
                                        </td>
                                        <td className="text-center">
                                            <span className={`py-1.5 px-2.5 text-xs leading-4 text-white rounded-[12px] ${order?.status === 'Pending' ? 'bg-slate-600' : 'bg-primary'}`}>{order?.status}</span>
                                        </td>
                                        <td className="px-5 py-5 text-center whitespace-nowrap">
                                            NRS {order?.total}
                                        </td>
                                        <td className="px-5 py-5 text-center">
                                            <button
                                                className="btn-primary text-center px-[30px] py-[5px] text-base-100 rounded-[4px] hover:bg-slate-850"
                                                onClick={() => handleOrderDetail(!showModal, order?.id)}>
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )
                    }
                </tbody>
            </table>
            {showModal && (
                <OrderDetailModal
                    orderDetails={orderDetails}
                    changeDateFormat={changeDateFormat}
                    setShowModal={setShowModal}
                    showModal={showModal}
                    loading={mutation.isLoading}
                />
            )}
        </div>

    )
}

export default OrderTable