import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons"

const Order = ({
    id,
    order,
    onChange,
}: {
    id: number
    order: number
    onChange: () => void
}) => {
    return (
        <div>
            Order:
            <button onClick={() => setOrder(id, order - 1, onChange)}>
                <ArrowUpOutlined />
            </button>
            <button onClick={() => setOrder(id, order + 1, onChange)}>
                <ArrowDownOutlined />
            </button>
        </div>
    )
}

const setOrder = async (
    id: number,
    newOrder: number,
    onSuccess: () => void
) => {
    const options = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id, order: newOrder }),
    }
    const response = await fetch("/api/order", options)
    if (response.status === 200) onSuccess()
}

export default Order
