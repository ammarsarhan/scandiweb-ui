import Icon from '@/static/assets/Cart.svg';

export default function Cart () {
    return (
        <button onClick={() => console.log("Toggled Cart Overlay")}>
            <img src={Icon} alt="View Cart"/>
        </button>
    )
}